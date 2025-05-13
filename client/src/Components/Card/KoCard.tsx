import { Card, Button, Typography, Divider, Avatar } from "antd";
import {
	HomeOutlined,
	CalendarOutlined,
	BankOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import "./KoCard.css";

interface KoCardData {
	name: string;
	orgType: string;
	tax: string;
	identificator: string;
	docNo: string;
	dateDoc: Date;
	address: string;
	terCode: string;
	image?: string;
}

interface TProps {
	data: KoCardData;
	handleClick: (state: boolean, target?: string) => void;
	onDelete: () => void;
	target?: string;
	onEdit?: () => void;
}

const KoCard = ({ data, handleClick, onDelete, target, onEdit }: TProps) => {
	return (
		<Card
			title={data.name}
			bordered
			className="ko-card"
			cover={
				<Avatar
					size={100}
					src={data.image || "https://via.placeholder.com/100"} // Используем заглушку, если изображения нет
					style={{ margin: "16px auto", display: "block" }}
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
				>
					Удалить
				</Button>,
				<Button onClick={onEdit}>Редактировать</Button>,
			]}
		>
			<p className="ko-card-text">
				<BankOutlined className="ko-card-icon" /> Тип: {data.orgType}
			</p>
			<p className="ko-card-text">
				<CalendarOutlined className="ko-card-icon" /> Дата договора:{" "}
				{data.dateDoc.toLocaleDateString("ru-RU")}
			</p>
			<p className="ko-card-text">
				<HomeOutlined className="ko-card-icon" /> Адрес: {data.address}
			</p>
			<Divider className="ko-card-divider" />
			<Typography.Text type="secondary">ИНН: {data.tax}</Typography.Text>
			<br />
			<Typography.Text type="secondary">
				ОГРН: {data.identificator}
			</Typography.Text>
		</Card>
	);
};

export default KoCard;
