import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import * as fs from "fs";
import { cors } from "cors";
import { error } from "console";

const fileDir = path.dirname(fileURLToPath(import.meta.url));
const fileFolder = path.join(fileDir, "users-folder");

try {
	if (!fs.existsSync(fileFolder)) {
		fs.mkdirSync(fileFolder);
	}
} catch (error) {
	console.log(`Ошибка при создании папки${fileFolder}`, error);
}

const fileFilter = multer({
	storage: multer.diskStorage({
		destination: fileFolder,
		filename: (_, file, cb) => cb(null, `user-${file.originalname}`),
	}),
	fileFilter: (_, file, cb) => {
		if (
			!["image/jpeg", "image.jpg", "image/png", "file/pdf"].includes(
				file.mimetype,
			)
		) {
			return cb(new Error(`Недопустимый формат файла`));
		} else {
			return cb(null, true);
		}
	},
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
});

export const workerFile = (req: Request, res: Response) => {
	fileFilter.single("worker-card")(req, res, (err: any) => {
		if (err) {
			return res
				.status(400)
				.json({ message: `Файл не валиден: ${err.message}` });
		}

		if (!req.file) {
			return res.status(400).json({ message: "Вы не загрузили файл" });
		}

		const filePath = req.file.path;
		return res.status(200).json({ message: "Файл успешно загружен", filePath });
	});
};
