import path from "path";

export const joinFilePath = (mainPaths: string[], filePath?: string) => {
  const pathFile = path.join(process.cwd(), ...mainPaths, filePath);
  return pathFile;
};
