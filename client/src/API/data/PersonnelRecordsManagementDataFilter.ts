export interface PersonnelRecordsManagementDataFilterType {
  id: number;
  title: string;
  types: string[];
}

export const PersonnelRecordsManagementDataFilter: PersonnelRecordsManagementDataFilterType[] =
  [
    {
      id: 1,
      title: "Номер списка",
      types: [],
    },
    {
      id: 2,
      title: "Тип документа",
      types: [],
    },
    {
      id: 3,
      title: "Дата",
      types: [],
    },
    {
      id: 4,
      title: "Сотрудник-(и)",
      types: [],
    },
    {
      id: 5,
      title: "Статус",
      types: [],
    },
  ];
