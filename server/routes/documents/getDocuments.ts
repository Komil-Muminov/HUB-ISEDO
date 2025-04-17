import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { DOCUMENTS_FILE_PATH } from "../../services/filePaths";

export const getDocuments = (req: Request, res: Response): void => {
  try {
    const documentsData = readFile(DOCUMENTS_FILE_PATH);
    res.status(200).json(documentsData);
  } catch (error) {
    console.error("Ошибка при чтении файла documents.json", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
