import { Form } from "../Form/Form";
import TitleSection from "../Title of Section/TitleSection";

const EducationCard: React.FC<{ [key: string]: string | undefined }> = ({
	item,
}) => {
	return (
		<>
			<TitleSection title="Профессиональная информаци" />
			<Form inputs={[{ name: "education-level", value: item.name }]} />
		</>
	);
};
export default EducationCard;
