import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { DOCUMENTS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  path?: string;
}

export const createDocument = (req: Request, res: Response): void => {
  const files = (req.files as Express.Multer.File[]) || [];
  const documentData = req.body;

  // Прочитать существующие договора
  const documents = readFile(DOCUMENTS_FILE_PATH);

  const checkUser = documents.find(
    (e) => e.fullname === "Табаров Комилчон" || e.fullname === "Шарипов Амир"
  );

  if (checkUser && documentData.docType === "Трудовой договор") {
    res
      .status(409)
      .json({ error: "Для данного пользователя существует трудовой договор!" });
    return;
  }

  // Создаём новый документ
  const newDocument = {
    files: files.map((file) => file.path), // Сохраняем массив путей загруженных файлов
    ...documentData,
  };

  documents.push(newDocument); // Добавляем новый документ

  // Записываем обновлённый список документов в файл в файл
  writeFile(DOCUMENTS_FILE_PATH, documents);

  // Ответ клиенту
  res.status(201).json({
    message: "Документ успешно создан",
    document: newDocument,
  });
};
