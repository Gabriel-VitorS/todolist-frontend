import HeaderTasks from "../../components/HeaderTasks/HeaderTasks"
import Task from "../../components/Task/Task"
import Loader from "../../components/Loader/Loader"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import style from './Lista.module.css'
function Lista(){
    const {id} = useParams()
    const [modal, setModal] = useState('')
    const [task, setTask] = useState([])

    const modeTask ={
        id: '',
        task: '',
        done: 0,
        id_title: id
    }

    const title = localStorage.title

    useEffect(()=>{
        setModal('show')
        fetch(`${process.env.REACT_APP_API_URL}task?id_title=${id}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{
            // console.log(data)
            setModal()
            if(data.status === 200){
                // let dados = Array()
                let dados = data.body.Data
                dados.push(modeTask)
                // dados.push(data.body.Data)
                setTask(data.body.Data)
                // setTask(task => [...task, 'adad'])
                
                // console.log(dados)
            }                
            
            
        })
        .catch( 
            err => {
            setModal()
            // setAlert({type: 'error', message : 'Erro no servidor'})
            // console.error(err)
            
        })
    },[id])

    async function insertTask(e){
        if(e.keyCode === 13){
            let dados = task.concat(modeTask)
            await setTask(dados)
            const input = document.querySelector('form').lastChild
            input.querySelectorAll('input')[1].focus()
        }
        
    }

    function deleteTask(e){
        
        if(e.target.dataset.id === '' || e.target.dataset.id === undefined)
            return
        
        const idInput = e.target.dataset.id   
        document.getElementById(`${idInput}`).remove()
        
        fetch(`${process.env.REACT_APP_API_URL}task/${e.target.dataset.id}`,{
            method:'DELETE',
            body: JSON.stringify({
                id_title: id
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{
            if(data.status === 200){
                
            }                
            
            
        })
        .catch( 
            err => {
            setModal()
            
        })
        
    }   

    return (
        <>
            <HeaderTasks
            id={id}/>
            
            <div>
                <h1>{title}</h1>
            </div>

            <form className={style.formTasks} onSubmit={(e) => e.preventDefault()}>
            { task.map((task, index) => (
                <Task
                task={task.task}
                status={task.done}
                key={index}
                id={task.id}
                id_title={task.id_title}
                insertTask={insertTask}
                deleteTask={deleteTask}
                index={index} />
            ))}
            </form>
            

            <Loader
                display={modal} />
        </>
    )
}

export default Lista