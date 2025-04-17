import { Form } from "../../../UI/Form/Form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../API/hooks/useAuth";
import { useNavigate } from "react-router";
import { queryClient } from "../../../API/hooks/queryClient";
import "./Logme.css";

// RTQ
const Logme: React.FC = () => {
	const navigate = useNavigate();
	const { logMe } = useAuth();
	const logMeMutation = useMutation({
		mutationFn: (data: { username: string; password: string }) => logMe(data),
		onSuccess: () =>
			// route:/modules/hr/submodules
			navigate("/modules") &&
			queryClient.invalidateQueries({ queryKey: ["organizations"] }),
	});

	const onSubmit = (data: { username: string; password: string }) => {
		logMeMutation.mutate(data);
	};

	return (
		<>
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
				classname="auth-form logme__form"
				submitText="Войти"
				submitClassname="btn-mui"
				onSubmit={onSubmit}
			></Form>
		</>
	);
};
export default Logme;
