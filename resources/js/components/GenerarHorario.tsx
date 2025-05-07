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

        return { empleados, festivos };
    } catch (err) {
        console.error('Error generando horario:', err);
        throw err;
    }
}
