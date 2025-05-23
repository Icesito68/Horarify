import { axiosGet, axiosPost, axiosPut } from '@/lib/axios';
import { Bugfender } from '@bugfender/sdk';
import Swal from 'sweetalert2';

export async function generarHorario(centroId: number) {
    console.log('Parece que quieres crear un horario');
    console.log('Id del supermercado actual:', centroId);

    try {
        const empleadosResponse = await axiosGet(`/api/supermercados/${centroId}/empleados`);
        const empleados = empleadosResponse.data;
        console.log('Empleados:', empleados);

        // Obtener el lunes correcto para la generación de horarios
        const fechaLunes = await obtenerFecha(centroId);
        const festivos = await obtenerFestivos(centroId);

        // ✅ Esperar a que todas las promesas terminen
        await Promise.all(
            empleados.map((empleado: any) =>
                crearHorario(
                    centroId,
                    fechaLunes,
                    empleado.id,
                    empleado.Dia_Libre,
                    empleado.Especial,
                    empleado.Rotativo,
                    empleado.Turno,
                    empleado.Turno_Rotativo,
                    festivos
                )
            )
        );

    Swal.fire({
      icon: 'success',
      title: 'horario creado',
      text: `El nuevo horario se ha creado exitosamente.`,
    });
    Bugfender.log('El nuevo horario se ha creado exitosamente');

    } catch (err) {
        console.error('Error generando horario:', err);
        throw err;
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: `Ha ocurrido un problema creando el nuevo horario.`,
        });
    }
}

const crearHorario = async (
    centroId: number,
    fechaLunes: string,
    empleadoId: number,
    diaLibre: string,
    especial: boolean,
    Rotativo: boolean,
    Turno: string,
    Turno_Rotativo: string,
    festivos: { fecha: string; nombre: string }[]
) => {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const horario: Record<string, string> = {};

    const indexLibre = dias.indexOf(diaLibre);
    const indexLibreSiguiente = (indexLibre + 1) % 7;

    const fechaLunesObj = new Date(fechaLunes);
    const fechasSemana: string[] = [];

    for (let i = 0; i < 7; i++) {
        const fecha = new Date(fechaLunesObj);
        fecha.setDate(fecha.getDate() + i);
        fechasSemana.push(fecha.toISOString().split('T')[0]);
    }

    const vacaciones = await obtenerVacaciones(empleadoId);

    dias.forEach((dia, index) => {
        const fechaDia = fechasSemana[index];

        const festivo = festivos.find(f => f.fecha === fechaDia);
        if (festivo) {
            horario[dia] = festivo.nombre;
        } else if (vacaciones.includes(fechaDia)) {
            horario[dia] = 'Vacaciones';
        } else if (index === indexLibre || index === indexLibreSiguiente) {
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
        const response = await axiosPost(`/api/horarios`, datosHorario);
        console.log('Horario creado correctamente:', response.data);

        await actualizarDiaLibre(empleadoId, diaLibre, especial);

        if (Rotativo) {
            await axiosPut(`/api/empleados/${empleadoId}`, {
                Turno: Turno_Rotativo,
                Turno_Rotativo: Turno,
            });
            console.log(`Turnos intercambiados para empleado ${empleadoId}`);
        }

    } catch (err) {
        console.error('Error creando horario o actualizando empleado:', err);
    }
};

const obtenerFecha = async (centroId: number): Promise<string> => {
    try {
        // Consultar el último horario
        const response = await axiosGet(`/api/supermercados/${centroId}/ultimoHorario`);
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
        await axiosPut(`/api/empleados/${empleadoId}`, {
            Dia_Libre: nuevoDiaLibre,
        });
        console.log(`Día libre actualizado a ${nuevoDiaLibre} para empleado ${empleadoId}`);
    } catch (err) {
        console.error(`Error actualizando día libre para empleado ${empleadoId}:`, err);
    }
};

const obtenerVacaciones = async (empleadoId: number): Promise<string[]> => {
    try {
        const response = await axiosGet(`/api/empleado/${empleadoId}/vacaciones`);
        const { Fecha_inicio, Fecha_fin } = response.data;

        const fechaInicio = new Date(Fecha_inicio);
        const fechaFin = new Date(Fecha_fin);
        const diasVacaciones: string[] = [];

        const currentDate = new Date(fechaInicio);
        while (currentDate <= fechaFin) {
            diasVacaciones.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return diasVacaciones;
    } catch (err) {
        console.warn(`No se pudieron obtener las vacaciones del empleado ${empleadoId}`, err);
        return [];
    }
};


const obtenerFestivos = async (centroId: number): Promise<{ fecha: string; nombre: string }[]> => {
    try {
        const response = await axiosGet(`/api/supermercados/${centroId}/festivos`);
        const festivos = response.data;

        return festivos.map((f: { Fecha: string; Nombre: string }) => ({
            fecha: f.Fecha.split('T')[0],
            nombre: f.Nombre,
        }));
    } catch (err) {
        console.warn(`No se pudieron obtener los festivos del supermercado ${centroId}`, err);
        return [];
    }
};
