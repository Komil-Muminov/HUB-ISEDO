import React from "react";
import "./SelectUI.css";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TUsers } from "../../API/data/Users";

interface TData {
  id: number;
  title: string;
}

interface TProps {
  disabled?: boolean;
  control?: any;
  nameValue: string;
  labelValue: string;
  borderRadiusStyle: string;
  heightStyle?: string;
  widthStyle: string;
  data?: TData[] | TUsers[];
  value?: string;
}

const SelectUI = ({
  control,
  disabled,
  nameValue,
  labelValue,
  borderRadiusStyle,
  widthStyle,
  data,
  value,
  heightStyle,
}: TProps) => {
  return (
    <Box width={widthStyle}>
      <Controller
        name={nameValue}
        control={control}
        defaultValue={value || ""} // Передаем value
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="terCode-label">{labelValue}</InputLabel>
            <Select
              {...field}
              id={nameValue}
              disabled={disabled}
              labelId={`${nameValue}-label`}
              label={labelValue}
              sx={{
                height: heightStyle,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: borderRadiusStyle,
                },
              }}
            >
              {data?.map((e) => {
                return (
                  <MenuItem
                    key={e.id}
                    value={"title" in e ? e.title : e.fullname}
                  >
                    {"fullname" in e ? e.fullname : e.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default SelectUI;
