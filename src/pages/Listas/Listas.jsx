import HeaderMain from "../../components/HeaderMain/HeaderMain"
import Titles from "../../components/Titles/Titles"
import Loader from "../../components/Loader/Loader"
import Alert from "../../components/Alert/Alert"
import ButtonAddTitle from "../../components/ButtonAddTitle/ButtonAddTitle"
import { useEffect, useState } from "react"

import style from './Listas.module.css'
function Listas(){
    const [titles, setTitles] = useState([])
    const [modal, setModal] = useState()
    const [buttonAddTitle, setButtonAddTitle] = useState('')
    const [alert, setAlert] = useState({type: '', message : ''})

    useEffect(()=>{
        setModal('show')
        fetch(`${process.env.REACT_APP_API_URL}titles`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.token}`
            } 
        })
        .then( resp => resp.json().then(data => ({status: resp.status, body: data})))
        .then( data => {
            setModal()
            setButtonAddTitle('show')
            setTitles(data.body.Data)
        })
        .catch(err =>{
            setButtonAddTitle('show')
            setModal()
            setAlert({type: 'error', message : 'Erro no servidor'})
        })
    },[])
    

    return (
        <>
            <HeaderMain />

            <div className={style.listas}>
                {titles.length > 0 && titles.map((titles) => (
                    <Titles
                    text={titles.title}
                    key={titles.id}
                    id={titles.id} />
                ))}
            </div>

            <Loader
            display={modal} />

            <Alert
            alert={alert} />

            <ButtonAddTitle
            showButton={buttonAddTitle} />
        </>
    )
}

export default Listas