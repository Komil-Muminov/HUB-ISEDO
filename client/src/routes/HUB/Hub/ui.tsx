import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Modal, Drawer, Button } from "antd";
import HubForm from "./UI/HubForm";
import KoCard from "../../../Components/Card/KoCard";
import BoCard from "../../../Components/Card/BoCard";
import RegistryTable from "../../../Components/RegistryTable/ui";
import EditForm from "../../../Components/EditForm/ui";
import "./Hub.css";

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
	const [canEdit, setCanEdit] = useState(false);
	const navigate = useNavigate();

	// Инициализация canEdit
	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		const newCanEdit = storedUsername === "kvd" || storedUsername === "km";
		setCanEdit(newCanEdit);
		console.log(
			"canEdit initialized to:",
			newCanEdit,
			"for user:",
			storedUsername,
		);
	}, []);

	// Отслеживание изменений в localStorage
	useEffect(() => {
		const handleStorageChange = () => {
			const storedUsername = localStorage.getItem("username");
			const newCanEdit = storedUsername === "kvd" || storedUsername === "km";
			setCanEdit(newCanEdit);
			console.log(
				"canEdit updated to:",
				newCanEdit,
				"for user:",
				storedUsername,
			);
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	// Загрузка карточек из localStorage один раз при монтировании
	useEffect(() => {
		const storedCards = localStorage.getItem("cards");
		if (storedCards) {
			try {
				const parsedCards = JSON.parse(storedCards);
				console.log("Загруженные карточки из localStorage:", parsedCards);
				setCards((prev) => {
					// Сохраняем только уникальные карточки, избегая дублирования
					const uniqueCards = Array.from(
						new Map(
							parsedCards.map((card: CardData) => [card.id, card]),
						).values(),
					);
					return uniqueCards;
				});
			} catch (error) {
				console.error("Ошибка при чтении данных:", error);
				setCards([]);
			}
		} else {
			console.log("Карточки в localStorage отсутствуют");
		}
	}, []); // Пустой массив зависимостей — выполняется только при монтировании

	// Сохранение карточек в localStorage при их изменении
	useEffect(() => {
		console.log("Сохранение карточек в localStorage:", cards);
		localStorage.setItem("cards", JSON.stringify(cards));
	}, [cards]);

	const addCard = (card: Omit<CardData, "id">) => {
		const newCard: CardData = {
			...card,
			id: `card-${Date.now()}`,
		};
		console.log("Добавление новой карточки:", newCard);
		setCards((prev) => {
			const updatedCards = [...prev, newCard];
			console.log("Обновленный список карточек:", updatedCards);
			return updatedCards;
		});
	};

	const updateCard = (updated: CardData) => {
		console.log("Обновление карточки:", updated);
		setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
		setSelectedCard(updated);
	};

	const deleteCard = (id: string) => {
		console.log("Удаление карточки с ID:", id);
		setCards((prev) => prev.filter((c) => c.id !== id));
		setSelectedCard(null);
	};

	const handleRowClick = (id: string) => {
		const card = cards.find((c) => c.id === id);
		if (card) {
			setSelectedCard(card);
			navigate(`/isedo/hub/org/${id}`);
		}
	};

	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

	return (
		<div className="hub-container">
			<Title level={2}>Модуль Хаб</Title>

			<Button
				className="hub-create-button"
				type="primary"
				disabled={!canEdit}
				onClick={() => setShowCreateForm((prev) => !prev)}
			>
				{showCreateForm ? "Скрыть форму" : "Создать организацию"}
			</Button>

			{showCreateForm && <HubForm addCard={addCard} />}

			<RegistryTable data={cards} onRowClick={handleRowClick} />

			<Drawer
				open={!!selectedCard}
				onClose={() => setSelectedCard(null)}
				title={selectedCard ? `Карточка: ${selectedCard.name}` : "Карточка"}
				width={460}
			>
				{selectedCard &&
					(selectedCard.type === "ko" ? (
						<KoCard
							data={selectedCard}
							onDelete={() => deleteCard(selectedCard.id)}
							onEdit={() => setEditVisible(true)}
							canEdit={canEdit}
						/>
					) : (
						<BoCard
							data={selectedCard}
							onDelete={() => deleteCard(selectedCard.id)}
							onEdit={() => setEditVisible(true)}
							canEdit={canEdit}
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
