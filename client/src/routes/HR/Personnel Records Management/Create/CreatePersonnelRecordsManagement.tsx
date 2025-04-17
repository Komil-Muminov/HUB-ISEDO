import React, { useEffect, useState } from "react";
import "./CreatePersonnelRecordsManagement.css";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import { documentsList } from "../../../../API/data/documentsList";
import { Button } from "@mui/material";
import Input from "../../../../UI/Input/Input";
import { useForm } from "react-hook-form";
import SelectUI from "../../../../UI/Select/SelectUI";
import { users } from "../../../../API/data/Users";
import { generateUniqueId } from "../../../../API/hooks/generateUniqueId";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryClient } from "../../../../API/hooks/queryClient";
import { createDocument } from "../../../../API/services/documents/createDocument";

interface IEmploymentContract {
  fullname: string;
  role: string;
  subdivision: string;
  orgName: string;
  phone: string;
  email: string;
  status: string;
  userType: string;
}

const CreatePersonnelRecordsManagement = () => {
  const { register, watch, control, handleSubmit, setValue, getValues } =
    useForm<IEmploymentContract>({
      defaultValues: {
        fullname: "",
        role: "",
        subdivision: "",
        orgName: `ГУП "Центр финансовых информационных технологий"`,
        phone: "",
        email: "",
        status: "Активный",
        userType: "Новый",
      },
    });

  const userType = watch("userType");
  const chooseUser = watch("fullname");

  const currentUser = users.find((e) => e.fullname === chooseUser);

  // Используйте useEffect для обновления значений формы при изменении fullname
  useEffect(() => {
    if (userType === "Новый") {
      // Если выбран "Новый", очищаем fullname и другие поля
      setValue("fullname", "");
      setValue("role", "");
      setValue("subdivision", "");
      setValue("phone", "");
      setValue("email", "");
    } else if (currentUser) {
      // Если выбран существующий пользователь и он найден, устанавливаем данные
      setValue("role", currentUser.role);
      setValue("subdivision", currentUser.subdivision);
      setValue("phone", currentUser.phone);
      setValue("email", currentUser.email);
    }
  }, [userType, currentUser, setValue]);

  const [activeTab, setActiveTab] = useState<string>(documentsList[0].item);

  const onSubmit = (data: IEmploymentContract) => {
    const formData = new FormData();

    if (activeTab === "Трудовой договор") {
      formData.append("fullname", data.fullname);
      formData.append("role", data.role);
      formData.append("subdivision", data.subdivision);
      formData.append("orgName", data.orgName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("status", data.status);
      formData.append("userType", data.userType);
    }

    formData.append("id", generateUniqueId());
    formData.append("docType", activeTab);
    formData.append("state", "1");
    formData.append("date", new Date().toISOString().split("T")[0]);

    createDocumentMutate.mutate(formData);
    console.log(Array.from(formData.entries()));
  };

  const navigate = useNavigate();

  const createDocumentMutate = useMutation<any, Error, FormData>({
    mutationFn: (data: FormData) => createDocument(data),
    onSuccess: (_, variables) => {
      const documentId = variables.get("id");
      queryClient.invalidateQueries({ queryKey: "documents" });
      navigate(
        `/modules/hr/submodules/personnel-records-management/show/${documentId}`
      );
    },
    onError: (error) => {
      console.error("Ошибка при создании трудового договора:", error.message);
      alert("Для данного сотрудника трудовой договор уже существует!");
    },
  });

  return (
    <main className="create-personnel-records-management">
      <TitleSection title="Новый документ" />
      <PanelControl
        handleSubmit={handleSubmit(onSubmit)}
        saveButtonState={true}
        // editButtonState
      />
      <section>
        <div className="wrapper-nav-documents-list">
          {documentsList.map((tab) => (
            <Button
              onClick={() => setActiveTab(tab.item)}
              className={activeTab === tab.item ? "active-tab" : ""}
              key={tab.id}
              variant={activeTab === tab.item ? "contained" : "outlined"}
            >
              {tab.item}
            </Button>
          ))}
        </div>
      </section>
      {/* Трудовой договор */}
      {activeTab === "Трудовой договор" && (
        <>
          <TitleSection title="Данные пользователя" />
          <section>
            <form>
              <SelectUI
                control={control}
                nameValue="userType"
                labelValue="Тип пользователя"
                borderRadiusStyle="30px"
                widthStyle="100%"
                data={[
                  {
                    id: 1,
                    title: "Новый",
                  },
                  { id: 2, title: "Существующий" },
                ]}
              />
              {userType === "Новый" && (
                <Input
                  register={register}
                  classname="crtPrimaryDocs__form--isDataSuccess"
                  idValue="fullname"
                  labelValue="ФИО *"
                  borderRadiusStyle="30px"
                  heightStyle="90%"
                  widthStyle="49%"
                />
              )}
              {userType === "Существующий" && (
                <SelectUI
                  control={control}
                  nameValue="fullname"
                  labelValue="ФИО *"
                  borderRadiusStyle="30px"
                  widthStyle="49%"
                  data={users}
                />
              )}

              <Input
                register={register}
                classname="crtPrimaryDocs__form--isDataSuccess"
                idValue="role"
                labelValue="Должность *"
                borderRadiusStyle="30px"
                heightStyle="90%"
                widthStyle="49%"
              />
              <SelectUI
                control={control}
                nameValue="subdivision"
                labelValue="Подразделение *"
                borderRadiusStyle="30px"
                widthStyle="49%"
                data={
                  currentUser
                    ? [{ id: 1, title: currentUser.subdivision }]
                    : [
                        {
                          id: 1,
                          title:
                            "Отдел разработки и внедрения информационных программ",
                        },
                        { id: 2, title: "Отдел по работе с клиентами" },
                        { id: 3, title: "Отдел кадров" },
                        { id: 3, title: `ГУП "ЦФИТ"` },
                      ]
                }
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
              />
              <Input
                register={register}
                classname="crtPrimaryDocs__form--isDataSuccess"
                idValue="phone"
                labelValue="Номер телефона *"
                borderRadiusStyle="30px"
                heightStyle="90%"
                widthStyle="49%"
              />
              <Input
                register={register}
                classname="crtPrimaryDocs__form--isDataSuccess"
                idValue="email"
                labelValue="Электронная почта *"
                borderRadiusStyle="30px"
                heightStyle="90%"
                widthStyle="49%"
              />
            </form>
          </section>
          {/* <TitleSection title="Трудовой договор" />
          <section></section> */}
        </>
      )}

      {/* Другие документы */}
      {activeTab !== "Трудовой договор" && <p>На этапе разработки...</p>}
    </main>
  );
};

export default CreatePersonnelRecordsManagement;
