// Hub.tsx
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
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
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

	// Отслеживание изменений в localStorage для username
	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "username") {
				const storedUsername = e.newValue;
				const newCanEdit = storedUsername === "kvd" || storedUsername === "km";
				setCanEdit(newCanEdit);
				console.log(
					"canEdit updated to:",
					newCanEdit,
					"for user:",
					storedUsername,
				);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	// Загрузка карточек из localStorage
	useEffect(() => {
		const loadCards = () => {
			const storedCards = localStorage.getItem("cards");
			if (storedCards) {
				try {
					const parsedCards = JSON.parse(storedCards) as CardData[];
					console.log("Загруженные карточки из localStorage:", parsedCards);

					// Удаляем дубликаты по ID
					const uniqueCards = Array.from(
						new Map(
							parsedCards.map((card: CardData) => [card.id, card]),
						).values(),
					);

					setCards(uniqueCards);
					console.log("Установлены уникальные карточки:", uniqueCards);
				} catch (error) {
					console.error("Ошибка при чтении данных из localStorage:", error);
					setCards([]);
				}
			} else {
				console.log("Карточки в localStorage отсутствуют");
				setCards([]);
			}
		};

		loadCards();
	}, []);

	// Сохранение карточек в localStorage при их изменении
	useEffect(() => {
		if (cards.length > 0) {
			console.log("Сохранение карточек в localStorage:", cards);
			try {
				localStorage.setItem("cards", JSON.stringify(cards));
				console.log("Карточки успешно сохранены в localStorage");
			} catch (error) {
				console.error("Ошибка при сохранении карточек в localStorage:", error);
			}
		}
	}, [cards]);

	const addCard = (card: CardData) => {
		console.log("Добавление новой карточки в Hub:", card);

		setCards((prev) => {
			// Проверяем, что карточки с таким ID еще нет
			const exists = prev.some((c) => c.id === card.id);
			if (exists) {
				console.warn("Карточка с ID", card.id, "уже существует");
				return prev;
			}

			const updatedCards = [...prev, card];
			console.log("Обновленный список карточек:", updatedCards);
			return updatedCards;
		});
	};

	const updateCard = (updated: CardData) => {
		console.log("Обновление карточки:", updated);
		setCards((prev) => {
			const updatedCards = prev.map((c) => (c.id === updated.id ? updated : c));
			console.log("Карточки после обновления:", updatedCards);
			return updatedCards;
		});
		setSelectedCard(updated);
	};

	const deleteCard = (id: string) => {
		console.log("Удаление карточки с ID:", id);
		setCards((prev) => {
			const filteredCards = prev.filter((c) => c.id !== id);
			console.log("Карточки после удаления:", filteredCards);
			return filteredCards;
		});
		setSelectedCard(null);
	};

	const handleRowClick = (id: string) => {
		const card = cards.find((c) => c.id === id);
		if (card) {
			setSelectedCard(card);
			navigate(`/isedo/hub/org/${id}`);
		}
	};

	const handleFormSuccess = () => {
		setShowCreateForm(false);
	};

	return (
		<div className="hub-container">
			<Title level={2}>Модуль Хаб</Title>

			<Button
				className="hub-create-button "
				type="primary"
				disabled={!canEdit}
				style={{ display: !canEdit ? "none" : "block" }}
				onClick={() => setShowCreateForm((prev) => !prev)}
			>
				{showCreateForm ? "Скрыть форму" : "Создать организацию"}
			</Button>

			{showCreateForm && (
				<HubForm addCard={addCard} onSuccess={handleFormSuccess} />
			)}

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
