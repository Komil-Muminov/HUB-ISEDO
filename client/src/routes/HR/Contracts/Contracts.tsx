import React, { useEffect, useState } from "react";
import Filter from "../../../components/Filter/Filter";
import { dataFilter } from "../../../API/data/dataFilter";
import Registry from "../../../components/Registry/Registry";
import { Link } from "react-router";
import { getOrganizations } from "../../../API/services/organizations/getOrganizations";
import { queryClient } from "../../../API/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { OrganizationScheme } from "../../../API/services/organizations/OrganizationScheme";
import "../Modules.css";
import "./Contracts.css";
import NavigationSubmodules from "../../../UI/Navigation of Modules/NavigationOfModules";

const Contracts: React.FC = () => {
	const [organizations, setOrganizations] = useState<OrganizationScheme[]>([]);

	const getOrganizationsQuery = useQuery(
		{
			queryFn: () => getOrganizations(),
			queryKey: ["organizations"],
		},
		queryClient,
	);

	useEffect(() => {
		if (getOrganizationsQuery.status === "success") {
			setOrganizations(getOrganizationsQuery.data);
		}
	}, [getOrganizationsQuery.data]);

	const headers = dataFilter
		.filter((e) => {
			return [
				"Номер списка",
				"Идентификатор",
				"Наименование",
				"ИНН организации",
				"Тип организации",
				"Статус",
			].includes(e.title);
		})
		.map((e) => e.title);

	const rows = organizations.map((org: OrganizationScheme, index) => [
		org.id, // Добавляем id в начало строки, но не отображаем его
		index + 1, // Номер списка
		org.identificator, // Идентификатор
		org.name, // Наименование
		org.tax, // ИНН организации
		org.orgType, // Тип организации
		org.status, // Статус
	]);

	const submodulesList: { id: number; title: string; link: string }[] = [
		{
			id: 1,
			title: "Кадр",
			link: "hr/contracts",
		},
		{
			id: 2,
			title: "Первичные документы",
			link: "/primary-docs/contracts",
		},
		{
			id: 3,
			title: "CRM",
			link: "/crm/contracts",
		},
		{
			id: 4,
			title: "Корреспонденция",
			link: "/correspondence/contracts",
		},
		{
			id: 5,
			title: "Заявки",
			link: "/request/contracts",
		},
		{
			id: 6,
			title: "Государственные услуги",
			link: "/egov-services/contracts",
		},

		{
			id: 7,
			title: "Хаб",
			link: "/hub/contracts",
		},
	];

	return (
		<main className="submodule-contracts">
			<NavigationSubmodules list={submodulesList} currentList="Кадр" />
			<section>
				<h1 className="module-title">Реестр</h1>
				<div className="panel-control-filter">
					<Filter data={dataFilter} />
					<Link to="/modules/hr/create">
						<button>Добавить</button>
					</Link>
				</div>
			</section>
			<section>
				<Registry
					headersProps={headers}
					rowsProps={rows}
					status={{ active: "Активный", inactive: "Неактивный" }}
				/>
			</section>
		</main>
	);
};

export default Contracts;
