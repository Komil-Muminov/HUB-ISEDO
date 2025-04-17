export interface SubModulsProps {
	id: number;
	title: string;
	route: string;
}

export const subModulsLink: SubModulsProps[] = [
	{
		id: 1,
		title: "Договра",
		route: "/agreement",
	},

	{
		id: 2,
		title: "Счет-фактуры",
		route: "/invoice",
	},

	{
		id: 3,
		title: "Доверенность",
		route: "/attorney",
	},

	{
		id: 4,
		title: "Накладные",
		route: "/Waybill",
	},

	{
		id: 5,
		title: "Командировочные расходы",
		route: "/travelexpenses",
	},

	{
		id: 6,
		title: "Акт выполненных работ",
		route: "/completedworks",
	},
];
