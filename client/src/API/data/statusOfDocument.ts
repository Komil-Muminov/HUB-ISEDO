export interface StatusOfDocumentScheme {
  id: number;
  statusName: string;
  statusClass: string;
  statusCode: string;
}

export const statusOfDocument: StatusOfDocumentScheme[] = [
  {
    id: 1,
    statusName: "Подготовка",
    statusClass: "preparation",
    statusCode: "1",
  },
  {
    id: 2,
    statusName: "Утверждение",
    statusClass: "affirmation",
    statusCode: "2",
  },
  {
    id: 3,
    statusName: "Завершено",
    statusClass: "completed",
    statusCode: "3",
  },
  {
    id: 4,
    statusName: "Удалено",
    statusClass: "deleted",
    statusCode: "4",
  },
];
