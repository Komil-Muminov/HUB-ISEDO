import dayjs, { Dayjs } from "dayjs";

dayjs.locale("ru");

export const getMonth = (month: Dayjs | null | undefined) => {
  const monthString = month;
  const parsedMonth = dayjs(monthString);

  const currentMonth =
    parsedMonth.format("MMMM")[0].toUpperCase() +
    parsedMonth.format("MMMM").slice(1);

  return currentMonth;
};

export const getYear = (year: Dayjs | null | undefined) => {
  const yearString = year;
  const parsedYear = dayjs(yearString);

  const currentYear = parsedYear.format("YYYY");

  return currentYear;
};
