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

        // Obtener el lunes correcto para la generación de horarios
        const fechaLunes = await obtenerFecha(centroId);

        // Generar los horarios para los empleados
        for (const empleado of empleados) {
            crearHorario(
                centroId, fechaLunes, empleado.id, empleado.Dia_Libre, empleado.Especial, 
                empleado.Rotativo, empleado.Turno, empleado.Turno_Rotativo);
        }

    } catch (err) {
        console.error('Error generando horario:', err);
        throw err;
    }
}

const obtenerFecha = async (centroId: number): Promise<string> => {
    try {
        // Consultar el último horario
        const response = await axios.get(`/api/supermercados/${centroId}/ultimoHorario`);
        const lastStart = new Date(response.data.inicio_semana);
        
        // Forzar que lastStart sea lunes
        const lastDay = lastStart.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
        const diffToMonday = lastDay === 0 ? 1 : (1 - lastDay); // Si es domingo (0), suma 1. Si es otro, ajusta al lunes.
        lastStart.setDate(lastStart.getDate() + diffToMonday);
        lastStart.setHours(0, 0, 0, 0);

        // Obtener el lunes de esta semana
        const today = new Date();
        const todayDay = today.getDay();
        const diffTodayToMonday = todayDay === 0 ? -6 : 1 - todayDay;
        const mondayThisWeek = new Date(today);
        mondayThisWeek.setDate(today.getDate() + diffTodayToMonday);
        mondayThisWeek.setHours(0, 0, 0, 0);

        console.log(`Último horario ajustado: ${lastStart.toISOString().split('T')[0]}`);
        console.log(`Lunes actual: ${mondayThisWeek.toISOString().split('T')[0]}`);

        let resultDate: Date;
        if (lastStart.getTime() < mondayThisWeek.getTime()) {
            resultDate = mondayThisWeek;
        } else {
            resultDate = new Date(lastStart);
            resultDate.setDate(resultDate.getDate() + 8); // siguiente lunes
        }

        console.log(`Nuevo lunes a usar: ${resultDate.toISOString().split('T')[0]}`);
        return resultDate.toISOString().split('T')[0];

    } catch (err) {
        console.warn('No se encontró horario anterior. Se usará lunes de esta semana.', err);
    
        const today = new Date();
        const dayNumber = today.getDay(); // 0 (domingo) a 6 (sábado)
        const diffToMonday = dayNumber === 0 ? 1 : 1 - dayNumber;
    
        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);
        monday.setHours(0, 0, 0, 0); // Medianoche
    
        monday.setDate(monday.getDate() + 1);
    
        return monday.toISOString().split('T')[0];
    }    
};


const crearHorario = async (
    centroId: number,
    fechaLunes: string,
    empleadoId: number,
    diaLibre: string,
    especial: boolean,
    Rotativo: boolean,
    Turno: string,
    Turno_Rotativo: string
) => {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const horario: Record<string, string> = {};

    const indexLibre = dias.indexOf(diaLibre);
    const indexLibreSiguiente = (indexLibre + 1) % 7;

    dias.forEach((dia, index) => {
        if (index === indexLibre || index === indexLibreSiguiente) {
            horario[dia] = 'Libre';
        } else {
            horario[dia] = Turno;
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

        if (Rotativo) {
            await axios.put(`/api/empleados/${empleadoId}`, {
                Turno: Turno_Rotativo,
                Turno_Rotativo: Turno,
            });
            console.log(`Turnos intercambiados para empleado ${empleadoId}`);
        }

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
