import React, { useEffect, useRef, useState } from "react";
import "./ShowPersonnelRecordsManagement.css";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDocumentById } from "../../../../API/services/documents/getDocumentById";
import { queryClient } from "../../../../API/hooks/queryClient";
import { IDocuments } from "../../../../API/services/types/Document";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import Input from "../../../../UI/Input/Input";
import SelectUI from "../../../../UI/Select/SelectUI";
import { useForm } from "react-hook-form";
import { users } from "../../../../API/data/Users";
import InputFile from "../../../../Components/File Service/File Service Input File/InputFile";
import FileList from "../../../../Components/File Service/File Service File List/FileList";
import { Button } from "@mui/material";
import qrcode from "../../../../assets/qrcode.svg";

import { renderAsync } from "docx-preview";
import { updateDocumentById } from "../../../../API/services/documents/updateDocumentById";
import { useScroll } from "../../../../API/hooks/useScroll";

const ShowPersonnelRecordsManagement = () => {
  const { register, control, watch, reset } = useForm<IDocuments>({
    defaultValues: {
      fullname: "",
      role: "",
      subdivision: "",
      orgName: "",
      phone: "",
      email: "",
      status: "",
    },
  });

  const { id: documentId } = useParams();

  const [currentDocument, setCurrentDocument] = useState<IDocuments | null>(
    null
  );

  const getDocumentByIdQuery = useQuery(
    {
      queryFn: () => getDocumentById(documentId ? documentId : 0),
      queryKey: [`documents-${documentId}`],
    },
    queryClient
  );

  useEffect(() => {
    if (
      getDocumentByIdQuery.status === "success" &&
      getDocumentByIdQuery.data
    ) {
      setCurrentDocument(getDocumentByIdQuery.data);
      reset(getDocumentByIdQuery.data); // Обновляем форму с новыми данными
    } else if (getDocumentByIdQuery.status === "error") {
      console.error(getDocumentByIdQuery.error);
    }
  }, [getDocumentByIdQuery.data, reset]);

  // PARSER DOCX-PREVIEW

  const [originalHTML, setOriginalHTML] = useState<string>("");
  const [textOfDoc, setTextOfDoc] = useState<string>("");

  const confirmationState =
    typeof currentDocument?.state === "string" &&
    parseInt(currentDocument.state) === 2;

  const approvalState =
    typeof currentDocument?.state === "string" &&
    parseInt(currentDocument.state) > 2;

  const affirmationHTML = `
    <div class="wrapper-last-page" padding: 40px;">
      <div class="affirmation-document" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="wrapper-qr-affirmation" style="display: flex; gap: 20px; align-items: center;">
          <div class="qr-code" style="width: 20%; height: 16.6%; border: 1px solid #ccc; overflow: hidden; border-radius: 10px;">
            <img src=${qrcode} alt="" style="width: 100%;" />
          </div>
          <div class="affirmation-content" style="display: flex; flex-direction: column; gap: 20px;">
            <div class="date-of-issue" style="display: flex; flex-direction: column; gap: 2px;">
              <p>Дата выдачи документа</p>
              <p style="font-weight: bold;">21.02.2025</p>
            </div>
            <div class="number-of-document" style="display: flex; flex-direction: column; gap: 2px;">
              <p>Номер документа в реестре</p>
              <p style="font-weight: bold;">С-124</p>
            </div>
          </div>
        </div>
        <div class="affirmation-seal" style="border: 2px dashed #607d8b; display: flex; justify-content: center; padding: 10px; border-radius: 10px;">
          <p style="font-size: 20px; color: #607d8b; font-weight: 600;">УТВЕРЖДЕНО</p>
        </div>
      </div>
    </div>
  `;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const container = document.createElement("div");
        await renderAsync(arrayBuffer, container);
        // Сохраняем исходный HTML
        const generatedHTML = container.innerHTML;
        setOriginalHTML(generatedHTML);
        // Если approvalState уже true – сразу комбинируем
        if (approvalState) {
          setTextOfDoc(generatedHTML + affirmationHTML);
        } else {
          setTextOfDoc(generatedHTML);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (originalHTML) {
      if (approvalState) {
        setTextOfDoc(originalHTML + affirmationHTML);
      } else {
        setTextOfDoc(originalHTML);
      }
    }
  }, [approvalState, originalHTML]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.scrollHeight;
      setNumPages(Math.ceil(totalHeight / 950));
    }
  }, [currentDocument?.htmlContent ? currentDocument?.htmlContent : textOfDoc]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleRefreshFile = () => {
    setTextOfDoc("");
  };

  interface IUpdateDocument {
    documentId: string;
    htmlContent: string;
  }

  const updateDocumentByIdMutate = useMutation<void, Error, IUpdateDocument>({
    mutationFn: (data) => updateDocumentById(data),
    onSuccess: () => {
      // const contractId = variables.get("id");
      queryClient.invalidateQueries({ queryKey: [`documents-${documentId}`] });
      // navigate(`/primary-docs/documents/show/${documentId}`);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении документа:", error.message);
    },
  });

  const showContract =
    (currentDocument?.htmlContent || textOfDoc) +
    (approvalState ? affirmationHTML : "");

  const handleUpdateData = () => {
    if (documentId)
      updateDocumentByIdMutate.mutate({
        documentId: documentId,
        htmlContent: showContract,
      });
  };

  const [moreOrgInfo, setMoreOrgInfo] = useState<boolean>(false);

  const handleClick = (state: boolean, target: string) => {
    if (target === "moreOrgInfo") {
      setMoreOrgInfo(state);
    }
  };

  const { setRefs, scrollTo } = useScroll();

  console.log(confirmationState);

  console.log(currentDocument);

  return (
    <main className="show-personnel-records-management">
      <TitleSection title={currentDocument ? currentDocument?.docType : ""} />
      <PanelControl
        saveButtonState={true}
        handleApproval={handleUpdateData}
        scrollTo={scrollTo}
        setCurrentPage={setCurrentPage}
        lastPages={numPages}
      />
      <TitleSection title="Данные пользователя" />
      <section>
        <form>
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="userType"
            labelValue="Тип пользователя *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.userType}
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="fullname"
            labelValue="ФИО *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.fullname}
          />

          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="role"
            labelValue="Должность *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.role}
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="subdivision"
            labelValue="Подразделение *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.subdivision} // Это значение будет выбранным
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="orgName"
            labelValue="Организация *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.orgName}
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="phone"
            labelValue="Номер телефона *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.phone}
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="email"
            labelValue="Электронная почта *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="49%"
            disabled={true}
            value={currentDocument?.email}
          />
        </form>
      </section>
      <TitleSection title="Оформление документа" />
      <section className="section">
        {currentDocument?.htmlContent ? (
          <FileList />
        ) : (
          <InputFile
            disabled={currentDocument?.htmlContent ? true : false}
            handleFileUpload={handleFileUpload}
          />
        )}

        {/* <input type="file" onChange={handleFileUpload} accept=".docx" /> */}
        {showContract && (
          <div className="doc-viewer">
            <div
              className="doc-container"
              ref={containerRef}
              style={{ position: "relative" }}
            >
              <div
                className="doc-content"
                style={{
                  transform: `translateY(-${currentPage * 950}px)`,
                }}
                dangerouslySetInnerHTML={{ __html: showContract }}
              />
            </div>
            <div className="wrapper-doc-viewer-buttons">
              <div className="panel-control-doc-viewer">
                <Button
                  disabled={confirmationState || approvalState}
                  onClick={handleUpdateData}
                  variant="contained"
                >
                  Подготовить
                </Button>
                <Button
                  disabled={confirmationState || approvalState}
                  onClick={handleRefreshFile}
                  variant="contained"
                >
                  Удалить файл
                </Button>
              </div>
              <div ref={setRefs("docViewer")} className="pagination-controls">
                <Button
                  variant="contained"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  Назад
                </Button>

                <span>
                  Страница {currentPage + 1} из {numPages}
                </span>
                <Button
                  variant="contained"
                  onClick={nextPage}
                  disabled={currentPage === numPages - 1}
                >
                  Вперёд
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ShowPersonnelRecordsManagement;
