import { joinFilePath } from "../modules/path/joinFilePath";

export const USERS_FILE_PATH = joinFilePath(["services", "data"], "users.json");
export const ORGANIZATIONS_FILE_PATH = joinFilePath(
  ["services", "data"],
  "organizations.json"
);
export const DOCUMENTS_FILE_PATH = joinFilePath(
  ["services", "data"],
  "documents.json"
);

export const WORKING_HOURS_FILE_PATH = joinFilePath(
  ["services", "data"],
  "workingHours.json"
);
