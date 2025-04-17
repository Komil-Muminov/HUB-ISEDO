import { Form } from "../../../../UI/Form/Form";
import UserCard from "../../../../UI/User Card/UserCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../API/hooks/queryClient";
import "./Usercard.css";
import { useEffect, useState } from "react";

const Usercard: React.FC = () => {
	const getWorkerMutation = useMutation(
		{
			mutationFn: () => {
				return fetch(`http://localhost:3001/getUsers/${inn}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ inn }),
				});
			},
			onSuccess: () => console.log(`getWorker is success`),
			onError: () => console.log(`Ошибка в запросе getWorker`),
			mutationKey: ["getWorker"],
		},
		queryClient,
	);

	const [inn, setInn] = useState<string | undefined>();
	const onsubmit = (data: any) => {
		try {
			console.log(`data sbt:${data.usercard}`);
			setInn(data.usercard);
			if (inn) {
				getWorkerMutation.mutateAsync();
			}
		} catch (error) {
			console.log(`Ошибка при submit`);
		}
	};

	useEffect(() => {
		if (inn) {
			console.log(inn);
		}
	}, [inn]);

	console.log(`inn:${inn}`);

	return (
		<>
			<div className="usercard__content">
				<Form
					inputs={[
						{
							name: "usercard",
							placeholder: "Введите ИНН сотрудника",
							classname: "input usercard__inn",
							type: "text",
						},
					]}
					submitText="Поиск"
					classname="usercard__form"
					onSubmit={onsubmit}
				/>
				<UserCard
					position="Мутахассис"
					fullname="Коргар Коргаров"
					contacts={"999991313"}
				/>
			</div>
		</>
	);
};
export default Usercard;
