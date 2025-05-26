import { Modal, Form, Select, Input } from "antd";

type ContactModalProps = {
	open: boolean;
	onCancel: () => void;
	onSend: () => void;
};

export const ContactModal = ({ open, onCancel, onSend }: ContactModalProps) => {
	const [form] = Form.useForm();

	const handleOk = () => {
		form.validateFields().then(() => {
			onSend();
			form.resetFields();
		});
	};

	return (
		<Modal
			open={open}
			onOk={handleOk}
			onCancel={() => {
				form.resetFields();
				onCancel();
			}}
			title="Форма связи"
			width={600}
		>
			<Form form={form} layout="vertical">
				<Form.Item label="Тип запроса" name="type" rules={[{ required: true }]}>
					<Select placeholder="Выберите тип">
						<Select.Option value="partnership">Партнёрство</Select.Option>
						<Select.Option value="cooperation">Сотрудничество</Select.Option>
						<Select.Option value="support">Техподдержка</Select.Option>
						<Select.Option value="other">Другое</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Тема"
					name="subject"
					rules={[{ required: true, max: 100 }]}
				>
					<Input placeholder="Кратко опишите тему" />
				</Form.Item>

				<Form.Item
					label="Сообщение"
					name="message"
					rules={[{ required: true }]}
				>
					<Input.TextArea rows={4} placeholder="Введите текст сообщения..." />
				</Form.Item>
			</Form>
		</Modal>
	);
};
