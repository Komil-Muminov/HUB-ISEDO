import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../../index.css";

interface FormProps {
	inputs: {
		name: string;
		type?: string;
		placeholder?: string;
		classname?: string;
		value?: string;
		label?: string;
		disabled?: boolean;
		options?: string[];
	}[];
	classname?: string;
	onSubmit?: (data: Record<string, string>) => void;
	submitText?: string;
	sbtClassName?: string;
}

export const Form: React.FC<FormProps> = ({
	inputs,
	classname,
	onSubmit,
	submitText,
	sbtClassName,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Устанавливаем переданные значения в форму
	useEffect(() => {
		inputs.forEach(({ name, value }) => {
			if (name && value !== undefined) {
				setValue(name, value);
			}
		});
	}, [inputs, setValue]);

	return (
		<form className={classname} onSubmit={handleSubmit(onSubmit)}>
			{inputs.map(
				({ name, type, placeholder, classname, label, disabled, options }) => (
					<div key={name}>
						{type === "select" ? (
							<div className="form-custom-select">
								<label htmlFor={name}>{label || "Выберити значение"}</label>
								<select
									{...register(name, { required: "Выберите значение" })}
									className={classname}
									id={name}
								>
									<option value="">Выберите...</option>
									{options?.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
						) : (
							<>
								<label htmlFor={name}>{label}</label>
								<input
									{...register(name, { required: `Поле ${name} обязательно` })}
									type={type || "text"}
									placeholder={placeholder || "Введите данные"}
									className={`input ${classname}`}
									disabled={disabled}
								/>
								{errors[name] && <span>{errors[name]?.message}</span>}
							</>
						)}
					</div>
				),
			)}

			{onSubmit && (
				<Button type="submit" className={`${sbtClassName} btn-mui`}>
					{submitText}
				</Button>
			)}
		</form>
	);
};
