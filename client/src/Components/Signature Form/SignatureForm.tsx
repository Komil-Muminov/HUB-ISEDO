import React, { useEffect, useState } from "react";
import "./SignatureForm.css";
import { Button, Typography } from "@mui/material";
import Input from "../../UI/Input/Input";
import ModeIcon from "@mui/icons-material/Mode";
import { useForm } from "react-hook-form";
import SelectUI from "../../UI/Select/SelectUI";

export interface ICordinationUserListData {
  id: number;
  fullname: string;
  role: string;
  status: boolean;
}

interface ISignatureCoordination {
  item: {
    fullname: string;
    role: string;
  };
}

interface IProps {
  item: ICordinationUserListData;
  onSubmit: any;
}

export const SignatureForm = ({ item, onSubmit }: IProps) => {
  const { register, watch, control, handleSubmit, setValue, getValues } =
    useForm<ISignatureCoordination>({
      defaultValues: {
        fullname: "",
        role: "",
      },
    });

  useEffect(() => {
    setValue("fullname", item.fullname);
    setValue("role", item.role);
  }, [item, setValue]);

  return (
    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
      <Input
        register={register}
        classname="crtPrimaryDocs__form--isDataSuccess"
        idValue="fullname"
        labelValue="ФИО"
        value={item.fullname}
        borderRadiusStyle="30px"
        heightStyle="50px"
        widthStyle="32%"
      />

      <Input
        register={register}
        classname="crtPrimaryDocs__form--isDataSuccess"
        idValue="role"
        labelValue="Должность"
        value={item.role}
        borderRadiusStyle="30px"
        heightStyle="50px"
        widthStyle="32%"
      />
      <Button
        disabled={item.status}
        onClick={handleSubmit(onSubmit)}
        type="submit"
        sx={{
          color: "var(--primary-color)",
          borderColor: "var(--primary-color)",
          width: "32%",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "30px",
        }}
        variant="outlined"
      >
        <ModeIcon />
        <Typography fontSize="14px" fontWeight="500">
          Подписать
        </Typography>
      </Button>
    </div>
  );
};
