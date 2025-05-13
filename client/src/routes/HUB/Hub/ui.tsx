// Hub.tsx
import { useState } from "react";
import { Row, Col, Empty, Typography, Divider, Modal, Drawer } from "antd";
import HubForm from "./UI/HubForm";
import KoCard from "../../../Components/Card/KoCard";
import BoCard from "../../../Components/Card/BoCard";
import RegistryTable from "../../../Components/RegistryTable/ui";
import EditForm from "../../../Components/EditForm/ui";

const { Title } = Typography;

export interface CardData {
	id: string;
	type: "ko" | "bo";
	name: string;
	orgType?: string;
	tax?: string;
	identificator?: string;
	docNo?: string;
	dateDoc?: string;
	address?: string;
	terCode?: string;
	role?: string;
	image?: string;
}

const Hub = () => {
	const [cards, setCards] = useState<CardData[]>([]);
	const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
	const [editVisible, setEditVisible] = useState(false);

	const addCard = (card: Omit<CardData, "id">) => {
		const newCard: CardData = { ...card, id: `card-${Date.now()}` };
		setCards((prev) => [...prev, newCard]);
	};

	const updateCard = (updated: CardData) => {
		setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
		setSelectedCard(updated);
	};

	const deleteCard = (id: string) => {
		setCards((prev) => prev.filter((c) => c.id !== id));
		setSelectedCard(null);
	};

	const handleRowClick = (id: string) => {
		const card = cards.find((c) => c.id === id);
		if (card) setSelectedCard(card);
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
								<KoCard data={card} onDelete={() => deleteCard(card.id)} />
							</Col>
						) : (
							<Col xs={24} sm={12} md={8} key={card.id}>
								<BoCard data={card} onDelete={() => deleteCard(card.id)} />
							</Col>
						),
					)
				)}
			</Row>
			<Divider>Реестр организаций</Divider>
			<RegistryTable data={cards} onRowClick={handleRowClick} />

			<Drawer
				open={!!selectedCard}
				onClose={() => setSelectedCard(null)}
				title={`Карточка: ${selectedCard?.name}`}
				width={400}
			>
				{selectedCard &&
					(selectedCard.type === "ko" ? (
						<KoCard
							data={selectedCard}
							onDelete={() => deleteCard(selectedCard.id)}
							onEdit={() => setEditVisible(true)}
						/>
					) : (
						<BoCard
							data={selectedCard}
							onDelete={() => deleteCard(selectedCard.id)}
							onEdit={() => setEditVisible(true)}
						/>
					))}
			</Drawer>

			<Modal
				open={editVisible}
				onCancel={() => setEditVisible(false)}
				footer={null}
				title="Редактировать карточку"
			>
				{selectedCard && (
					<EditForm
						card={selectedCard}
						onSave={(updated: CardData) => {
							updateCard(updated);
							setEditVisible(false);
						}}
					/>
				)}
			</Modal>
		</div>
	);
};

export default Hub;
