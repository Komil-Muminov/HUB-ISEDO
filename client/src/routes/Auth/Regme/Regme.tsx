import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, message } from "antd";
import "./Regme.css";

const Regme: React.FC = () => {
	const { regMe } = useAuth();
	const [form] = Form.useForm();

	const createUserMutate = useMutation({
		mutationFn: (data: { username: string; password: string }) => regMe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			message.success("Пользователь успешно зарегистрирован");
			form.resetFields();
		},
		onError: (error) => {
			console.error("Ошибка при создании пользователя:", error);
			message.error("Ошибка при регистрации. Попробуйте снова.");
		},
	});

	const onFinish = (values: { username: string; password: string }) => {
		createUserMutate.mutate(values);
	};

	return (
		<div className="regme__form-wrapper">
			<Form
				form={form}
				name="regme"
				onFinish={onFinish}
				className="auth-form regme__form"
				layout="vertical"
			>
				<Form.Item
					label="Логин"
					name="username"
					rules={[{ required: true, message: "Введите логин" }]}
				>
					<Input className="input" placeholder="Логин" />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[{ required: true, message: "Введите пароль" }]}
				>
					<Input.Password className="input" placeholder="Введите пароль" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="btn-mui regme__sbt"
						loading={createUserMutate.isPending}
					>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Regme;
