import style from './Alert.module.css'
import {BsFillXSquareFill} from "react-icons/bs"
import { useState, useEffect } from 'react'

function Alert({alert}){

    const [alertStatus, setalertStatus] = useState('')    

    useEffect(()=>{
        if(alert.type !== ''){
            setalertStatus('show')

        }else{
            setalertStatus('')
        }
    },[alert])
    

    setTimeout(()=>{
        setalertStatus('')
    }, 4000)
    return(
        <div className={`${style.alert} ${style[alert.type]} ${style[alertStatus]}`}>
            <BsFillXSquareFill />
            <div className={style.message}>
                <p>{alert.message}</p> 
            </div>
            
        </div>
    )
}

export default Alert