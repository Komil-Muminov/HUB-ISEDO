import { useState } from "react";
import { Row, Col, Empty, Typography } from "antd";
import HubForm from "./UI/HubForm";
import KoCard from "../../../Components/Card/KoCard";
import BoCard from "../../../Components/Card/BoCard";
import "./Hub.css";

const { Title } = Typography;

interface CardData {
	type: "ko" | "bo";
	name: string;
	orgType?: string;
	tax?: string;
	identificator?: string;
	docNo?: string;
	dateDoc?: Date | string;
	address?: string;
	terCode?: string;
	role?: string;
	image?: string;
	target?: string;
	id?: string;
}

const Hub = () => {
	const [cards, setCards] = useState<CardData[]>([]);

	const handleClick = (state: boolean, target?: string) => {
		console.log(`Клик по карточке: state=${state}, target=${target}`);
	};

	const addCard = (newCard: CardData) => {
		if (!newCard.name || !["ko", "bo"].includes(newCard.type)) {
			alert("Некорректные данные карточки");
			return;
		}

		const isDuplicate = cards.some(
			(card) => card.name === newCard.name && card.type === newCard.type,
		);
		if (isDuplicate) {
			alert("Такая карточка уже существует!");
			return;
		}

		newCard.id = `card-${Date.now()}`;
		setCards((prev) => [...prev, newCard]);
	};

	const deleteCard = (id: string) => {
		setCards((prev) => prev.filter((card) => card.id !== id));
	};

	return (
		<div className="hub-container">
			<Title level={2}>Хаб организаций</Title>
			<HubForm addCard={addCard} />
			<Row gutter={[16, 16]} className="hub-cards">
				{cards.length === 0 ? (
					<Col span={24} style={{ textAlign: "center" }}>
						<Empty description="Пока нет добавленных карточек" />
					</Col>
				) : (
					cards.map((card) =>
						card.type === "ko" ? (
							<Col xs={24} sm={12} md={8} key={card.id}>
								<KoCard
									data={{
										name: card.name,
										orgType: card.orgType || "Не указано",
										tax: card.tax || "Не указано",
										identificator: card.identificator || "Не указано",
										docNo: card.docNo || "Не указано",
										dateDoc: card.dateDoc ? new Date(card.dateDoc) : new Date(),
										address: card.address || "Не указано",
										terCode: card.terCode || "Не указано",
									}}
									handleClick={handleClick}
									onDelete={() => deleteCard(card.id!)}
									target={card.target || `card-${card.id}`}
								/>
							</Col>
						) : (
							<Col xs={24} sm={12} md={8} key={card.id}>
								<BoCard
									data={{
										name: card.name,
										role: card.role || "Не указано",
										image: card.image || "",
									}}
									onViewProfile={() => console.log(`Подробнее о ${card.name}`)}
									onDelete={() => deleteCard(card.id!)}
								/>
							</Col>
						),
					)
				)}
			</Row>
		</div>
	);
};

export default Hub;
