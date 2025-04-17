export interface TUsers {
  id: number;
  fullname: string;
  role: string;
  subdivision: string;
  orgName: string;
  phone: string;
  email: string;
}

export const users = [
  {
    id: 1,
    fullname: "Шарипов Амир",
    role: "Frontend разработчик",
    subdivision: "Отдел разработки и внедрения информационных прогамм",
    orgName: `ГУП "Центр финансовых информационных технологий"`,
    phone: "999991382",
    email: "jsharipovamir@gmail.com",
  },
  {
    id: 2,
    fullname: "Табаров Комилчон",
    role: "Frontend разработчик",
    subdivision: "Отдел разработки и внедрения информационных прогамм",
    orgName: `ГУП "Центр финансовых информационных технологий"`,
    phone: "999991306",
    email: "kmuminov0104@gmail.com",
  },
];
