import React, { useRef } from "react";
import "./InputFile.css";

interface InputFileProps {
  setValue?: (name: string, value: any) => void;
  getValues?: (name: string) => any;
  handleFileUpload: any;
  disabled: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  setValue,
  getValues,
  handleFileUpload,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files);
  //     const existingFiles = getValues("files") || [];
  //     setValue("files", [...existingFiles, ...newFiles]);
  //   }
  // };

  // При клике по контейнеру запускаем клик на скрытом input
  const handleContainerClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`input-file ${
        disabled ? "input-file-disabled" : "input-file-active"
      }`}
      onClick={handleContainerClick}
    >
      <p className="input-file__title">Нажмите чтобы загрузить файл</p>
      <p className="input-file__desc">Размер файла не должен превышать 10 МБ</p>
      <input
        disabled={disabled}
        accept=".docx"
        type="file"
        ref={inputRef}
        onChange={handleFileUpload}
        multiple
        style={{ display: "none" }} // Скрываем input
      />
    </div>
  );
};

export default InputFile;
