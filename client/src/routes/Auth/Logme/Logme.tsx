import { useNavigate } from "react-router";
import { Form, Input, Button, message } from "antd";
import "./Logme.css";

const Logme: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = (values: { username: string; password: string }) => {
		const { username, password } = values;

		if (
			(username === "kvd" && password === "123") ||
			(username === "bo" && password === "123") ||
			(username === "ko" && password === "123") ||
			(username === "km" && password === "123")
		) {
			localStorage.setItem("username", username);
			console.log("Вход выполнен как:", username);
			navigate(username === "km" ? "/km" : "/kvd");
		} else {
			console.log("Неверная попытка входа:", username);
			message.error("Неверный логин или пароль");
		}
	};

	return (
		<div className="logme__form-wrapper">
			<Form
				form={form}
				name="logme"
				onFinish={onFinish}
				className="auth-form logme__form"
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
					<Button type="primary" htmlType="submit" className="btn-mui">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Logme;
