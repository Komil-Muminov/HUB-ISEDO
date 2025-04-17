import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../API/hooks/queryClient";
import { useAuth } from "../../../API/hooks/useAuth";
import { Form } from "../../../UI/Form/Form";
import "./Regme.css";

const Regme: React.FC = () => {
	const { regMe } = useAuth();

	// Мутация для регистрации пользователя
	const createUserMutate = useMutation({
		mutationFn: (data: { username: string; password: string }) => regMe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			console.log("Пользователь успешно создан");
		},
		onError: (error) => {
			console.error("Ошибка при создании пользователя:", error);
		},
	});

	// Обработчик отправки формы
	const onSubmit = (data: { username: string; password: string }) => {
		console.log("Отправляемые данные:", data);
		createUserMutate.mutate(data);
	};

	return (
		<Form
			inputs={[
				{
					name: "username",
					type: "text",
					placeholder: "Логин",
					classname: "input",
				},
				{
					name: "password",
					type: "password",
					placeholder: "Введите пароль",
					classname: "input",
				},
			]}
			classname="auth-form regme__form"
			submitText="Зарегистрироваться"
			submitClassname="btn-mui regme__sbt"
			onSubmit={onSubmit}
		/>
	);
};

export default Regme;
