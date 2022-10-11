import style from './HeaderTasks.module.css'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function HeaderTasks(id){
    const navegate = useNavigate()

    function deletaTask(){
        navegate(-1)
        fetch(`${process.env.REACT_APP_API_URL}titles/${id.id}`,{
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
                <div className={style.trashButton} onClick={deletaTask}>
                    <BsTrash />
                </div>
            </div>

            
        </header>
    )
}

export default HeaderTasks