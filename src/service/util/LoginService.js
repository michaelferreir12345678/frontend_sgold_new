import axios from "axios";
import { ServiceBase } from "../ServiceBase";
// const { getToken } = LoginService()



export class LoginService extends ServiceBase {

    CHAVE_TOKEN = "";

    constructor() {
        super("pessoa-gerenciamento");
    }

    login(email, senha, mensagemErro) {
        this.axiosInstance.post(this.url + "login", { 'email': email, 'senha': senha })
            .then(res => {
                sessionStorage.setItem(this.CHAVE_TOKEN, res.data.token);
                window.location.href = "/";
            })
            .catch(error => {
                mensagemErro(error.response.data.message);
            });
    }

    recuperarSenha = async (email, mostrarMensagemSucesso) => {
        // setLoading(true);
        return await axios({
            method: 'post',
            url: 'http://13.48.92.250/api/pessoa-gerenciamento/senha-codigo',
            data: { "email": email }
        })
            .then(res => {
                console.log(res)
                mostrarMensagemSucesso("Código enviado para seu email!");
                // setLoading(false)
            })
    }

    recuperarSenhaCodigo = async (email, senha, codigoRecuperacaoSenha, mostrarMensagemSucesso) => {
        // setLoading(true)
        return await axios({
            method: 'post',
            url: 'http://13.48.92.250/api/pessoa-gerenciamento/senha-alterar',
            data: { "email": email, "senha": senha, "codigoRecuperacaoSenha": codigoRecuperacaoSenha }
        })
        //  .then(res => {
        //     console.log(res)
        //     mostrarMensagemSucesso();
        //  })
    }

    autenticado() {
        return this.getToken() != null;
    }

    sair() {
        sessionStorage.removeItem(this.CHAVE_TOKEN);
    }

    getToken() {
        return sessionStorage.getItem(this.CHAVE_TOKEN);
    }
}











// export const LoginService = () => {

//     // const axiosInstance = axios.create({
//     //     baseURL: 'http://localhost:8080/api/servico/'
//     // });

//     // this.axiosInstance.interceptors.request.use((config) => {
//     //     const token = getToken();
//     //     const authRequestToken = token ? `Bearer ${token}` : '';
//     //     config.headers.common['Authorization'] = authRequestToken;
//     //     return config;
//     // },
//     //     (error) => Promise.reject(error))


//     const CHAVE_TOKEN = "";

//     const [loading, setLoading] = useState(false);

//     const login = async (email, senha, mostrarMensagemErroLogin) => {
//         setLoading(true)
//         return await axios({
//             method: 'post',
//             url: 'http://localhost:8080/api/pessoa-gerenciamento/login',
//             data: { "email": email, 'senha': senha }
//         })
//             .then(res => {
//                 console.log(res);
//                 localStorage.setItem(CHAVE_TOKEN, res.data.token);
//                 window.location.href = "/"
//                 setLoading(false)

//             })
//             .catch(error => {
//                 console.log(error.response.data.message)
//                 mostrarMensagemErroLogin(error.response.data.message)
//                 setLoading(false)

//             })
//     }

//     const recuperarSenha = async (email, mostrarMensagemSucesso) => {
//         setLoading(true);
//         return await axios({
//             method: 'post',
//             url: 'http://localhost:8080/api/pessoa-gerenciamento/senha-codigo',
//             data: { "email": email }
//         })
//             .then(res => {
//                 console.log(res)
//                 mostrarMensagemSucesso("Código enviado para seu email!");
//                 setLoading(false)
//             })
//     }

//     const recuperarSenhaCodigo = async (email, senha, codigoRecuperacaoSenha, mostrarMensagemSucesso) => {
//         setLoading(true)
//         return await axios({
//             method: 'post',
//             url: 'http://localhost:8080/api/pessoa-gerenciamento/senha-alterar',
//             data: { "email": email, "senha": senha, "codigoRecuperacaoSenha": codigoRecuperacaoSenha }
//         })
//         //  .then(res => {
//         //     console.log(res)
//         //     mostrarMensagemSucesso();
//         //  })
//     }

//     const auteticado = () => {
//         return getToken() != null

//     }

//     const sair = () => {
//         return localStorage.removeItem(CHAVE_TOKEN)
//     }

//     const getToken = () => {
//         return localStorage.getItem(CHAVE_TOKEN)
//     }

//     return {
//         login,
//         recuperarSenha,
//         recuperarSenhaCodigo,
//         auteticado,
//         sair,
//         loading,
//         getToken
//     }
// }