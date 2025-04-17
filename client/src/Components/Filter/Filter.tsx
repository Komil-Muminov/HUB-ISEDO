import "./Filter.css";
import { DataFilterType } from "../../API/data/dataFilter";
import FilterElement from "./FilterElement/FilterElement";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import {
	ConstructorFilterData,
	ConstructorFilterScheme,
} from "../../API/data/ConstructorFilterData";

interface TProps {
	data: DataFilterType[];
}

const Filter = ({ data }: TProps) => {
	// useLocation
	const location = useLocation();

	const [filter, setFilter] = useState<boolean>(false);
	useEffect(() => {
		if (location.pathname === "/modules/hr/create") {
			setFilter(true);
		} else {
			setFilter(false);
		}
	}, [location.pathname]);
	return (
		<ul className="wrapper-filter">
			{filter ? (
				<>
					{ConstructorFilterData.map((item) => (
						<FilterElement item={item} />
					))}
				</>
			) : (
				<>
					{data.map((e) => {
						return <FilterElement item={e} />;
					})}
				</>
			)}
		</ul>
	);
};

export default Filter;
