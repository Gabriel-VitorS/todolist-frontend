import Form from "../../components/Form/Form"
import Input from "../../components/Input/Input"
import Button from '../../components/Button/Button'
import { useNavigate } from "react-router-dom"

import style from './Cadastrar.module.css'
function Cadastrar(){
    const navigate = useNavigate()

    return(
        <div className={style.main}>
            <Form>
                <Input
                label="Nome:"
                type="text" />

                <Input
                label="E-mail:"
                type="email" />

                <Input
                label="Senha:"
                type="password" />

                <Input
                label="Confirmar senha:"
                type="password" />


                <Button
                text="Cadastrar"
                buttonStyle='primary' />

            </Form>

            <Button
            text="Entrar"
            buttonStyle='secondary' 
            handle={(event => navigate('/'))}/>

        </div>
    )
}

export default Cadastrar