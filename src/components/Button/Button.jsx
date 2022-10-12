import style from './Button.module.css'
function Button({text, handle, buttonStyle, type = 'submit'}){

    return (
        <div className={style.divButton}>
            <button type={type} className={`${style[buttonStyle]}`} onClick={handle}>{text}</button>
        </div>
        
    ) 
}

export default Button