import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:7000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const grupoApi = {
    listarPorDocente: async (docenteId) => {
        const respuesta = await API.get(`/docentes/${docenteId}/grupos`);
        return respuesta.data;
    },

    obtenerCodigoSugerido: async () => {
        const respuesta = await API.get('/grupos/codigo-sugerido');
        return respuesta.data;
    },

    crearGrupo: async (docenteId, datosGrupo) => {
        const respuesta = await API.post(`/docentes/${docenteId}/grupos`, datosGrupo);
        return respuesta.data;
    },

    actualizar: async (docenteId, grupoId, datosActualizados) => {
        const respuesta = await API.put(`/docentes/${docenteId}/grupos/${grupoId}`, datosActualizados);
        return respuesta.data;
    },

    eliminar: async (docenteId, grupoId) => {
        const respuesta = await API.delete(`/docentes/${docenteId}/grupos/${grupoId}`);
        return respuesta.data;
    }
};