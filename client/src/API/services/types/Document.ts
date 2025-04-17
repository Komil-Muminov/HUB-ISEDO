export interface IDocuments {
  id: string | number;
  docType: string;
  state: string;
  date: string;
  files: File;
  userType?: string;
  fullname?: string;
  role?: string;
  subdivision?: string;
  orgName?: string;
  phone?: string;
  email?: string;
  status?: string;
  htmlContent?: string;
}
