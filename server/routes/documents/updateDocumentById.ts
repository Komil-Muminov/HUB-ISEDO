import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { DOCUMENTS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";
import fs from "fs"; // Для работы с файловой системой
import { joinFilePath } from "../../modules/path/joinFilePath";

export const updateDocumentById = (req: Request, res: Response): void => {
  const { documentId, htmlContent } = req.body;

  try {
    const documentData = readFile(DOCUMENTS_FILE_PATH);

    const documentIndex = documentData.findIndex(
      (doc) => doc.id === documentId
    );

    if (documentIndex === -1) {
      res.status(404).json({ error: "Документ не найден" });
    }

    const documentsFolderPath = joinFilePath(
      ["uploads", "documents"],
      documentId
    ); // Путь к папке для контракта

    // Создаём папку, если её нет
    if (!fs.existsSync(documentsFolderPath)) {
      fs.mkdirSync(documentsFolderPath, { recursive: true }); // Создаём папку с идентификатором организации
    }

    const htmlFilePath = joinFilePath(
      ["uploads", "documents", documentId],
      `htmlContent-${documentId}.html`
    );

    writeFile(htmlFilePath, htmlContent);

    // Обновляем данные контракта
    documentData[documentIndex].htmlContent = htmlFilePath;
    documentData[documentIndex].state = (
      parseInt(documentData[documentIndex].state) + 1
    ).toString();

    writeFile(DOCUMENTS_FILE_PATH, documentData);

    res.status(200).json({
      message: "Документ успешно изменен",
      contractData: documentData,
    });
  } catch (error) {
    console.error("Ошибка при чтении файла documents.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
