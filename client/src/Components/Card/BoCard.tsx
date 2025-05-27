import { Card, Button, Typography, Divider, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./BoCard.css";
import { CardData } from "../../routes/HUB/Hub/ui";

interface TProps {
	data: CardData;
	onDelete: () => void;
	onEdit?: () => void;
	canEdit?: boolean;
}

const BoCard = ({ data, onDelete, onEdit, canEdit }: TProps) => {
	if (!data) {
		return <div>Карточка не найдена</div>;
	}

	return (
		<Card
			title={data.name || "Без названия"}
			variant="outlined"
			className="bo-card"
			cover={
				<Avatar
					size={100}
					src={data.image || "https://via.placeholder.com/150"}
					style={{ margin: "16px auto", display: "block" }}
					onError={() => true}
				/>
			}
			actions={[
				<Button
					danger
					icon={<DeleteOutlined />}
					onClick={onDelete}
					className="bo-card-button-danger"
					disabled={!canEdit} // Отключаем удаление, если canEdit=false
				>
					Удалить
				</Button>,
				<Button
					onClick={onEdit}
					disabled={!onEdit || !canEdit} // Отключаем редактирование, если canEdit=false
					className="bo-card-button"
				>
					Редактировать
				</Button>,
			]}
		>
			<p className="bo-card-text">Роль: {data.role || "Не указана"}</p>
			<Divider className="bo-card-divider" />
			<Typography.Text type="secondary">
				URL изображения: {data.image || "Не указан"}
			</Typography.Text>
		</Card>
	);
};

export default BoCard;
