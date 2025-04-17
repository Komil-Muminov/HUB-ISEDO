import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { ORGANIZATIONS_FILE_PATH } from "../../services/filePaths";

export const getOrganizations = (req: Request, res: Response): void => {
  try {
    const orgData = readFile(ORGANIZATIONS_FILE_PATH);
    res.status(200).json(orgData);
  } catch (error) {
    console.error("Ошибка при чтении файла organizations.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
