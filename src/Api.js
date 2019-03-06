import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

const apis = {
    loadCategorias: () => api.get('categorias'),
    deleteCategoria: (id) => api.delete('categorias/' + id)
}

export default apis;
