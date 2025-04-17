import fs from "fs";

export const writeFile = (filePath: string, data: any): void => {
  try {
    // Проверяем, является ли data массивом
    if (Array.isArray(data)) {
      // Если массив, преобразуем его в JSON
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    } else {
      // Если не массив, записываем строку напрямую
      fs.writeFileSync(filePath, data, "utf8");
    }
    console.log(`Данные успешно записаны в файл: ${filePath}`);
  } catch (error) {
    console.error(`Ошибка при записи файла ${filePath}:`, error);
  }
};
