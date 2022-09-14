import Form from "../../components/Form/Form"
import Input from "../../components/Input/Input"
import Button from '../../components/Button/Button'
import style from './Home.module.css'
import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate()

    function login(e){
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_URL}login`,{
            method:'POST',
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            }),
            headers:{
                'Content-Type': 'application/json'
            } 
        })
        .then( (resp) => resp.json() )
        .then( (data) =>{
            sessionStorage.setItem('token', data.Token)
        })
        .catch( err => console.error(err) )

    }



    return(
        <div className={style.main}>
            <Form submit={login}>
                <Input
                label="E-mail:"
                type="email"
                name="email" />

                <Input
                label="Senha:"
                type="password"
                name="password" />

                <Button
                text="Entrar"
                buttonStyle='primary' />

            </Form>

            <Button
            text="Criar conta"
            buttonStyle='secondary' 
            handle={(event => navigate('/cadastrar'))}/>

        </div>
    )
}

export default Home