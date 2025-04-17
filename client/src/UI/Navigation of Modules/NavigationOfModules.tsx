import "./NavigationOfModules.css";

interface TProps {
	list: any;
	currentList?: string;
}

const NavigationOfModules = ({ list, currentList }: TProps) => {
	return (
		<ul className="modules-submodules-list">
			{list.map((e: any) => {
				return (
					<li className={e.title === currentList ? "active" : ""} key={e.id}>
						{e.title}
					</li>
				);
			})}
		</ul>
	);
};

export default NavigationOfModules;
