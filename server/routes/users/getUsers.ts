import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { USERS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";

const getUsers = (req: Request, res: Response) => {
	const { inn } = req.body;
	if (!inn) {
		return res.status(400).json({ message: "Вы не передали inn" });
	}
	const getUser = readFile(USERS_FILE_PATH);
	if (getUser.find((item) => item.id === req.params.inn)) {
		return res.status(200).json({ message: "Пользователь найден" });
	} else {
		return res.status(400).json({ message: "Пользователь не найден" });
	}
	res.json({ message: "Список пользователей" });
};

export default getUsers;
