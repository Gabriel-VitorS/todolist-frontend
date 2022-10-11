import style from './Input.module.css'

function Input({label, type, name, valid, required}){
    return(
        <div className={`${style.divInput} ${style[valid]}`}>
            <label>{label}</label>
            <input name={name} type={type} required={required} />
        </div>
    )
}

export default Input