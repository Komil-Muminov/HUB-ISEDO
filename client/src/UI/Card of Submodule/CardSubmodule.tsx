// import { ModulesListScheme } from "../../routes/HR/Modules";
import { SubmodulesScheme } from "../../routes/HR/HrSubmodules/Submodules";
import { Link } from "react-router";
import "./CardSubmodule.css";

// interface TProps {
// 	item: SubmodulesScheme;
// 	isSubmodules: boolean;
// }

// Вывести правильно подмодули кадра
const CardSubmodule = ({ item }) => {
	return (
		<Link to={`${item.link}`} className="card-submodule">
			<div className="image">
				<img src={item?.image} alt="img" />
			</div>
			<div className="title">
				<p>{item?.title}</p>
			</div>
		</Link>
	);
};

export default CardSubmodule;
