import style from './Input.module.css'

function Input({label, type, name}){
    return(
        <div className={style.divInput}>
            <label>{label}</label>
            <input name={name} type={type} />
        </div>
    )
}

export default Input