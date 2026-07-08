import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:7000',
    headers: { 'Content-Type': 'application/json' }
});

export const estudianteApi = {
    listarMisGrupos: async (estudianteId) => {
        const respuesta = await API.get(`/estudiantes/${estudianteId}/grupos`);
        return respuesta.data;
    },
    unirseAGrupo: async (estudianteId, codigoAcceso) => {
        const respuesta = await API.post(`/estudiantes/${estudianteId}/grupos/unirse`, { codigoAcceso });
        return respuesta.data;
    }
};