import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { ORGANIZATIONS_FILE_PATH } from "../../services/filePaths";

export const getOrganizationById = (req: Request, res: Response): void => {
  try {
    const showId = req.params.id; // Получаем id из URL-параметров

    if (!showId) {
      res.status(400).json({ error: "Некорректный ID" });
    }

    const organization = readFile(ORGANIZATIONS_FILE_PATH);
    const show = organization.find((org) => org.id === showId);

    if (!show) {
      res.status(404).json({ error: "Организация не найдена" });
    }
    res.status(200).json(show); // Возвращаем только найденную заявку
  } catch (error) {
    console.error("Ошибка при чтении файла organizations.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
