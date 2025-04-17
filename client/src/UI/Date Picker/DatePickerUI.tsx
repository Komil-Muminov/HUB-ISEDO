import React from "react";
import "./DatePickerUI.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface TProps {
  control: any;
  nameValue: string;
  labelValue: string;
  borderRadiusStyle: string;
  heightStyle: string;
  widthStyle: string;
  views?: string[];
  disabled?: boolean;
  value?: any;
}

const DatePickerUI = ({
  control,
  nameValue,
  labelValue,
  borderRadiusStyle,
  heightStyle,
  widthStyle,
  views,
  disabled,
  value,
}: TProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Controller
          name={nameValue}
          control={control}
          render={({ field }) => {
            const currentDay = disabled ? dayjs() : field.value;
            return (
              <DatePicker
                disabled={disabled}
                views={views}
                {...field}
                label={labelValue}
                value={value ? value : currentDay} // Теперь это либо объект Dayjs, либо null
                onChange={(newValue) => field.onChange(newValue)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: borderRadiusStyle,
                    height: heightStyle,
                  },
                  width: widthStyle,
                }}
              />
            );
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerUI;
