import { Form, Input, Button } from "antd";
import { CardData } from "../Hub";

interface Props {
	card: CardData;
	onSave: (updated: CardData) => void;
}

const EditForm = ({ card, onSave }: Props) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		onSave({ ...card, ...values });
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={card}
			onFinish={onFinish}
		>
			<Form.Item name="name" label="Название" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name="tax" label="ИНН">
				<Input />
			</Form.Item>
			<Form.Item name="address" label="Адрес">
				<Input />
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Сохранить
			</Button>
		</Form>
	);
};

export default EditForm;
