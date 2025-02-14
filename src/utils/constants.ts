

export const VALID_RAMAS = [
	"CASTORES",
	"MANADA",
	"SCOUTS",
	"CAMINANTES",
	"ROVERS",
] as const;

export const VALID_PROGRESSIONS = [
	"INTERRAMA",
	"PISTA",
	"RUMBO",
	"TRAVESIA",
] as const;

export const M_RELATIONSHIPS = ["PADRE", "TIO", "HERMANO", "OTRO"] as const;
export const F_RELATIONSHIPS = ["MADRE", "TIA", "HERMANA", "OTRO"] as const;

export const VALID_ENTREGAS_TYPE = [
	"UNIFORME",
	"GUIA",
	"SUBGUIA",
	"PROGPISTA",
	"PROGRUMBO",
	"PROGTRAVESIA",
	"PROMESA",
	"ESPNATURALEZA",
	"ESPARTE",
	"ESPSERVICIO",
	"ESPESPIRITUALIDAD",
	"ESPDEPORTES",
	"ESPCIENCIA",
	"SUPERACION",
] as const;

export const VALID_SEX = ["M", "F"] as const;

export const VALID_METODOS_PAGO = [
	"EFECTIVO",
	"TRANSFERENCIA",
	"OTRO",
] as const;

export const VALID_ROLES = [
	"ADMIN",
	"JEFE",
	"EDUCADOR",
	"COLABORADOR",
	"EXTERNO",
] as const;

export const PAGOS_QUERY_LIMIT = 15;
export const USERS_QUERY_LIMIT = 15;
export const DOCUMENTOS_QUERY_LIMIT = 20;
export const ENTREGAS_QUERY_LIMIT = 20;
export const FAMILIARES_QUERY_LIMIT = 20;
export const SCOUTS_QUERY_LIMIT = 15;

export const VALID_RELIGIONS = [
	"CATOLICA",
	"JUDIA",
	"BUDISTA",
	"EVANGELICA",
] as const;
export const VALID_ESTADO_CIVIL = [
	"CASADO",
	"SOLTERO",
	"SEPARADO",
	"VIUDO"
] as const;
export const VALID_FUNCTIONS = [
	"JOVEN",
	"JEFE",
	"SUBJEFE",
	"AYUDANTE",
	"COLABORADOR",
] as const;

export const VALID_GET_SCOUTS_FILTERS = [
	"apellido",
	"dni",
	"fechaNacimiento",
] as const;

export const VALID_RELATIONSHIPS = [
	"PADRE",
	"MADRE",
	"TIO",
	"TIA",
	"HERMANO",
	"HERMANA",
	"ABUELO",
	"ABUELA",
	"OTRO",
] as const;


export enum EntregaFromEntregaType {
	UNIFORME = "Uniforme Scout",
	GUIA = "Insignia de Guia de patrulla",
	SUBGUIA = "Insignia de Subguia de patrulla",
	PROGPISTA = "Insignia de progresion PISTA",
	PROGRUMBO = "Insignia de progresion RUMBO",
	PROGTRAVESIA = "Insignia de progresion TRAVESIA",
	PROMESA = "Insignia de Promesa",
	ESPNATURALEZA = "Especialidad de Vida en la naturaleza",
	ESPARTE = "Especialidad de Arte, Expresión y Cultura",
	ESPSERVICIO = "Especialidad de Servicio a los demás",
	ESPESPIRITUALIDAD = "Especialidad de Espiritualidad",
	ESPDEPORTES = "Especialidad de Deportes",
	ESPCIENCIA = "Especialidad de Ciencia y Tecnología",
	SUPERACION = "Insignia de Maxima Superacion",

}

export const VALID_ESTADOS = [
	"ACTIVO",
	"INACTIVO",
] as const

export const MENU_COMMANDS = ["pagos", "documentos", "scouts", "familiares", "entregas", "cumpleaños"]

export const SPLIT_STRING = process.env.NODE_ENV === "development" ? " " : ", "

// Number or proxies to skip to limit ips requests by rate-limiter
export const PROXIES_NUMBER = 1;

// If you add origins they will be the only accepted by CORS
export const ACCEPTED_ORIGINS: String[] = [];

export const progresionList = VALID_PROGRESSIONS.map((progresion) => ({
	label: progresion,
	value: progresion,
}));
export const funcionesList = VALID_FUNCTIONS.map((funcion) => ({
	label: funcion,
	value: funcion,
}));
export const religionList = VALID_RELIGIONS.map((religion) => {
	return {
		label: religion,
		value: religion,
	};
});
export const ramasList = VALID_RAMAS.map((rama) => {
	return {
		label: rama,
		value: rama,
	};
});
export const sexoList = [
	{
		label: "Ambos",
		value: "",
	},
	{
		label: "Masculino",
		value: "M",
	},
	{
		label: "Femenino",
		value: "F",
	},
];

export const metodosPagoList = VALID_METODOS_PAGO.map((metodoPago: string) => ({
	label: metodoPago,
	value: metodoPago,
}));
metodosPagoList.unshift({ label: "TODOS", value: "" });
export const tipoEntregaList = VALID_ENTREGAS_TYPE.map((tipoEntrega: string) => ({
	label: tipoEntrega,
	value: tipoEntrega,
}));
tipoEntregaList.unshift({ label: "TODOS", value: "" });

export const trueFalseList = [
	{ label: "Ambos", value: "" },
	{ label: "Si", value: "si" },
	{ label: "No", value: "no" },
];