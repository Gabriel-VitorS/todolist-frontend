import style from './HeaderTasks.module.css'
import Modal from "../Modal/Modal"
import Button from "../Button/Button"
import Input from '../Input/Input'
import { BsFillArrowLeftCircleFill, BsPencilFill, BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function HeaderTasks({id, atualizaTitle}){
    const navegate = useNavigate()
    const [modal, setModal] = useState()
        
    function deletaTask(){
        navegate(-1)
        fetch(`${process.env.REACT_APP_API_URL}titles/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{
            
        })
        .catch( 
            err => {
            console.log(err)
        })
    }

    
    return(
        <header className={style.HeaderTasks}>
            <div onClick={ ()=> navegate(-1) } className={style.returnButton}>
                <BsFillArrowLeftCircleFill className='cursorPointer' />
            </div>

            <div className={style.buttons}>
                <div className={style.editButton}>
                    <BsPencilFill onClick={()=> setModal('show')} />
                </div>
                <div className={style.trashButton} onClick={deletaTask}>
                    <BsTrash />
                </div>
            </div>


            <Modal display={modal}>
                <div>
                    <h3>Atualizar titulo</h3>
                </div>

                <form onSubmit={atualizaTitle} id='updateTitle'>
                    <Input type='text' name='title' required={true} />
                    <div className={style.titleButtons}>
                        <Button text={'Cancelar'} handle={()=>{setModal() }} type='button' buttonStyle='secondary'></Button>
                        <Button text={'Salvar'} buttonStyle='primary'></Button>
                    </div>
                    
                </form>
            </Modal>

        </header>
    )
}

export default HeaderTasks