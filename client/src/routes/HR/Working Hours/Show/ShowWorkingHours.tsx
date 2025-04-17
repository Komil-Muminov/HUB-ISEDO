import React, { useEffect, useRef, useState } from "react";
import "./ShowWorkingHours.css";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import DatePickerUI from "../../../../UI/Date Picker/DatePickerUI";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import Input from "../../../../UI/Input/Input";
import { corditaionUserList } from "../../../../API/data/CoordinationUserList";
import { SignatureForm } from "../../../../Components/Signature Form/SignatureForm";
import { Button } from "@mui/material";
import InputFile from "../../../../Components/File Service/File Service Input File/InputFile";
import FileList from "../../../../Components/File Service/File Service File List/FileList";
import qrcode from "../../../../assets/qrcode.svg";
import { renderAsync } from "docx-preview";
import { useScroll } from "../../../../API/hooks/useScroll";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../../API/hooks/queryClient";
import { getWorkingHoursById } from "../../../../API/services/workingHours/getWorkingHoursById";
import { updateWorkingHoursById } from "../../../../API/services/workingHours/updateWorkingHoursById";
import { IWorkingHours } from "../../../../API/services/types/WorkingHours";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import "dayjs/locale/ru"; // Подключаем локаль для русских названий месяцев
import { getMonth, getYear } from "../../../../API/hooks/getData";

const ShowWorkingHours = () => {
  const { register, control, watch, reset } = useForm<IWorkingHours>({
    defaultValues: {
      month: null,
      year: null,
      days: "",
      workingDays: null,
      weekendDays: null,
      executor: "",
    },
  });

  const { id: workingHoursId } = useParams();

  const [currentWorkingHours, setCurrentWorkingHours] =
    useState<IWorkingHours | null>(null);

  const getWorkingHoursByIdQuery = useQuery(
    {
      queryFn: () => getWorkingHoursById(workingHoursId ? workingHoursId : 0),
      queryKey: [`workingHours-${workingHoursId}`],
    },
    queryClient
  );

  useEffect(() => {
    if (
      getWorkingHoursByIdQuery.status === "success" &&
      getWorkingHoursByIdQuery.data
    ) {
      setCurrentWorkingHours(getWorkingHoursByIdQuery.data);
      reset(getWorkingHoursByIdQuery.data); // Обновляем форму с новыми данными
    } else if (getWorkingHoursByIdQuery.status === "error") {
      console.error(getWorkingHoursByIdQuery.error);
    }
  }, [getWorkingHoursByIdQuery.data, reset]);

  // PARSER DOCX-PREVIEW

  const [originalHTML, setOriginalHTML] = useState<string>("");
  const [textOfDoc, setTextOfDoc] = useState<string>("");

  const confirmationState =
    typeof currentWorkingHours?.state === "string" &&
    parseInt(currentWorkingHours.state) === 2;

  const approvalState =
    typeof currentWorkingHours?.state === "string" &&
    parseInt(currentWorkingHours.state) >= 4;

  const showCorditaionSection =
    typeof currentWorkingHours?.state === "string" &&
    parseInt(currentWorkingHours.state) >= 2;

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
  }, [
    currentWorkingHours?.htmlContent
      ? currentWorkingHours?.htmlContent
      : textOfDoc,
  ]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleRefreshFile = () => {
    setTextOfDoc("");
  };

  const showContract =
    (currentWorkingHours?.htmlContent || textOfDoc) +
    (approvalState ? affirmationHTML : "");

  interface IUpdateWorkingHours {
    workingHoursId: string;
    htmlContent?: string;
    signatureList?: Array<{
      id: number;
      fullName: string;
      role: string;
      status: boolean;
    }>;
  }

  const updateWorkingHoursByIdMutate = useMutation<
    void,
    Error,
    IUpdateWorkingHours
  >({
    mutationFn: (data) => updateWorkingHoursById(data),
    onSuccess: () => {
      // const contractId = variables.get("id");
      queryClient.invalidateQueries({
        queryKey: [`workingHours-${workingHoursId}`],
      });
      // navigate(`/primary-docs/working-hours/show/${workingHoursId}`);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении документа:", error.message);
    },
  });

  const handleUpdateData = () => {
    if (workingHoursId)
      updateWorkingHoursByIdMutate.mutate({
        workingHoursId: workingHoursId,
        htmlContent: showContract,
        signatureList: [
          {
            id: 1,
            fullName: "Зиёева Адиба",
            role: "Начальника отдела",
            status: false,
          },
          {
            id: 2,
            fullName: "Ахметова Мадина",
            role: "Начальника отдела",
            status: false,
          },
        ],
      });
  };

  const AddSignature = (data) => {
    console.log(data);

    //   // if (workingHoursId && currentWorkingHours) {
    //   //   const updatedSignatures = currentWorkingHours.signatureList.map(
    //   //     (signature) =>
    //   //       signature.id === signatureId
    //   //         ? { ...signature, status: !signature.status } // меняем статус только у нужной подписи
    //   //         : signature
    //  } //   );

    //   //   updateWorkingHoursByIdMutate.mutate({
    //   //     workingHoursId: workingHoursId,
    //   //     signatureList: updatedSignatures,
    //   //   });
    //
  };

  const [moreOrgInfo, setMoreOrgInfo] = useState<boolean>(false);

  const handleClick = (state: boolean, target: string) => {
    if (target === "moreOrgInfo") {
      setMoreOrgInfo(state);
    }
  };

  const { setRefs, scrollTo } = useScroll();

  const currentMonth = getMonth(currentWorkingHours?.month);
  const currentYear = getYear(currentWorkingHours?.year);

  console.log(currentWorkingHours?.year);

  return (
    <main className="show-working-hours">
      <TitleSection title={`${currentMonth}, ${currentYear} г`} />
      <PanelControl
        saveButtonState={true}
        approvalButtonState={!approvalState}
        handleApproval={handleUpdateData}
        scrollTo={scrollTo}
        setCurrentPage={setCurrentPage}
        lastPages={numPages}
      />
      <TitleSection title="Данные о месяце" />
      <section>
        <form>
          <DatePickerUI
            control={control}
            nameValue="month"
            labelValue="Месяц"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            views={["month"]}
            disabled={true}
            value={null}
          />
          <DatePickerUI
            control={control}
            nameValue="year"
            labelValue="Год"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            views={["year"]}
            disabled={true}
            value={null}
          />

          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="days"
            labelValue="Дни"
            value={"12"}
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            disabled={true}
          />
          <DatePickerUI
            control={control}
            nameValue="workingDays"
            labelValue="Рабочие дни"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            views={["day"]}
            disabled={true}
            value={null}
          />
          <DatePickerUI
            control={control}
            nameValue="weekendDays"
            labelValue="Выходные дни"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            views={["day"]}
            disabled={true}
            value={null}
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="executor"
            labelValue="Ответственное лицо"
            value="Зиёева Адиба"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            disabled={true}
          />
        </form>
      </section>
      <TitleSection title="Табель учета рабочего времени" />
      <section className="section">
        {currentWorkingHours?.htmlContent ? (
          <FileList />
        ) : (
          <InputFile
            disabled={currentWorkingHours?.htmlContent ? true : false}
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
      {showCorditaionSection && (
        <>
          <TitleSection title="Согласование" />
          <section>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              {currentWorkingHours.signatureList.map((e) => {
                return (
                  // Нужно в AddSignature передать id
                  <SignatureForm key={e.id} item={e} onSubmit={AddSignature} />
                );
              })}
            </form>
          </section>
        </>
      )}
    </main>
  );
};

export default ShowWorkingHours;
