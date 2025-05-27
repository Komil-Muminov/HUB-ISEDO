import { CardData } from "../../Hub/ui";
import { Typography, Divider, Button, Image } from "antd";
import "../style.css";
const { Title, Text } = Typography;

type OrgCardProps = {
	card: CardData;
	onEdit: () => void;
	onContact: () => void;
	onDelete: () => void;
};

export const OrgCard = ({
	card,
	onEdit,
	onContact,
	onDelete,
}: OrgCardProps) => {
	return (
		<div className="org-card">
			{/* Аватар */}
			<div className="org-avatar">
				<Image
					src="https://www.sdt-group.ru/upload/userfiles/images/737367c6bfc1cf6b639b80de82b36776.jpg "
					alt="Аватар организации"
					className="avatar-image"
					preview={false}
				/>
			</div>

			{/* Название */}
			<Title level={2}>{card.name}</Title>

			{/* Тип организации */}
			<Text type="secondary" style={{ display: "block", marginBottom: "20px" }}>
				{card.type === "ko" ? "Кредитная организация" : "Бюджетная организация"}
			</Text>
			{/* Информация */}
			<div className="org-info">
				<Text strong>ИНН:</Text> <Text>{card.inn}</Text>
				<Text strong>Адрес:</Text> <Text>{card.address}</Text>
				<Text strong>Email:</Text> <Text>{card.email}</Text>
				<Text strong>Телефон:</Text> <Text>{card.phone}</Text>
			</div>

			<div className="org__contacts">
				<Text strong>ИНН:</Text> <Text>{card.inn}</Text>
				<Text strong>Адрес:</Text> <Text>{card.address}</Text>
				<Text strong>Email:</Text> <Text>{card.email}</Text>
				<Text strong>Телефон:</Text> <Text>{card.phone}</Text>
			</div>
			{/* Кнопки управления */}
			<div className="org-actions">
				<Button type="link" size="large" onClick={onEdit}>
					Редактировать
				</Button>
				<Button type="link" size="large" onClick={onContact}>
					Связаться
				</Button>
				<Button type="link" danger size="large" onClick={onDelete}>
					Удалить
				</Button>
			</div>
		</div>
	);
};
