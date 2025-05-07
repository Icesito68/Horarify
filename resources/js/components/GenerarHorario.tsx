import axios from 'axios';

export async function generarHorario(centroId: number) {
    console.log('Parece que quieres crear un horario');
    console.log('Id del supermercado actual:', centroId);

    try {
        const empleadosResponse = await axios.get(`/api/supermercados/${centroId}/empleados`);
        const empleados = empleadosResponse.data;
        console.log('Empleados:', empleados);

        const festivosResponse = await axios.get(`/api/supermercados/${centroId}/festivos`);
        const festivos = festivosResponse.data;
        console.log('Festivos:', festivos);

        const fechaLunes = obtenerFecha();

        crearHorario(centroId, fechaLunes)

    } catch (err) {
        console.error('Error generando horario:', err);
        throw err;
    }

}

const obtenerFecha = () => {
    const today = new Date();
  
    const dayNumber = today.getDay(); // 0 (domingo) a 6 (sábado)
    const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayName = dayNames[dayNumber];
  
    // Obtener el lunes de la semana actual
    const monday = new Date(today);
    const diff = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Si es domingo (0), retroceder 6 días
    monday.setDate(today.getDate() + diff);
  
    console.log(`Hoy es: ${dayName} (${dayNumber})`);
    console.log(`Lunes de esta semana: ${monday.toLocaleDateString()}`);

    return monday.toLocaleDateString();
  };
  
  const crearHorario = async (centroId: number, fechaLunes: string) => {
    const datosHorario = {
        Lunes: '9:00-18:00',
        Martes: '9:00-18:00',
        Miercoles: '9:00-18:00',
        Jueves: '9:00-18:00',
        Viernes: '9:00-18:00',
        Sabado: '9:00-18:00',
        Domingo: '9:00-18:00',
        Inicio_Semana: fechaLunes,
        supermercado_id: centroId,
        empleado_id: 30,
    };

    try {
        const response = await axios.post(`/api/horarios`, datosHorario);
        console.log('Horario creado correctamente:', response.data);
    } catch (err) {
        console.error('Error creando horario:', err);
    }
};