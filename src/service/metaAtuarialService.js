import { ServiceBase } from "./ServiceBase.js";

export class metaAtuarialService extends ServiceBase {

    constructor(){
        super('servico');
    }

    // async listarTodos() {
    //     return await axios({
    //         method: "get",
    //         url: 'http://localhost:8080/api/servico/',
    //     })
    // };

    // async inserir(objeto) {
    //     return await axios({
    //         method: 'post',
    //         url: 'http://localhost:8080/api/servico/',
    //         data: objeto,
    //     })
    // }


    // async alterar(objeto) {
    //     return await axios({
    //         method: 'put',
    //         url: 'http://localhost:8080/api/servico/',
    //         data: objeto,
    //     })
    // }

    // async excluir(id) {
    //     return await axios({
    //         method: 'delete',
    //         url: 'http://localhost:8080/api/servico/' + id,
    //     })
    // }
}