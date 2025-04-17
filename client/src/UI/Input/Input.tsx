import "./Input.css";
import { TextField } from "@mui/material";

interface TProps {
  register?: any;
  idValue: string;
  labelValue: string;
  borderRadiusStyle: string;
  heightStyle: string;
  widthStyle: string;
  classname: string | undefined;
  disabled?: boolean;
  value?: string;
}

const Input = ({
  register,
  classname,
  idValue,
  labelValue,
  borderRadiusStyle,
  heightStyle,
  widthStyle,
  disabled,
  value,
}: TProps) => {
  return (
    <TextField
      {...register(idValue)}
      id={idValue}
      value={value}
      label={labelValue}
      disabled={disabled}
      className={classname}
      InputLabelProps={{
        shrink: true, // Убедитесь, что метка поднимается, когда есть значение
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: borderRadiusStyle,
          height: heightStyle,
        },

        width: widthStyle,
      }}
    />
  );
};

export default Input;
