import fs from "fs";

export const readFile = (
  filePath: string,
  parseAsJson: boolean = true
): any | string => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    // Если нужно парсить как JSON
    if (parseAsJson) {
      return JSON.parse(data);
    }

    // Если нужно вернуть текст (например, HTML)
    return data;
  } catch (error) {
    console.log(`Ошибка при чтении файла ${filePath}:`, error);
    return parseAsJson ? [] : ""; // Возвращаем пустой массив для JSON и пустую строку для текста
  }
};
