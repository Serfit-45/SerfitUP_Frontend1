
/** Función que formatea una fecha en formato ISO a un formato legible en español.
 * Esta función se utiliza para mostrar fechas de manera consistente en la interfaz de usuario,
 * facilitando la comprensión de la información temporal por parte de los usuarios.
 * Devuelve una cadena con la fecha formateada en el formato "día de mes de año, hora:minuto". */
export function formatDate(isoString: string) : string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return formatter.format(date);
}