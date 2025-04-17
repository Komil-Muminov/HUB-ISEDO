import express, { Request, Response } from "express";
import { USERS_FILE_PATH } from "../../services/filePaths";
import { readFile } from "../../modules/fs/readFile";
import * as fs from "fs";

interface LogmeProps {
	username: string;
	password: string;
}

export const Logme = (req: Request, res: Response) => {
	const { username, password }: LogmeProps = req.body;
	if (!username || !password) {
		res
			.status(400)
			.send({ message: "Отсутствуют объязательные поля (логин или пароль)" });
	}
	const readUserFile = readFile(USERS_FILE_PATH);
	const user = readUserFile;
	const isUserValid = user.find(
		(item) => item.username === username && item.password === password,
	);
	if (!isUserValid) {
		res.status(400).send({
			message:
				"Ле чушпан, ебанная система говорит что ты не правильно вводишь логин или пароль",
		});
	}
	res.status(200).send({ message: "Вы успешно вошли в систему бл" });
};
