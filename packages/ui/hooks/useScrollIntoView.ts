import { RefObject } from "react";

export function useScrollIntoView() {
	return (ref: RefObject<HTMLDivElement>) => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	}
}