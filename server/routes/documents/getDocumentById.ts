import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { DOCUMENTS_FILE_PATH } from "../../services/filePaths";

export const getDocumentById = (req: Request, res: Response): void => {
  try {
    const showId = req.params.id; // Получаем id из URL-параметров

    if (!showId) {
      res.status(400).json({ error: "Некорректный ID" });
    }

    const document = readFile(DOCUMENTS_FILE_PATH);
    const show = document.find((doc) => doc.id === showId);

    if (!show) {
      res.status(404).json({ error: "Документ не найден" });
    }

    if (show.htmlContent && typeof show.htmlContent === "string") {
      const htmlContent = readFile(show.htmlContent, false);
      console.log(htmlContent);

      show.htmlContent = htmlContent;
    }

    res.status(200).json(show); // Возвращаем только найденный список
  } catch (error) {
    console.error("Ошибка при чтении файла documents.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
