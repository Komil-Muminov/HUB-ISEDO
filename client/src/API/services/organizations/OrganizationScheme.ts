import { Dayjs } from "dayjs";

export interface OrganizationScheme {
  id?: string | number;
  tax: string;
  identificator: string;
  name: string;
  docNo: string;
  dateDoc: Dayjs | null;
  address: string;
  terCode: string;
  unitAccountingTer: string;
  grbsResonsible: string;
  grbs: string;
  pbs: string;
  bz: Array<{
    id: number;
    title: string;
  }>;
  details: Array<{
    id: number;
    title: string;
  }>;
  categoryBudget: string;
  orgType: string;
  files: File[];
  status: string;
}
