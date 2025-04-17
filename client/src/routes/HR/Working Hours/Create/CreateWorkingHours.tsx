import React, { useEffect } from "react";
import "./CreateWorkingHours.css";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import SelectUI from "../../../../UI/Select/SelectUI";
import { useForm } from "react-hook-form";
import DatePickerUI from "../../../../UI/Date Picker/DatePickerUI";
import dayjs, { Dayjs } from "dayjs";
import Input from "../../../../UI/Input/Input";
import { Button, IconButton, Typography } from "@mui/material";
import { SignatureForm } from "../../../../Components/Signature Form/SignatureForm";
import { corditaionUserList } from "../../../../API/data/CoordinationUserList";
import { generateUniqueId } from "../../../../API/hooks/generateUniqueId";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../API/hooks/queryClient";
import { useNavigate } from "react-router";
import { createWorkingHours } from "../../../../API/services/workingHours/createWorkingHoursById";

interface IWorkingHours {
  month: Dayjs | null;
  year: Dayjs | null;
  days: string;
  workingDays: Dayjs | null;
  weekendDays: Dayjs | null;
  executor: string;
  state: string;
}

const If = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return show ? <>{children}</> : null;
};

const CreateWorkingHours = () => {
  const { register, watch, control, handleSubmit, setValue, getValues } =
    useForm<IWorkingHours>({
      defaultValues: {
        month: null,
        year: null,
        days: "",
        workingDays: null,
        weekendDays: null,
        executor: "",
      },
    });

  // Для установки значения из формы в DatePicker
  useEffect(() => {
    setValue("month", dayjs()); // Устанавливаем текущий месяц
    setValue("year", dayjs()); // Устанавливаем текущий месяц
    setValue("days", dayjs().endOf("month").format("DD")); // Устанавливаем текущий месяц
    setValue("executor", "Зиёева Адиба"); // Устанавливаем текущий месяц
  }, [setValue]);

  const navigate = useNavigate();

  const createWorkingHoursMutate = useMutation<any, Error, FormData>({
    mutationFn: (data: FormData) => createWorkingHours(data),
    onSuccess: (_, variables) => {
      const workingHoursId = variables.get("id");
      queryClient.invalidateQueries({ queryKey: "workingHours" });
      navigate(`/modules/hr/submodules/working-hours/show/${workingHoursId}`);
    },
    onError: (error) => {
      console.error(
        "Ошибка при сформировании учета рабочего времени:",
        error.message
      );
      alert("Для данного месяца учет сформирован!");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("id", generateUniqueId());
    formData.append("month", data.month);
    formData.append("year", data.year);
    formData.append("days", data.days);
    formData.append("workingDays", data.workingDays);
    formData.append("weekendDays", data.weekendDays);
    formData.append("executor", data.executor);
    formData.append("state", "1");

    createWorkingHoursMutate.mutate(formData);
    console.log(Array.from(formData.entries()));
  };

  return (
    <main className="create-working-hours">
      <TitleSection title="Новый учет рабочего времени" />
      <PanelControl
        handleSubmit={handleSubmit(onSubmit)}
        saveButtonState={true}
        // editButtonState
      />
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
          />
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="days"
            labelValue="Дни"
            value={dayjs().endOf("month").format("DD")}
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
            disabled={false}
          />
          <DatePickerUI
            control={control}
            nameValue="weekendDays"
            labelValue="Выходные дни"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
            views={["day"]}
            disabled={false}
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
    </main>
  );
};

export default CreateWorkingHours;
