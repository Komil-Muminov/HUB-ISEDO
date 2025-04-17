// createOrganization.ts

import { Request, Response } from "express";
import { File as MulterFile } from "multer";
import { readFile } from "../../modules/fs/readFile";
import { ORGANIZATIONS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";

export const createOrganization = (req: Request, res: Response): void => {
  const files = ((req as any).files as MulterFile[]) || []; // Файлы из multer
  const orgData = req.body; // Данные из тела запроса

  // Логирование для отладки
  console.log("Received body:", orgData);
  console.log("Received files:", files);

  // Проверка обязательных полей
  if (!orgData.tax) {
    res.status(400).json({ error: "ИНН организации не заполнен!" });
    return;
  }

  // Преобразуем строки в массивы (если они переданы как строки)
  const bz = orgData.bz ? JSON.parse(orgData.bz) : []; // Если "[]" → пустой массив
  const details = orgData.details ? JSON.parse(orgData.details) : []; // Аналогично

  // Прочитать существующие организации
  const organizations = readFile(ORGANIZATIONS_FILE_PATH);

  // Создаём новую организацию
  const newOrganization = {
    files: files.map((file) => file.path), // Сохраняем массив путей загруженных файлов
    ...orgData,
    bz,
    details,
  };

  organizations.push(newOrganization); // Добавляем новую организацию

  // Записываем обновлённый список организаций в файл
  writeFile(ORGANIZATIONS_FILE_PATH, organizations);

  // Ответ клиенту
  res.status(201).json({
    message: "Организация успешно создана",
    organization: newOrganization,
  });
};
