import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { WORKING_HOURS_FILE_PATH } from "../../services/filePaths";

export const getWorkingHours = (req: Request, res: Response): void => {
  try {
    const workingHoursData = readFile(WORKING_HOURS_FILE_PATH);
    res.status(200).json(workingHoursData);
  } catch (error) {
    console.error("Ошибка при чтении файла workingHours.json", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
