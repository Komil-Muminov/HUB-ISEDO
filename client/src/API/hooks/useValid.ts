import { OrganizationScheme } from "../services/organizations/OrganizationScheme";

export const useValid = () => {
	const validInn = async (
		inn: string,
	): Promise<{ inn: OrganizationScheme }> => {
		return fetch(`http://localhost:3001/organizations/checkinn`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inn }),
		}).then((res: Response) => {
			if (!res.ok) {
				throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
			}
			return res.json();
		});
	};
	return {
		validInn,
	};
};
