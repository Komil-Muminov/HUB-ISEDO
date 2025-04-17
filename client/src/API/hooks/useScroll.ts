import { useRef } from "react";

export const useScroll = () => {
	const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
	const setRefs = (id: string) => (item: HTMLDialogElement) => {
		if (item) {
			refs.current[id] = item;
		}
	};
	const scrollTo = (id: string, options = { behavior: "smooth" }) => {
		if (id) {
			refs.current[id]?.scrollIntoView(options);
		}
	};

	return {
		setRefs,
		scrollTo,
	};
};
