export interface Customer {
    correo: string;
    nombres: string;
    apellidos?: string;
    razonSocial?: string;
    direccion?: string;
    telefono?: number;
    pais?: string;
    nombreOficial?: string;
    idempresa?: string | null;
}
