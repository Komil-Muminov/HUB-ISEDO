// fileService.ts

import multer from "multer";
import path from "path";
import fs from "fs"; // Для работы с файловой системой

const fileService = multer.diskStorage({
  destination: (req, file, cb) => {
    // Получаем сгенерированный ID документа из req.body
    const docId = req.body.id;

    // Путь до папки организации
    const documentFolderPath = `uploads/documents/${docId}`;

    // Создаём папку, если её нет
    if (!fs.existsSync(documentFolderPath)) {
      fs.mkdirSync(documentFolderPath, { recursive: true }); // Создаём папку с идентификатором документа
    }

    cb(null, documentFolderPath); // Устанавливаем папку для загрузки
  },
  filename: (req, file, cb) => {
    // Генерация уникального имени для каждого файла
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: fileService });
