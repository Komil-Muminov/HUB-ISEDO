import { HubForm } from "./UI/HubForm";
import { OrganizationCard } from "./UI/OrganizationCard";
import { useState } from "react";

const Hub = () => {
	const [cards, setCards] = useState<any[]>([]);

	// Функция для обновления списка карточек
	const addCard = (newCard: any) => {
		setCards((prev) => [...prev, newCard]);
	};

	return (
		<div>
			<h2>Hub</h2>
			<HubForm addCard={addCard} />
			<div className="hub-cards">
				{cards.length === 0 ? (
					<p>Пока нет добавленных карточек.</p>
				) : (
					cards.map((card, index) => (
						<OrganizationCard
							key={index}
							name={card.name}
							comment={card.comment}
							fileName={card.fileName}
							type={card.type}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Hub;
