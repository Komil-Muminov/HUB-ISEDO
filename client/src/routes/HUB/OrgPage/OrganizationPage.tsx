import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import { CardData } from "../Hub/ui";
import { OrgCard } from "./ui/OrgCard";
import { ContactModal } from "./ui/ContractModal";
import { EditModal } from "./ui/EditModal";
import { OrganizationsFooter } from "./ui/OrganizationsFooter";
import "./style.css";

const OrganizationPage = () => {
	const { id } = useParams<{ id: string }>();
	const [card, setCard] = useState<CardData | null>(null);
	const [editVisible, setEditVisible] = useState(false);
	const [contactVisible, setContactVisible] = useState(false);

	// Моковые данные
	const mockCard: CardData = {
		id: "mock-id",
		name: "Примерная организация",
		type: "ko",
		inn: "1234567890",
		address: "Город, Улица, Дом",
		email: "info@example.org",
		phone: "+7 (123) 456-78-90",
	};

	useEffect(() => {
		const storedCards = localStorage.getItem("cards");
		if (storedCards) {
			try {
				const cards: CardData[] = JSON.parse(storedCards);
				const found = cards.find((c) => c.id === id);
				setCard(found || null);
			} catch (error) {
				console.error("Ошибка при чтении данных:", error);
				setCard(null);
			}
		} else {
			setCard(mockCard);
		}
	}, [id]);

	const updateCard = (updated: CardData) => {
		const storedCards = JSON.parse(localStorage.getItem("cards") || "[]");
		const updatedCards = storedCards.map((c: CardData) =>
			c.id === updated.id ? updated : c,
		);
		localStorage.setItem("cards", JSON.stringify(updatedCards));
		setCard(updated);
	};

	const deleteCard = () => {
		const storedCards = JSON.parse(localStorage.getItem("cards") || "[]");
		const updatedCards = storedCards.filter((c: CardData) => c.id !== card?.id);
		localStorage.setItem("cards", JSON.stringify(updatedCards));
		setCard(null);
		window.location.href = "/isedo/hub/show";
	};

	if (!card)
		return (
			<div style={{ textAlign: "center", marginTop: "50px" }}>
				<Spin tip="Загрузка..." />
			</div>
		);

	return (
		<div className="org-page">
			<div className="main-content">
				<OrgCard
					card={card}
					onEdit={() => setEditVisible(true)}
					onContact={() => setContactVisible(true)}
					onDelete={deleteCard}
				/>
			</div>
			<OrganizationsFooter />
			<EditModal
				open={editVisible}
				onCancel={() => setEditVisible(false)}
				card={card}
				onSave={(updated) => {
					updateCard(updated);
					setEditVisible(false);
				}}
			/>
			<ContactModal
				open={contactVisible}
				onCancel={() => setContactVisible(false)}
				onSend={() => {
					console.log("Сообщение отправлено!");
					setContactVisible(false);
				}}
			/>
		</div>
	);
};
export default OrganizationPage;
