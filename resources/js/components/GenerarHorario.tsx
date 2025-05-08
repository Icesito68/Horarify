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

        for (const empleado of empleados) {
            crearHorario(centroId, fechaLunes, empleado.id, empleado.Dia_Libre, empleado.Especial);
        }

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


  
  const crearHorario = async (
    centroId: number,
    fechaLunes: string,
    empleadoId: number,
    diaLibre: string,
    especial: boolean
) => {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const horario: Record<string, string> = {};

    const indexLibre = dias.indexOf(diaLibre);
    const indexLibreSiguiente = (indexLibre + 1) % 7;

    dias.forEach((dia, index) => {
        if (index === indexLibre || index === indexLibreSiguiente) {
            horario[dia] = 'Libre';
        } else {
            horario[dia] = '9:00-18:00';
        }
    });

    const datosHorario = {
        ...horario,
        Inicio_Semana: fechaLunes,
        supermercado_id: centroId,
        empleado_id: empleadoId,
    };

    try {
        const response = await axios.post(`/api/horarios`, datosHorario);
        console.log('Horario creado correctamente:', response.data);

        await actualizarDiaLibre(empleadoId, diaLibre, especial);

    } catch (err) {
        console.error('Error creando horario o actualizando empleado:', err);
    }
};


const actualizarDiaLibre = async (
    empleadoId: number,
    diaLibreActual: string,
    especial: boolean
) => {
    if (especial) return;

    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const indexActual = dias.indexOf(diaLibreActual);
    const indexNuevo = (indexActual + 1) % 7;
    const nuevoDiaLibre = dias[indexNuevo];

    try {
        await axios.put(`/api/empleados/${empleadoId}`, {
            Dia_Libre: nuevoDiaLibre,
        });
        console.log(`Día libre actualizado a ${nuevoDiaLibre} para empleado ${empleadoId}`);
    } catch (err) {
        console.error(`Error actualizando día libre para empleado ${empleadoId}:`, err);
    }
};
