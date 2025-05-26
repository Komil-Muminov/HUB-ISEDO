import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardData } from "../Hub/ui";
import KoCard from "../../../Components/Card/KoCard";
import BoCard from "../../../Components/Card/BoCard";
import { Typography, Spin } from "antd";

const { Title } = Typography;

const mockStorage: CardData[] = JSON.parse(
	localStorage.getItem("cards") || "[]",
);

const OrganizationPage = () => {
	const { id } = useParams<{ id: string }>();
	const [card, setCard] = useState<CardData | null>(null);

	useEffect(() => {
		const found = mockStorage.find((c) => c.id === id);
		setCard(found || null);
	}, [id]);

	if (!card) return <Spin tip="Загрузка..." />;

	return (
		<div style={{ padding: "24px" }}>
			<Title level={2}>Страница организации</Title>
			{card.type === "ko" ? (
				<KoCard
					data={card}
					onDelete={() => {}}
					onEdit={() => {}}
					handleClick={() => {}}
				/>
			) : (
				<BoCard data={card} onDelete={() => {}} onEdit={() => {}} />
			)}
		</div>
	);
};

export default OrganizationPage;
