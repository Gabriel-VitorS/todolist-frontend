import style from './Task.module.css'
import { useState } from 'react'
import { BsTrash } from "react-icons/bs";

function Task({id, id_title, status, task, insertTask, deleteTask, index}){
    const [value, setValue] = useState(task)
    const [idInput, setIdInput] = useState(id)
    const [statusInput, setStatusInput] = useState(status === 1 ? true : false)

    function changeStatus(e){
        setStatusInput(e.target.checked)
        if(value === '' || idInput === '')
            return

        fetch(`${process.env.REACT_APP_API_URL}task/${idInput}`,{
            method:'PUT',
            body: JSON.stringify({
                status: e.target.checked,
                task: value,
                id_title: id_title
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            }
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( data => {
        })
        .catch(err =>{
            // setButtonAddTitle('show')
            // setModal()
            // setAlert({type: 'error', message : 'Erro no servidor'})
        })
    }

    function changeTask(e){
        // console.log(idInput)
        // return
        if(value === '')
            return

        if(idInput === ''){

            fetch(`${process.env.REACT_APP_API_URL}task`,{
                method:'POST',
                body: JSON.stringify({
                    status: statusInput,
                    task: value,
                    id_title: id_title
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.token}`
                }
            })
            .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
            .then( data => {
                if(data.status === 200){
                    setIdInput(data.body.Id)
                }
                
            })
            .catch(err =>{
                // setButtonAddTitle('show')
                // setModal()
                // setAlert({type: 'error', message : 'Erro no servidor'})
            })
        }else{
            fetch(`${process.env.REACT_APP_API_URL}task/${idInput}`,{
                method:'PUT',
                body: JSON.stringify({
                    status: statusInput,
                    task: value,
                    id_title: id_title
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.token}`
                }
            })
            .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
            .then( data => {
            })
            .catch(err =>{
                // setButtonAddTitle('show')
                // setModal()
                // setAlert({type: 'error', message : 'Erro no servidor'})
            })
        }
        
    }


    
    return(
        <div className={style.lista} id={idInput}>

            <div className={`${style.checkbox}`}>
                <input className='cursorPointer' type="checkbox" defaultChecked={status} onChange={changeStatus} />
            </div>
            
            <div>
                <input type="text" onKeyUp={insertTask} className={style.inputTask} value={value}  onChange={(e) =>{ setValue(e.target.value); } } onBlur={changeTask} />               
            </div>

            <div >
                <BsTrash onClick={deleteTask} data-id={idInput} data-index={index} className={`${style.btnTrash} cursorPointer ${idInput === '' ? style.displayNone : ''}`} />
            </div>

        </div>
    )
}

export default Task