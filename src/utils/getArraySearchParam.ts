// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getArrSearchParam = (arr: any[], paramName: string) => {
	if (!arr.length) return "";
	return arr.map((item) => `&${paramName}[]=${item}`).join("");
};
