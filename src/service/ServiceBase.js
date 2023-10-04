import axios from 'axios';
import { LoginService } from './LoginService';

export class ServiceBase {

    constructor(urlBase) {
        this.url = urlBase + '/';
        this.inicializarAxios();
        this.tratamentoErro401();
    }

    inicializarAxios() {
        this.axiosInstance = axios.create({
            baseURL: 'http://13.48.92.250/api/',
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = new LoginService().getToken();
            const authRequestToken = token ? `Bearer ${token}` : '';
            config.headers.common['Authorization'] = authRequestToken;
            return config;
        },
            (error) => Promise.reject(error)
        );
    }

    tratamentoErro401() {
        this.axiosInstance.interceptors.response.use((response) => {
            return response;
        }, (erro) => {
            console.log(erro.response.status);
            // eslint-disable-next-line
            if (erro.response.status == 401) {
                if (!erro.request.response.includes("pessoa-gerenciamento/login")) {
                    new LoginService().sair();
                    window.location.href = "/";
                }
            }
            return Promise.reject(erro);
        });
    }



    listarTodos() {
        return this.axiosInstance.get(this.url);
    }

    buscarId(id) {
        return this.axiosInstance.get(this.url + id);
    }

    inserir(objeto) {
        return this.axiosInstance.post(this.url, objeto);
    }

    alterar(objeto) {
        return this.axiosInstance.put(this.url, objeto);
    }

    excluir(id) {
        return this.axiosInstance.delete(this.url + id);
    }
}