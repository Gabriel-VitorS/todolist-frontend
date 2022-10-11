import style from './Titles.module.css'
import { useNavigate } from 'react-router-dom'
function Titles({text, id}){
    const navegate = useNavigate()

    function getTitle(e){
        localStorage.setItem('title', text)
        navegate(`/lista/${e.target.dataset.id}`)
    }
    return (
        <div className={style.title} onClick={getTitle} data-id={id}>{text}</div>
    )
}

export default Titles