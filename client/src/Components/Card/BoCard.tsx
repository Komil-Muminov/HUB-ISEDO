import { Card, Button, Avatar, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./BoCard.css";

interface BoCardData {
	name: string;
	role: string;
	image: string;
}

interface TProps {
	data: BoCardData;
	onViewProfile?: () => void;
	onDelete: () => void;
	onEdit?: () => void;
}

const BoCard = ({ data, onViewProfile, onDelete, onEdit }: TProps) => {
	return (
		<Card
			className="bo-card"
			cover={
				<Avatar
					size={100}
					src={data.image}
					style={{ margin: "16px auto", display: "block" }}
				/>
			}
			actions={[
				<Button type="link" onClick={onViewProfile} className="text-blue-600">
					Подробнее
				</Button>,
				<Button
					danger
					icon={<DeleteOutlined />}
					onClick={onDelete}
					className="hover:bg-red-50"
				>
					Удалить
				</Button>,
				<Button onClick={onEdit}>Редактировать</Button>,
			]}
		>
			<Card.Meta title={data.name} description={data.role} />
			<Space style={{ marginTop: 8 }} wrap>
				<Button size="small" className="text-gray-600">
					Карточка подписей
				</Button>
				<Button size="small" className="text-gray-600">
					Корреспонденция
				</Button>
			</Space>
		</Card>
	);
};

export default BoCard;
