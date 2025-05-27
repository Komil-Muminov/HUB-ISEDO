// HubForm.tsx
import { useState } from "react";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Select,
	Divider,
	Row,
	Col,
	message,
} from "antd";
import dayjs from "dayjs";
import "./HubForm.css";
import { CardData } from "../ui";

const { Option } = Select;

interface HubFormProps {
	addCard: (newCard: CardData) => void;
	onSuccess?: () => void;
}

const HubForm: React.FC<HubFormProps> = ({ addCard, onSuccess }) => {
	const [form] = Form.useForm<CardData>();
	const [cardType, setCardType] = useState<"ko" | "bo" | "">("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleTypeChange = (value: "ko" | "bo") => {
		setCardType(value);
		// Сбрасываем все поля кроме типа
		const fieldsToReset = [
			"name",
			"orgType",
			"tax",
			"identificator",
			"docNo",
			"dateDoc",
			"address",
			"terCode",
			"role",
			"image",
		];
		form.resetFields(fieldsToReset);
	};

	const onFinish = async (values: any) => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			// Создаем уникальный ID
			const uniqueId = `card-${Date.now()}-${Math.random()
				.toString(36)
				.substr(2, 9)}`;

			const cardData: CardData = {
				...values,
				id: uniqueId,
				type: cardType as "ko" | "bo",
				dateDoc: values.dateDoc
					? dayjs(values.dateDoc).format("YYYY-MM-DD")
					: undefined,
			};

			console.log("Создание карточки в HubForm:", cardData);

			// Добавляем карточку
			addCard(cardData);

			// Сбрасываем форму
			form.resetFields();
			setCardType("");

			message.success("Карточка успешно добавлена!");

			// Вызываем колбэк успеха
			onSuccess?.();
		} catch (error) {
			console.error("Ошибка при создании карточки:", error);
			message.error("Ошибка при создании карточки");
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderField = (
		name: keyof CardData,
		label: string,
		placeholder: string,
		component: React.ReactNode = (
			<Input placeholder={placeholder} className="hub-form-input" />
		),
		required: boolean = false,
	) => (
		<Col className="hub-form-col">
			<Form.Item
				name={name}
				label={label}
				rules={
					required
						? [{ required: true, message: `Введите ${label.toLowerCase()}!` }]
						: []
				}
				className="hub-form-item"
			>
				{component}
			</Form.Item>
		</Col>
	);

	return (
		<div className="hub-form-container">
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
				requiredMark={false}
			>
				<Row className="hub-form-row">
					<Col span={6} offset={9}>
						{renderField(
							"type",
							"Тип карточки",
							"",
							<Select
								placeholder="Выберите тип"
								onChange={handleTypeChange}
								className="hub-form-select"
								value={cardType || undefined}
							>
								<Option value="ko">КО (Организация)</Option>
								<Option value="bo">БО (Представитель)</Option>
							</Select>,
							true,
						)}
					</Col>
				</Row>

				{cardType === "ko" ? (
					<>
						<Divider className="hub-form-divider">Данные организации</Divider>
						<Row className="hub-form-row">
							{renderField(
								"name",
								"Наименование",
								"Полное наименование организации",
								undefined,
								true,
							)}
							{renderField(
								"orgType",
								"Тип организации",
								"",
								<Select placeholder="Выберите тип" className="hub-form-select">
									<Option value="АО">АО</Option>
									<Option value="ООО">ООО</Option>
								</Select>,
								true,
							)}
							{renderField("tax", "ИНН", "ИНН")}
							{renderField("identificator", "Идентификатор", "Уникальный код")}
							{renderField("docNo", "Номер договора", "123/456")}
							{renderField(
								"dateDoc",
								"Дата договора",
								"",
								<DatePicker
									format="DD.MM.YYYY"
									className="hub-form-date-picker"
									placeholder="Выберите дату"
								/>,
							)}
							{renderField("address", "Адрес", "Город, улица")}
							{renderField("terCode", "Код территории", "123456")}
						</Row>
					</>
				) : cardType === "bo" ? (
					<>
						<Divider className="hub-form-divider">
							Бюджетная организация
						</Divider>
						<Row className="hub-form-row">
							{renderField("name", "ФИО", "ФИО представителя", undefined, true)}
							{renderField(
								"role",
								"Роль",
								"",
								<Select placeholder="Выберите роль" className="hub-form-select">
									<Option value="ГРБС">ГРБС</Option>
									<Option value="Получатель">Получатель</Option>
								</Select>,
								true,
							)}
							{renderField("image", "URL изображения", "https://...")}
						</Row>
					</>
				) : null}

				{cardType && (
					<Row justify="center" style={{ marginTop: "32px" }}>
						<Col>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="hub-form-submit-button"
									loading={isSubmitting}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Создание..." : "Создать карточку"}
								</Button>
							</Form.Item>
						</Col>
					</Row>
				)}
			</Form>
		</div>
	);
};

export default HubForm;
