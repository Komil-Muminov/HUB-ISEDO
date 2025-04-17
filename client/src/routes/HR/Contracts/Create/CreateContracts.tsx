import { useEffect, useState } from "react";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import { Button } from "@mui/material";
import UserCard from "../../../../UI/User Card/UserCard";

// ---------------------------------------------------------------------
import { useForm } from "react-hook-form";
import { OrganizationScheme } from "../../../../API/services/organizations/OrganizationScheme";
import Input from "../../../../UI/Input/Input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../API/hooks/queryClient";
import { createOrganization } from "../../../../API/services/organizations/createOrganization";
import { useValid } from "../../../../API/hooks/useValid";
import { useScroll } from "../../../../API/hooks/useScroll";
import "./CreateContracts.css";
import Filter from "../../../../components/Filter/Filter";
import { dataFilter } from "../../../../API/data/dataFilter";

// import { generateUniqueId } from "../../../../API/hooks/generateUniqueId";
// import FindInPageIcon from "@mui/icons-material/FindInPage";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import DatePickerUI from "../../../UI/Date Picker/DatePickerUI";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateContracts = () => {
	const { register, watch, handleSubmit, setValue, getValues } =
		useForm<OrganizationScheme>({
			defaultValues: {
				tax: "",
				identificator: "",
				name: "",
				docNo: "",
				dateDoc: null,
				address: "",
				terCode: "",
				unitAccountingTer: "",
				grbsResonsible: "",
				grbs: "",
				pbs: "",
				bz: [],
				details: [],
				categoryBudget: "",
				orgType: "Бюджетная организация",
				files: [],
			},
		});

	// const orgType = watch("orgType");

	// const [age, setAge] = React.useState("");

	// const handleChange = (event: SelectChangeEvent) => {
	//   setAge(event.target.value as string);
	// };

	// const navigate = useNavigate();

	const formValues = watch();

	const createOrganizationMutate = useMutation<any, Error, FormData>({
		mutationFn: (formData: FormData) => createOrganization(formData),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: "organizations" }),
	});

	// data: OrganizationScheme; arg func
	const onSubmit = () => {
		// const formData = new FormData();
		// Добавляем остальные текстовые поля
		// const orgId = generateUniqueId();
		// formData.append("id", orgId);
		// formData.append("tax", data.tax);
		// formData.append("identificator", data.identificator);
		// formData.append("name", data.name);
		// formData.append("docNo", data.docNo);
		// Если поле dateDoc не пустое, можно привести к строке:
		// if (data.dateDoc) {
		// 	formData.append("dateDoc", data.dateDoc.toISOString());
		// }
		// formData.append("address", data.address);
		// formData.append("terCode", data.terCode);
		// formData.append("unitAccountingTer", data.unitAccountingTer);
		// formData.append("grbsResonsible", data.grbsResonsible);
		// formData.append("grbs", data.grbs);
		// formData.append("pbs", data.pbs);
		// formData.append("categoryBudget", data.categoryBudget);
		// formData.append("orgType", data.orgType);
		// Для массивов (например, bz и details) можно сериализовать JSON-строкой или отправлять как есть,
		// в зависимости от серверной логики.
		// formData.append("bz", JSON.stringify(data.bz));
		// formData.append("details", JSON.stringify(data.details));
		// Добавляем файлы
		// data.files.forEach((file, index) => {
		// 	formData.append("files", file);
		// });
		// formData.append("status", "Активный");
		// createOrganizationMutate.mutate(formData);
		// navigate(`/contracts/show/${orgId}`);
	};

	// Функция для удаления файла по индексу
	// const handleDelete = (fileIndex: number) => {
	// 	const currentFiles = getValues("files") || [];
	// 	const updatedFiles = currentFiles.filter(
	// 		(_: any, index: number) => index !== fileIndex,
	// 	);
	// 	setValue("files", updatedFiles);
	// };

	// Watch INN
	const { validInn } = useValid();
	const Inn = getValues("tax");
	const [isValidInn, setIsValidInn] = useState<boolean>(false);

	const handleCheckInnMutate = useMutation(
		{
			mutationFn: () => validInn(Inn),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["organization"] }),
			onError: (error) => {
				console.log(error.message);
				setIsValidInn(false);
			},
		},
		queryClient,
	);

	const handleCheckInnSubmit = (data: string) => {
		handleCheckInnMutate.mutate(data);
	};

	const [getOrg, setGetOrg] = useState<OrganizationScheme>();
	useEffect(() => {
		if (handleCheckInnMutate.data) {
			setGetOrg(handleCheckInnMutate.data);
			setIsValidInn(true);
		}
	}, [Inn, handleCheckInnMutate.data]);

	// Подтвердить данные при создание дока (AMI)
	// const [confirm, setConfirm] = useState<boolean>(false);
	// useEffect(() => {
	// Если confirm то рендирить(или переход) надо в компонент согласование
	// }, [confirm]);

	// ScrollTo
	const { setRefs, scrollTo } = useScroll();
	useEffect(() => {
		scrollTo("contracts");
	}, [isValidInn]);
	return (
		<main className="contracts create-contracts">
			<TitleSection title="Новый договор" />
			<PanelControl
				handleSubmit={handleSubmit(onSubmit)}
				saveButtonState={!isValidInn ? true : false}
				// editButtonState
			/>
			<Filter data={dataFilter} />
			<TitleSection title="Конструктор" />
			<section>
				<form
					onSubmit={handleSubmit(handleCheckInnSubmit)}
					className="form crtPrimaryDocs__form"
				>
					<Input
						register={register}
						classname="crtPrimaryDocs__form--isDataSuccess"
						idValue="tax"
						labelValue="ИНН *"
						borderRadiusStyle="30px"
						heightStyle="90%"
						widthStyle="85%"
					/>
					<Button type="submit" className="btn-mui constructon__btn--active">
						Получить данные
					</Button>
				</form>
			</section>
			{isValidInn ? (
				<>
					<TitleSection title="Данные для договора" />
					<section>
						{/* <div className="wrapper-documents">
							<InputFile setValue={setValue} getValues={getValues} />
							{formValues.files &&
								formValues.files.map((file: File, index: number) => (
									<FileList
										key={index}
										item={file}
										onDelete={() => handleDelete(index)}
									/>
								))}
						</div> */}
						<div ref={setRefs("contracts")} className="contracts__docs-content">
							{/* <CardOrganization item={getOrg} /> */}
							{/* <OrganizationCard data={getOrg} /> */}
							<div className="contracts__docs-ucard">
								{/* <UserCard
									id="1"
									fullname="Рохбар Рохбаров"
									position="Руководитель"
								/> */}
								<UserCard
									id="2"
									fullname="Сармухосиб Сармухосибев"
									position="Бухгалтер"
								/>
							</div>
						</div>
					</section>
				</>
			) : (
				<div className="invalid-inn">
					<p>Организация с указанным ИНН не найдена.</p>
				</div>
			)}
		</main>
	);
};

export default CreateContracts;
