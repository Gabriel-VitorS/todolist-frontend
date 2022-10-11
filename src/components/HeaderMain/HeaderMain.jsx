import style from './HeaderMain.module.css'
import { BsMenuButtonWide, BsX } from 'react-icons/bs'
import Button from '../Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function HeaderMain(){
    const navigate = useNavigate()
    const [menu, setMenu] = useState('hideMenu')
    
    function logout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className={style.HeaderMain}>
            <div>
                <h1>Tarefas</h1>
            </div>
            <div>
                <BsMenuButtonWide onClick={()=> setMenu('showMenu')} />
                <div className={`${style.listaMenu} ${style[menu]}`}>
                    <div className={style.btnHideMenu}>
                        <BsX onClick={()=> setMenu('hideMenu')} />
                    </div>
                    <ul>
                        {/* <li >
                            <Button 
                            text={'Configurações'}
                            buttonStyle={'primary'}/>
                        </li> */}
                        <li>
                            <Button
                            text={'Sair'}
                            buttonStyle={'primary'}
                            handle={logout} />
                        </li>
                    </ul>
                </div>
                
            </div>
        </header>
    )
}

export default HeaderMain