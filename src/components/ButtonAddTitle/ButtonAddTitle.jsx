import Modal from "../Modal/Modal"
import Input from '../Input/Input'
import Button from "../Button/Button"
import Alert from "../Alert/Alert"
import Loader from "../Loader/Loader"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from './ButtonAddTitle.module.css'
function ButtonAddTitle({showButton}){
    const navegate = useNavigate()
    const [modal, setModal] = useState()
    const [loader, setLoader] = useState()
    const [alert, setAlert] = useState({type: '', message : ''})

    function createTitle(e){
        e.preventDefault()
        setLoader('show')
        fetch(`${process.env.REACT_APP_API_URL}titles`,{
            method:'POST',
            body: JSON.stringify({
                title:e.target.title.value,
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then(data => {
            setLoader()
            if(data.status === 200){
                localStorage.setItem('title', e.target.title.value)
                navegate(`/lista/${data.body.id}`)
            }
        })
        .catch(err => {
            setLoader()
            setAlert({type: 'error', message : 'Erro no servidor'})
        })
    }
    return (
        <>
            <div onClick={ ()=> {setModal('show') }} className={`${style.addTitle} ${style[showButton]}` }>
                <BsFillPlusCircleFill/>
            </div>

            <Modal display={modal}>
                <div>
                    <h3>Inserir título</h3>
                </div>

                <form onSubmit={createTitle}>
                    <Input type='text' name='title' required={true} />
                    <div className={style.titleButtons}>
                        <Button text={'Cancelar'} handle={()=>{setModal() }} type='button' buttonStyle='secondary'></Button>
                        <Button text={'Salvar'} buttonStyle='primary'></Button>
                    </div>
                    
                </form>
            </Modal>

            <Loader
            display={loader} />

            <Alert
            alert={alert} />
        </>
    )
}

export default ButtonAddTitle