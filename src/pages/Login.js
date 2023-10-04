import React, { useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { LoginService } from '../service/LoginService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const toast = useRef(null)
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDialogCodigoRecuperarSenha, setObjetoDialogCodigoRecuperarSenha] = useState(false);
    const [codigoRecuperarSenha, setCodigoRecuperarSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [dialogCadastroNovaSenha, setdialogCadastroNovaSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const loginService = new LoginService();


    const fazerLogin = () => {
        setLoading(true);
        loginService.login(email, password, mostrarMensagemErroLogin);
    }

    const mostrarMensagemErroLogin = (erro) => {
        toast.current.show({ severity: 'error', sumary: "Erro", detail: erro, life: 3000 })
    }

    const mostrarMensagemSucesso = (sucess) => {
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: sucess, life: 3000 });
    }

    const recuperacaoSenha = () => {
        setLoading(true)
        loginService.recuperarSenha(email, mostrarMensagemSucesso)
            .then(res => {
                setObjetoDialog(false);
                setObjetoDialogCodigoRecuperarSenha(true)
                setLoading(false)
            })
    };

    const envioCodigoRecuperacaoSenha = () => {
        setLoading(true)
        loginService.recuperarSenhaCodigo(email, novaSenha, codigoRecuperarSenha, mostrarMensagemSucesso)
            .then(res => {
                console.log(res.data)
                mostrarMensagemSucesso("Senha alterada com sucesso!!");
                setObjetoDialogCodigoRecuperarSenha(false);
                setdialogCadastroNovaSenha(false)
                setLoading(false);
            });
    }

    const hideDialog = () => {
        // setSubmitted(false);
        setObjetoDialog(false);
        setObjetoDialogCodigoRecuperarSenha(false)
        setdialogCadastroNovaSenha(false)
    };

    const openNew = () => {
        // setSubmitted(false);
        setObjetoDialog(true);
    };

    const openCadastroNovaSenha = () => {
        setdialogCadastroNovaSenha(true)
    }

    const objetoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button loading={loading} label="Enviar" icon="pi pi-check" className="p-button-text" onClick={recuperacaoSenha} />
        </>
    );

    const objetoCodigoRecuperarSenhaFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button loading={loading} label="Enviar" icon="pi pi-check" className="p-button-text" onClick={openCadastroNovaSenha} />
        </>
    );

    const objetoEnvioNovaSenhaFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button loading={loading} label="Enviar" icon="pi pi-check" className="p-button-text" onClick={envioCodigoRecuperacaoSenha} />
        </>
    );
    // const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    return (
        <div>
            <div style={{ marginTop: '100px' }} className=" flex flex-column align-items-center justify-content-center">
                <Toast ref={toast} />
                {/* eslint-disable-next-line */}
                <img src='images/logo-ITIC.jpg' style={{ marginBottom: '10px', borderRadius: '10px' }} />
                <div style={{ marginTop: '10px', borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            {/* eslint-disable-next-line */}
                            <img src='images/logo_SGprev.png' style={{ width: '180px', marginBottom: '10px', borderRadius: '10px' }} />
                            <div className="text-900 text-3xl font-medium mb-3">Bem vindo ao SG.Prev!</div>
                            <span className="text-600 font-medium">Entrar para continuar</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" type="email" placeholder="Endereço de Email" onChange={(e) => setEmail(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" value={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">
                                        Lembrar de mim
                                    </label>
                                </div>
                                {/* eslint-disable-next-line */}
                                <a onClick={openNew} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Esqueceu sua senha?
                                </a>
                            </div>
                            <Button /*loading={loading}*/ onClick={() => fazerLogin()} label="Entrar" className="w-full p-3 text-xl" ></Button>
                        </div>
                    </div>
                </div>

                <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Recuperar Senha" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="email">Insira seu email cadastrado</label>
                        <InputText type='email' id="email" onChange={(e) => setEmail(e.target.value)} required autoFocus />
                    </div>
                </Dialog>
                <Dialog visible={objetoDialogCodigoRecuperarSenha} style={{ width: '450px' }} header="Código de recuperação" modal className="p-fluid" footer={objetoCodigoRecuperarSenhaFooter} onHide={hideDialog}>
                    <div className="field">
                        <label required htmlFor="email">Insira o código enviado para seu email</label>
                        <InputText required type='text' id="text" onChange={(e) => setCodigoRecuperarSenha(e.target.value)} autoFocus />
                    </div>
                </Dialog>
                <Dialog visible={dialogCadastroNovaSenha} style={{ width: '450px' }} header="Nova senha: " modal className="p-fluid" footer={objetoEnvioNovaSenhaFooter} onHide={hideDialog}>
                    <div className="field">
                        <label required htmlFor="email">Insira sua nova senha: </label>
                        <Password required type='password' id="password" onChange={(e) => setNovaSenha(e.target.value)} autoFocus />
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Login, comparisonFn);
