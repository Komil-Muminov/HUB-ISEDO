import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { WORKING_HOURS_FILE_PATH } from "../../services/filePaths";
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

export const createWorkingHours = (req: Request, res: Response): void => {
  const files = (req.files as Express.Multer.File[]) || [];
  const workingHoursData = req.body;

  // Прочитать существующую запись
  const workingHours = readFile(WORKING_HOURS_FILE_PATH);

  const checkMonth = workingHours.find(
    (e) => e.month === workingHoursData.month
  );

  if (checkMonth) {
    res.status(409).json({ error: "Для данного месяца существует учет!" });
    return;
  }

  // Создаём новый документ
  const newData = {
    files: files.map((file) => file.path), // Сохраняем массив путей загруженных файлов
    ...workingHoursData,
  };

  workingHours.push(newData); // Добавляем новую запись

  // Записываем обновлённый список учетов в файл
  writeFile(WORKING_HOURS_FILE_PATH, workingHours);

  // Ответ клиенту
  res.status(201).json({
    message: "Запись успешно создана",
    document: newData,
  });
};
