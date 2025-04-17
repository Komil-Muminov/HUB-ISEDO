import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { USERS_FILE_PATH } from "../../services/filePaths";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { writeFile } from "../../modules/fs/writeFile";

const createUser = (req: Request, res: Response) => {
	console.log("POST /users обработчик запущен");

	const { body: userData } = req;

	const users = readFile(USERS_FILE_PATH);

	const existingUser = users.find((user) => user.login === userData.login);

	if (existingUser) {
		return res
			.status(400)
			.json({ error: "Пользователь с таким логином уже существует!" });
	}

	const newUser = {
		id: generateUniqueId(users),
		...userData,
	};

	users.push(newUser);

	writeFile(USERS_FILE_PATH, users);

	res
		.status(200)
		.json({ message: "Регистрация прошла успешно", user: newUser });
};

export default createUser;
