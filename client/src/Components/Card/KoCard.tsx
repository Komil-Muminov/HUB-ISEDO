import { Card, Button, Typography, Divider, Avatar } from "antd";
import {
	HomeOutlined,
	CalendarOutlined,
	BankOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./KoCard.css";
import { CardData } from "../../routes/HUB/Hub/ui";

interface TProps {
	data: CardData;
	handleClick?: (state: boolean, target?: string) => void;
	onDelete?: () => void;
	target?: string;
	onEdit?: () => void;
	canEdit?: boolean;
}

const KoCard = ({
	data,
	handleClick,
	onDelete,
	target,
	onEdit,
	canEdit,
}: TProps) => {
	if (!data) {
		return <div>Карточка не найдена</div>;
	}

	return (
		<Card
			title={data.name || "Без названия"}
			variant="outlined"
			className="ko-card"
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
					type="primary"
					onClick={() => handleClick(true, target)}
					className="ko-card-button-primary"
				>
					Подробнее
				</Button>,
				<Button
					danger
					icon={<DeleteOutlined />}
					onClick={onDelete}
					className="ko-card-button-danger"
					disabled={!canEdit} // Отключаем удаление, если canEdit=false
				>
					Удалить
				</Button>,
				<Button
					onClick={onEdit}
					disabled={!onEdit || !canEdit} // Отключаем редактирование, если canEdit=false
					className="ko-card-button"
				>
					Редактировать
				</Button>,
			]}
		>
			<p className="ko-card-text">
				<BankOutlined className="ko-card-icon" /> Тип:{" "}
				{data.orgType || "Не указан"}
			</p>
			<p className="ko-card-text">
				<CalendarOutlined className="ko-card-icon" /> Дата договора:{" "}
				{data.dateDoc ? dayjs(data.dateDoc).format("DD.MM.YYYY") : "Не указана"}
			</p>
			<p className="ko-card-text">
				<HomeOutlined className="ko-card-icon" /> Адрес:{" "}
				{data.address || "Не указан"}
			</p>
			<Divider className="ko-card-divider" />
			<Typography.Text type="secondary">
				ИНН: {data.tax || "Не указан"}
			</Typography.Text>
			<br />
			<Typography.Text type="secondary">
				ОГРН: {data.identificator || "Не указан"}
			</Typography.Text>
		</Card>
	);
};

export default KoCard;
