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
        obtenerFecha();

        return { empleados, festivos };
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
  };
  
    