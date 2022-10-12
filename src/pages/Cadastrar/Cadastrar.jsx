import Form from "../../components/Form/Form"
import Input from "../../components/Input/Input"
import Button from '../../components/Button/Button'
import Alert from "../../components/Alert/Alert"
import Loader from "../../components/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import style from './Cadastrar.module.css'
function Cadastrar(){
    const navigate = useNavigate()
    const [modal, setModal] = useState('')
    const [alert, setAlert] = useState({type: '', message : ''})

    async function cadastrar(e){
        e.preventDefault()
        let emailIsValid;
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        if(password !== confirmPassword){
            setAlert({type: 'error', message : 'Senhas não coincidem'})
            return
        }

        setModal('show')
        await fetch(`${process.env.REACT_APP_API_URL}check_email`,{
            method:'POST',
            body: JSON.stringify({
                email: email,
            }),
            headers:{
                'Content-Type': 'application/json'
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{
            data.body.email === '0' ? emailIsValid = false : emailIsValid = true
        })
        .catch( err =>{
            setModal()
            setAlert({type: 'error', message : 'Erro no servidor'})
            console.log(err)
        })

        if(emailIsValid === undefined){
            setModal()
            return
        }
            

        if(!emailIsValid){
            setModal()
            setAlert({type: 'error', message : 'E-mail já cadastrado. Insira um e-mail diferente'})
            return
        }


        await fetch(`${process.env.REACT_APP_API_URL}user`,{
            method:'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers:{
                'Content-Type': 'application/json'
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{
            if(data.status === 200){
                setModal()
                sessionStorage.setItem('token', data.body.Token)
                navigate('/', {state: {message: 'Cadastro realizado com sucesso'}})

            }else if(data.status === 400){
                setModal()
                setAlert({type: 'error', message : 'Error ao enviar dados '})
            }else{
                setModal()
                setAlert({type: 'error', message : 'Error ao enviar dados. Tente novamente '})
            }
        })
        .catch( err =>{
            setModal()
            setAlert({type: 'error', message : 'Erro no servidor'})
            console.log(err)
        })
            
    }

    return(
        <div className={style.main}>
            <Form submit={cadastrar}>
                <Input
                label="Nome:"
                type="text"
                name={'name'}
                required={true} />

                <Input
                label="E-mail:"
                type="email"
                name={'email'}
                required={true} />

                <Input
                label="Senha:"
                type="password"
                name={'password'}
                required={true} />

                <Input
                label="Confirmar senha:"
                type="password"
                name={'confirmPassword'}
                required={true} />


                <Button
                text="Cadastrar"
                buttonStyle='primary'
                required={true} />

            </Form>

            <Button
            text="Entrar"
            buttonStyle='secondary' 
            handle={(event => navigate('/'))}/>

            <Alert
            alert={alert} />

            <Loader
            display={modal}
            message='Cadastrando novo usuário' />

        </div>
    )
}

export default Cadastrar