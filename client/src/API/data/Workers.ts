export interface IWorker {
	id: number;
	fname: string;
	bDate: string;
	tel: string;
	experience: string;
	fExperience: string;
	position: string;
	org: string;
	email: string;
	citizenship: string;
	workerStatus: string;
	living: string;
	inn: string;
	passportId: string;
	educationLevel: string;
	specialization: string;
	eductionEndingYear: string;
	university: string;
	prevJob: string;
	prevJobPeriod: string;
	prevJobPositon: string;
	prevJobStatus: string;
	currJobStatus: string;
	currJob: string;
	currJobPosition: string;
	currJobPeriod: string;
}

export const WorkerData: IWorker[] = [
	{
		id: 1,
		fname: "Шарипов Амир",
		tel: "+9919999991382",
		bDate: "12.12.1999",
		experience: "3 года, 2 месяца",
		fExperience: "3 года, 2 месяца",
		org: `ГУП "ЦФИТ"`,
		email: "test@gmail.com",
		position: "Специалист",
		citizenship: "Таджикистан",
		living: "г.Душанбе",
		workerStatus: "Активный",
		inn: "12345678",
		passportId: "A123456",
		educationLevel: "Высшее",
		specialization: "IT",
		eductionEndingYear: "2019",
		university: "Университет",
		prevJob: "OOO Технопарк",
		prevJobPeriod: "2021",
		prevJobPositon: "Чойдамкнак",
		prevJobStatus: "Завершенная",
		currJobStatus: "Текущая",
		currJob: 'ГУП "ЦФИТ"',
		currJobPeriod: "2022- настоящее время",
		currJobPosition: "Специалист",
	},
	{
		id: 2,
		fname: "Табаров Комил",
		tel: "+9919999991306",
		bDate: "01.04.1997",
		citizenship: "Таджикистан",
		org: `ГУП "ЦФИТ"`,
		workerStatus: "Активный",
		experience: "3 года, 2 месяца",
		email: "test@gmail.com",
		fExperience: "3 года, 2 месяца",
		position: "Специалист",
		living: "г.Душанбе",
		inn: "12345678",
		passportId: "A123456",
		educationLevel: "Высшее",
		specialization: "IT",
		university: "Университет",
		eductionEndingYear: "2019",
		prevJob: "OOO Технопарк",
		prevJobPeriod: "2021",
		prevJobPositon: "Чойдамкнак",
		prevJobStatus: "Завершенная",
		currJobStatus: "Текущая",
		currJob: 'ГУП "ЦФИТ"',
		currJobPeriod: "2022- настоящее время",
		currJobPosition: "Специалист",
	},
];
