import notFound from "../../../assets/notfound.png";

export interface SubmodulesScheme {
  id: number;
  title: string;
  image?: string | File | undefined;
  link: string;
}
export const SubModulesList: SubmodulesScheme[] = [
  {
    id: 1,
    title: "Кадровое делопроизводство",
    image: notFound,
    link: "/modules/hr/submodules/personnel-records-management",
  },

  {
    id: 2,
    title: "Личная карточка сотрудника",
    image: notFound,
    link: "/modules/hr/submodules/employee-personal-card/create",
    // link: "/modules/hr/workerCard",
    // link: "/modules/hr/create",
  },

  {
    id: 3,
    title: "Учет рабочего времени",
    image: notFound,
    link: "/modules/hr/submodules/working-hours",
  },

  // {
  //   id: 4,
  //   title: "Кадровая отчетность",
  //   image: notFound,
  //   link: "/modules//hr/submodules/report",
  // },
];
