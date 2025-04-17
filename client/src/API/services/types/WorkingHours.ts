import { Dayjs } from "dayjs";

export interface IWorkingHours {
  id: string | number;
  month: Dayjs | null;
  year: Dayjs | null;
  days: string;
  workingDays: Dayjs | null;
  weekendDays: Dayjs | null;
  executor: string;
  htmlContent?: string;
  state: string;
  signatureList: Array<{
    id: number;
    fullName: string;
    role: string;
    status: boolean;
  }>;
}
