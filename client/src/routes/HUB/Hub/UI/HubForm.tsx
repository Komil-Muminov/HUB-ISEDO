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
import dayjs, { Dayjs } from "dayjs";
import "./HubForm.css";

const { Option } = Select;

interface CardData {
	type: "ko" | "bo";
	name: string;
	orgType?: string;
	tax?: string;
	identificator?: string;
	docNo?: string;
	dateDoc?: Dayjs;
	address?: string;
	terCode?: string;
	role?: string;
	image?: string;
}

interface HubFormProps {
	addCard: (newCard: CardData) => void;
}

const HubForm: React.FC<HubFormProps> = ({ addCard }) => {
	const [form] = Form.useForm<CardData>();
	const [cardType, setCardType] = useState<"ko" | "bo" | "">("");

	const handleTypeChange = (value: "ko" | "bo") => {
		setCardType(value);
	};

	const onFinish = (values: CardData) => {
		const cardData: CardData = {
			...values,
			dateDoc: values.dateDoc ? dayjs(values.dateDoc) : undefined,
		};
		addCard(cardData);
		form.resetFields();
		setCardType("ko");
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
				required={false}
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
				) : (
					<>
						<Divider className="hub-form-divider">
							Бюджетное организация
						</Divider>
						<Row className="hub-form-row">
							<Col span={8} offset={5}>
								{renderField("role", "Роль", "Должность / роль")}
							</Col>
							{renderField("image", "URL изображения", "https://...")}
						</Row>
					</>
				)}

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
			</Form>
		</div>
	);
};

export default HubForm;
