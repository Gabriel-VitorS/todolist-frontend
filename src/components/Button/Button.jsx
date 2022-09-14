import style from './Button.module.css'
function Button({text, handle, buttonStyle}){

    return (
        <div className={style.divButton}>
            <button className={`${style[buttonStyle]}`} onClick={handle}>{text}</button>
        </div>
        
    ) 
}

export default Button