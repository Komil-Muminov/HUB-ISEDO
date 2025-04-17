export const useFile = () => {
	const sendFile = (file: FormData) => {
		return fetch(`http://localhost:3001/users/worker-card`, {
			method: "POST",
			body: file,
		}).then((res: Response) => {
			if (!res.ok) {
				throw new Error(`Ошибка при загрузке файла в запросе sendFile`);
			}
		});
	};
	return {
		sendFile,
	};
};
