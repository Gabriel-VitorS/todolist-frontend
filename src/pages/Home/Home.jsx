import Form from "../../components/Form/Form"
import Input from "../../components/Input/Input"
import Button from '../../components/Button/Button'
import Loader from "../../components/Loader/Loader"
import Alert from "../../components/Alert/Alert"
import style from './Home.module.css'
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

function Home(){
    const navigate = useNavigate()
    const location = useLocation()
    const [modal, setModal] = useState('')
    const [alert, setAlert] = useState({type: '', message : ''})

    let message = ''
    if(location.state)
        message = location.state.message
        
    useEffect(()=>{
        if(message !== '')
            setAlert({type: 'sucess', message : message})
        
    }, [message])


    function login(e){
        e.preventDefault()
        
        const email = e.target.email.value
        const password = e.target.password.value

        setModal('show')

        fetch(`${process.env.REACT_APP_API_URL}login`,{
            method:'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers:{
                'Content-Type': 'application/json'
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{

            setModal()
            if(data.status === 200){
                sessionStorage.setItem('token', data.body.Token)
                navigate('/listas')
            }else if(data.status === 400){
                setAlert({type: 'error', message : 'Usuário invalido'})
            }else{
                setAlert({type: 'error', message : 'Error ao enviar dados. Tente novamente '})
            }
            
        })
        .catch( 
            err => {
            setModal()
            setAlert({type: 'error', message : 'Erro no servidor'})
            console.error(err)
            
        })

    }

    useEffect(()=>{
        if(sessionStorage.token !== undefined || sessionStorage.token !== 'undefined'){
            sessionStorage.removeItem('token')
        }
    },[])
    

    return(
        <div className={style.main}>
            <Form submit={login}>
                <Input
                label="E-mail:"
                type="email"
                name="email"
                required={true}
                />

                <Input
                label="Senha:"
                type="password"
                name="password"
                required={true}
                />

                <Button
                text="Entrar"
                buttonStyle='primary' />

            </Form>

            <Button
            text="Criar conta"
            buttonStyle='secondary' 
            handle={(event => navigate('/cadastrar'))}/>

            <Loader
            display={modal} />

            <Alert
            alert={alert} />
        </div>
    )
}

export default Home