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
}

const HubForm: React.FC<HubFormProps> = ({ addCard }) => {
	const [form] = Form.useForm<CardData>();
	const [cardType, setCardType] = useState<"ko" | "bo" | "">("");

	const handleTypeChange = (value: "ko" | "bo") => {
		setCardType(value);
		form.resetFields([
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
		]);
	};

	const onFinish = (values: CardData) => {
		const cardData: CardData = {
			...values,
			dateDoc: values.dateDoc ? dayjs(values.dateDoc).toISOString() : undefined,
		};
		console.log("Создание карточки в HubForm:", cardData); // Для отладки
		addCard(cardData);
		form.resetFields();
		setCardType("");
		message.success("Карточка успешно добавлена!");
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
				initialValues={cardType ? { type: cardType } : undefined}
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
							{renderField("role", "Роль", "Должность / роль", undefined, true)}
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
								>
									Создать карточку
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
