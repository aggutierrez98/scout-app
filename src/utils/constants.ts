

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
	"INSG_GUIA",
	"INSG_SUBGUIA",
	"PROMESA",
	"PROG_PISTA",
	"PROG_RUMBO",
	"PROG_TRAVESIA",
	"ESP_NATURALEZA",
	"ESP_ARTE",
	"ESP_SERVICIO",
	"ESP_ESPIRITUALIDAD",
	"ESP_DEPORTES",
	"ESP_CIENCIA",
	"MAX_SUPERACION",
] as const;

export const VALID_SEX = ["M", "F"] as const;

export const VALID_METODOS_PAGO = [
	"EFECTIVO",
	"TRANSFERENCIA",
	"OTRO",
] as const;

export enum ROLES {
	EXTERNO = "EXTERNO",
	JOVEN = "JOVEN",
	COLABORADOR = "COLABORADOR",
	ACOMPAÑANTE = "ACOMPAÑANTE",
	AYUDANTE_RAMA = "AYUDANTE_RAMA",
	SUBJEFE_RAMA = "SUBJEFE_RAMA",
	JEFE_RAMA = "JEFE_RAMA",
	SUBJEFE_GRUPO = "SUBJEFE_GRUPO",
	JEFE_GRUPO = "JEFE_GRUPO",
	PADRE_REPRESENTANTE = "PADRE_REPRESENTANTE",
	ADMINISTRADOR = "ADMINISTRADOR",
}

export const VALID_ROLES = [
	"EXTERNO",
	"JOVEN",
	"COLABORADOR",
	"ACOMPAÑANTE",
	"AYUDANTE_RAMA",
	"SUBJEFE_RAMA",
	"JEFE_RAMA",
	"SUBJEFE_GRUPO",
	"JEFE_GRUPO",
	"PADRE_REPRESENTANTE",
	"ADMINISTRADOR",
] as const

export const PAGOS_QUERY_LIMIT = 15;
export const USERS_QUERY_LIMIT = 15;
export const DOCUMENTOS_QUERY_LIMIT = 20;
export const ENTREGAS_QUERY_LIMIT = 20;
export const FAMILIARES_QUERY_LIMIT = 20;
export const SCOUTS_QUERY_LIMIT = 15;
export const NOTIFICATIONS_QUERY_LIMIT = 30;

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
	"ACOMPAÑANTE",
	"AYUDANTE_RAMA",
	"SUBJEFE_RAMA",
	"JEFE_RAMA",
	"SUBJEFE_GRUPO",
	"JEFE_GRUPO",
	"PADRE_REPRESENTANTE",
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
	//TODO: Agregar progresiones de otras ramas
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

//@ts-ignore
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
export const tipoEntregaList = VALID_ENTREGAS_TYPE.map((tipoEntrega: string) => ({
	label: tipoEntrega,
	value: tipoEntrega,
}));

export const trueFalseList = [
	{ label: "Ambos", value: "" },
	{ label: "Si", value: "si" },
	{ label: "No", value: "no" },
];

export const VALID_TIPOS_EVENTO = ["SALIDA", "ACANTONAMIENTO", "CAMPAMENTO"] as const

export const tipoEventoList = VALID_TIPOS_EVENTO.map((tipoEvento: string) => ({
	label: tipoEvento,
	value: tipoEvento,
}));


export const FUNCION_TO_ROLE_MAP = {
	"JOVEN": "JOVEN",
	"COLABORADOR": "ACOMPAÑANTE",
	"ACOMPAÑANTE": "ACOMPAÑANTE",
	"AYUDANTE_RAMA": "AYUDANTE_RAMA",
	"SUBJEFE_RAMA": "SUBJEFE_RAMA",
	"JEFE_RAMA": "JEFE_RAMA",
	"SUBJEFE_GRUPO": "SUBJEFE_GRUPO",
	"JEFE_GRUPO": "JEFE_GRUPO",
	"PADRE_REPRESENTANTE": "PADRE_REPRESENTANTE",

} as const;

export const FUNCIONES_MAP = {
	"Asist. Zonal Actividades Seguras": "ACOMPAÑANTE",
	"Asist. Zonal Comunicaciones Institucionales": "ACOMPAÑANTE",
	"Acompañante": "ACOMPAÑANTE",
	"Sub-Jefe de Grupo": "SUBJEFE_GRUPO",
	"Jefe de Grupo": "JEFE_GRUPO",
	"Ayudante de Castores": "AYUDANTE_RAMA",
	"Ayudante de Manada": "AYUDANTE_RAMA",
	"Ayudante de Unidad Scout": "AYUDANTE_RAMA",
	"Ayudante de Comunidad Caminante": "AYUDANTE_RAMA",
	"Ayudante de Comunidad Rover": "AYUDANTE_RAMA",
	"Sub-Jefe de Castores": "SUBJEFE_RAMA",
	"Sub-Jefe de Manada": "SUBJEFE_RAMA",
	"Sub-Jefe de Unidad Scout": "SUBJEFE_RAMA",
	"Sub-Jefe de Comunidad Caminante": "SUBJEFE_RAMA",
	"Sub-Jefe de Comunidad Rover": "SUBJEFE_RAMA",
	"Jefe de Castores": "JEFE_RAMA",
	"Jefe de Manada": "JEFE_RAMA",
	"Jefe de Unidad Scout": "JEFE_RAMA",
	"Jefe de Comunidad Caminante": "JEFE_RAMA",
	"Jefe de Comunidad Rover": "JEFE_RAMA",
	"Padre representante Castores": "PADRE_REPRESENTANTE",
	"Padre representante Manada": "PADRE_REPRESENTANTE",
	"Padre representante Unidad Scout": "PADRE_REPRESENTANTE",
	"Padre representante Comunidad Caminante": "PADRE_REPRESENTANTE",
	"Padre representante Comunidad Rover": "PADRE_REPRESENTANTE",
	"Castor": "JOVEN",
	"Lobato / Lobezna": "JOVEN",
	"Scout": "JOVEN",
	"Caminante": "JOVEN",
	"Rover": "JOVEN",
	"Representante Juvenil al Consejo de Grupo": "JOVEN",
}

export const RAMAS_MAP = {
	"Castores": "CASTORES",
	"Lobatos y Lobeznas": "MANADA",
	"Scouts": "SCOUTS",
	"Caminantes": "CAMINANTES",
	"Rovers": "ROVERS"
} as const
