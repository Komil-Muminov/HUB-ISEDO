import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { WORKING_HOURS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";
import fs from "fs"; // Для работы с файловой системой
import { joinFilePath } from "../../modules/path/joinFilePath";

export const updateWorkingHoursById = (req: Request, res: Response): void => {
  const { workingHoursId, htmlContent, signatureList } = req.body;

  try {
    const workingHoursData = readFile(WORKING_HOURS_FILE_PATH);

    const workingHoursIndex = workingHoursData.findIndex(
      (work) => work.id === workingHoursId
    );

    if (workingHoursIndex === -1) {
      res.status(404).json({ error: "Документ не найден" });
    }

    const workingHoursFolderPath = joinFilePath(
      ["uploads", "workingHours"],
      workingHoursId
    ); // Путь к папке для контракта

    // Создаём папку, если её нет
    if (!fs.existsSync(workingHoursFolderPath)) {
      fs.mkdirSync(workingHoursFolderPath, { recursive: true }); // Создаём папку с идентификатором организации
    }

    const htmlFilePath = joinFilePath(
      ["uploads", "workingHours", workingHoursId],
      `htmlContent-${workingHoursId}.html`
    );

    writeFile(htmlFilePath, htmlContent);

    // Обновляем данные контракта
    workingHoursData[workingHoursIndex].htmlContent = htmlFilePath;
    workingHoursData[workingHoursIndex].state = (
      parseInt(workingHoursData[workingHoursIndex].state) + 1
    ).toString();
    workingHoursData[workingHoursIndex].signatureList = signatureList;

    writeFile(WORKING_HOURS_FILE_PATH, workingHoursData);

    res.status(200).json({
      message: "Документ успешно изменен",
      contractData: workingHoursData,
    });
  } catch (error) {
    console.error("Ошибка при чтении файла workingHours.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
