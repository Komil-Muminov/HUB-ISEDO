import React, { useState } from "react";
import "./style.css";

interface HubFormProps {
	addCard: (newCard: any) => void;
}

export const HubForm: React.FC<HubFormProps> = ({ addCard }) => {
	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		type: "БО" | "КО",
	) => {
		e.preventDefault();
		const form = e.currentTarget;
		const name = (
			form.querySelector(
				`#${type === "БО" ? "bo" : "ko"}-org-name`,
			) as HTMLInputElement
		).value;
		const comment = form.querySelector(
			`#${type === "БО" ? "bo" : "ko"}-comment` as HTMLTextAreaElement,
		).value;
		const fileInput = form.querySelector(
			`#${type === "БО" ? "bo" : "ko"}-document`,
		) as HTMLInputElement;
		const fileName = fileInput.files?.[0]?.name || "Файл не выбран";

		const newCard = { name, comment, fileName, type };
		addCard(newCard); // передаем данные в родительский компонент

		form.reset();
	};

	return (
		<div className="hub-form">
			<h2 className="hub-form__title">Форма взаимодействия через Хаб</h2>

			<div className="hub-form__section">
				<h3>Бюджетная организация (БО)</h3>
				<form className="form-block" onSubmit={(e) => handleSubmit(e, "БО")}>
					<div className="form-group">
						<label htmlFor="bo-org-name">Название организации</label>
						<input type="text" id="bo-org-name" placeholder="ГУП 'Нефтехим'" />
					</div>
					<div className="form-group">
						<label htmlFor="bo-document">Прикрепить документ</label>
						<input type="file" id="bo-document" />
					</div>
					<div className="form-group">
						<label htmlFor="bo-comment">Комментарий</label>
						<textarea id="bo-comment" rows={4} placeholder="Комментарий..." />
					</div>
					<button type="submit">Отправить КО</button>
				</form>
			</div>

			<div className="hub-form__section">
				<h3>Коммерческая организация (КО)</h3>
				<form className="form-block" onSubmit={(e) => handleSubmit(e, "КО")}>
					<div className="form-group">
						<label htmlFor="ko-org-name">Название организации</label>
						<input type="text" id="ko-org-name" placeholder="ООО 'СтройСнаб'" />
					</div>
					<div className="form-group">
						<label htmlFor="ko-document">Загрузить документ</label>
						<input type="file" id="ko-document" />
					</div>
					<div className="form-group">
						<label htmlFor="ko-comment">Комментарий</label>
						<textarea id="ko-comment" rows={4} placeholder="Комментарий..." />
					</div>
					<button type="submit">Отправить в БО</button>
				</form>
			</div>
		</div>
	);
};
