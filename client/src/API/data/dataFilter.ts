export interface DataFilterType {
	id: number;
	title: string;
	types: string[];
}

export const dataFilter: DataFilterType[] = [
	{
		id: 1,
		title: "Номер документа",
		types: [],
	},
	{
		id: 2,
		title: "Дата",
		types: [],
	},
	{
		id: 3,
		title: "Статус",
		types: [],
	},
	{
		id: 4,
		title: "Сотрудник-(и)",
		types: [],
	},
];
