import axios from "axios";
import { useState } from "react";

export const LoginService = () => {

    const CHAVE_TOKEN = "";

    const [loading, setLoading] = useState(false);

    const login = async (email, senha, mostrarMensagemErroLogin) => {
        setLoading(true)
        return await axios({
            method: 'post',
            url: 'http://localhost:8080/api/pessoa-gerenciamento/login',
            data: { "email": email, 'senha': senha }
        })
            .then(res => {
                console.log(res);
                localStorage.setItem(CHAVE_TOKEN, res.data.token);
                window.location.href = "/"
                setLoading(false)

            })
            .catch(error => {
                console.log(error.response.data.message)
                mostrarMensagemErroLogin(error.response.data.message)
                setLoading(false)

            })
    }

    const recuperarSenha = async (email, mostrarMensagemSucesso) => {
        setLoading(true);
        return await axios({
            method: 'post',
            url: 'http://localhost:8080/api/pessoa-gerenciamento/senha-codigo',
            data: { "email": email }
        })
            .then(res => {
                console.log(res)
                mostrarMensagemSucesso("Código enviado para seu email!");
                setLoading(false)
            })
    }

    const recuperarSenhaCodigo = async (email, senha, codigoRecuperacaoSenha, mostrarMensagemSucesso) => {
        setLoading(true)
        return await axios({
            method: 'post',
            url: 'http://localhost:8080/api/pessoa-gerenciamento/senha-alterar',
            data: { "email": email, "senha": senha, "codigoRecuperacaoSenha": codigoRecuperacaoSenha }
        })
        //  .then(res => {
        //     console.log(res)
        //     mostrarMensagemSucesso();
        //  })
    }

    const auteticado = () => {
        return localStorage.getItem(CHAVE_TOKEN) != null

    }

    const sair = () => {
        return localStorage.removeItem(CHAVE_TOKEN);
    }

    return {
        login,
        recuperarSenha,
        recuperarSenhaCodigo,
        auteticado,
        sair,
        loading,
    }

}