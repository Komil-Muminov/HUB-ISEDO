import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { queryClient } from "../../../../API/hooks/queryClient";
import { OrganizationScheme } from "../../../../API/services/organizations/OrganizationScheme";
import { getOrganizationById } from "../../../../API/services/organizations/getOrganizationById";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import Registry from "../../../../components/Registry/Registry";
import "./ShowContracts.css";
// import CardOrganization from "../../../UI/Card of Organization/CardOrganization";
// import { getOrganizations } from "../../../API/services/organizations/getOrganizations";
// import { dataFilter } from "../../../API/data/dataFilter";

const ShowContracts = () => {
	const { id: orgId } = useParams();

	const getOrganizationsQuery = useQuery(
		{
			queryFn: () => getOrganizationById(orgId ? orgId : 0),
			queryKey: [`organizations-${orgId}`],
		},
		queryClient,
	);

	const [organizationsById, setOrganizationsById] =
		useState<OrganizationScheme | null>(null);

	useEffect(() => {
		if (getOrganizationsQuery.status === "success") {
			setOrganizationsById(getOrganizationsQuery.data);
		} else if (getOrganizationsQuery.status === "error") {
			console.error(getOrganizationsQuery.error);
		}
	}, [getOrganizationsQuery]);

	const isActive = true;

	const [modulesTabs, setModulesTabs] = useState([
		{ id: 1, item: "Корреспонденция", status: true },
		{ id: 2, item: "Заявки", status: false },
		{ id: 3, item: "Государственные услуги", status: false },
	]);

	const handleChangeStatus = (item) => {
		setModulesTabs((prevTabs) =>
			prevTabs
				.map((e) => {
					if (e.status) {
						return { ...e, status: false }; // Сбрасываем статус активной вкладки
					}
					return e;
				})
				.map((e) => {
					if (e.id === item.id) {
						return { ...e, status: true }; // Устанавливаем статус активной вкладки
					}
					return e;
				}),
		);
	};

	const currentModulesTab = modulesTabs.find((e) => e.status);

	const correspondenceHeaders = [
		"Номер списка",
		"Входящий номер",
		"Отправитель",
		"Тема",
		"Дата получение",
		"Статус",
		"Срок",
		"Файл",
	];

	const requestHeaders = [
		"Номер списка",
		"Тип заявки",
		"Заявитель",
		"Организация",
		"Дата",
		"Статус",
	];

	const headers =
		currentModulesTab?.item === "Корреспонденция"
			? correspondenceHeaders
			: currentModulesTab?.item === "Заявки"
			? requestHeaders
			: [];

	interface CorrespondenceScheme {
		id: number;
		incomingNumber: string;
		sender: string;
		topic: string;
		dateReceived: string;
		status: string;
		term: string;
		file: string;
	}

	const correspondence: CorrespondenceScheme[] = [
		{
			id: 1,
			incomingNumber: "ВИ-4126",
			sender: "Чамоати дехоти Пунук",
			topic: "Ивази рохбари МБ",
			dateReceived: "22.01.2025 09:00",
			status: "На резолюции",
			term: "24.01.2025",
			file: "Документ.pdf",
		},
		{
			id: 2,
			incomingNumber: "ВИ-4127",
			sender: "ООО 'Прогресс Трейд'",
			topic: "Запрос коммерческого предложения",
			dateReceived: "22.01.2025 11:30",
			status: "На резолюции",
			term: "25.01.2025",
			file: "Запрос_Прогресс.pdf",
		},
		{
			id: 3,
			incomingNumber: "ВИ-4128",
			sender: "МУП 'Городское хозяйство'",
			topic: "Согласование сметы на ремонт",
			dateReceived: "23.01.2025 10:15",
			status: "На резолюции",
			term: "26.01.2025",
			file: "Смета_ремонт.pdf",
		},
		{
			id: 4,
			incomingNumber: "ВИ-4129",
			sender: "АО 'Инвестстрой'",
			topic: "Заключение договора на поставку материалов",
			dateReceived: "24.01.2025 14:00",
			status: "Завершено",
			term: "28.01.2025",
			file: "Договор_материалы.pdf",
		},
		{
			id: 5,
			incomingNumber: "ВИ-4130",
			sender: "ООО 'Глобал Логистик'",
			topic: "Рассмотрение претензии по поставке",
			dateReceived: "25.01.2025 12:45",
			status: "Завершено",
			term: "29.01.2025",
			file: "Претензия.pdf",
		},
		{
			id: 6,
			incomingNumber: "ВИ-4131",
			sender: "Министерство экономики",
			topic: "Проведение проверки деятельности",
			dateReceived: "26.01.2025 09:00",
			status: "Завершено",
			term: "30.01.2025",
			file: "Проверка_документ.pdf",
		},
		{
			id: 7,
			incomingNumber: "ВИ-4132",
			sender: "Чамоати дехоти Чорк",
			topic: "Запрос информации о выполнении плана",
			dateReceived: "27.01.2025 10:30",
			status: "Завершено",
			term: "29.01.2025",
			file: "Запрос_информация.pdf",
		},
	];

	// const correspondenceRow = correspondence.map(
	//   (cor: CorrespondenceScheme, index) => [
	//     cor.id,
	//     index + 1,
	//     cor.incomingNumber,
	//     cor.sender,
	//     cor.topic,
	//     cor.dateReceived,
	//     cor.status,
	//     cor.term,
	//     cor.file,
	//   ]
	// );

	// console.log(correspondence);

	interface RequestScheme {
		id: number;
		reqType: string;
		applicant: string;
		organization: string;
		date: string;
		status: string;
	}

	const request: RequestScheme[] = [
		{
			id: 1,
			reqType: "Смена главного бухгалтера",
			applicant: "Дустов Фирдавс",
			organization: "Мактаби тахсилоти миёнаи умумии №75",
			date: "10.02.2025",
			status: "Завершено",
		},
		{
			id: 2,
			reqType: "Смена главного руководителя",
			applicant: "Давлатов Парвиз",
			organization: "Мактаби тахсилоти миёнаи умумии №75",
			date: "11.02.2025",
			status: "Завершено",
		},
	];

	const handleCurrentRow = (
		correspondenceRow: CorrespondenceScheme[],
		requestRow: RequestScheme[],
	) => {
		for (let element of modulesTabs) {
			if (element.item === "Корреспонденция" && element.status === true) {
				return correspondenceRow.map((cor, index) => [
					cor.id,
					index + 1,
					cor.incomingNumber,
					cor.sender,
					cor.topic,
					cor.dateReceived,
					cor.status,
					cor.term,
					cor.file,
				]); // Преобразуем данные в массивы
			} else if (element.item === "Заявки" && element.status === true) {
				return requestRow.map((req, index) => [
					req.id,
					index + 1,
					req.reqType,
					req.applicant,
					req.organization,
					req.date,
					req.status,
				]); // Преобразуем данные в массивы
			}
		}
	};

	const rows = handleCurrentRow(correspondence, request);

	console.log(rows);

	return (
		<main className="show-contracts">
			<TitleSection title={organizationsById ? organizationsById?.name : ""} />
			<PanelControl editButtonState={false} saveButtonState={true} />
			<TitleSection title="Карточка организации" />
			<TitleSection title="Данные по модулям" />
			<section className="section-tabs">
				<ul className="wrapper-tabs">
					{modulesTabs.map((e) => {
						return (
							<li
								onClick={() => handleChangeStatus(e)}
								key={e.id}
								className={`tab ${e.status ? "tab-active" : ""}`}
							>
								<p className={e.status ? "active" : ""}>{e.item}</p>
							</li>
						);
					})}
					{/* <li className="tab">
            <p className={isActive ? "active" : ""}>Корреспонденция</p>
          </li>
          <li className={`tab ${isActive ? "tab-active" : ""}`}>
            <p className="">Заявки</p>
          </li> */}
				</ul>
				<div className="wrapper-registry">
					<Registry
						headersProps={headers}
						rowsProps={rows}
						status={{ active: "Завершено", inactive: "На резолюции" }}
					/>
				</div>
			</section>
		</main>
	);
};

export default ShowContracts;
