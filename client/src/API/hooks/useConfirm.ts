import { useState } from "react";

export const useConfirm = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	const handleToggle = () => {
		setToggle(!toggle);
	};
	return {
		toggle,
		handleToggle,
	};
};
