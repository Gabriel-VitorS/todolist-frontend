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
    const [title, setTitle] = useState(localStorage.title)
    const modeTask ={
        id: '',
        task: '',
        done: 0,
        id_title: id
    }


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
            setModal()
            if(data.status === 200){
                let dados = data.body.Data
                dados.push(modeTask)
                setTask(data.body.Data)
            }                
      
        })
        .catch( 
            err => {
            setModal()

            
        })

    },[id])

    function atualizaTitle(e){
        e.preventDefault()
        setModal('show')
        fetch(`${process.env.REACT_APP_API_URL}titles/${id}`,{
            method:'PUT',
            body: JSON.stringify({
                title:e.target.title.value,
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( (data) =>{ 
            setModal()
            document.getElementById('updateTitle').querySelectorAll('button')[0].click()
            if(data.status === 200){
                setTitle(e.target.title.value)
            }
        })
        .catch( 
            err => {
            setModal()
        })

    }

    async function insertTask(e){
        if(e.keyCode === 13){
            let dados = task.concat(modeTask)
            await setTask(dados)
            const input = document.querySelectorAll('form')[1].lastChild
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
            id={id}
            atualizaTitle={atualizaTitle}
            />
            
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