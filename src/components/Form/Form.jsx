import style from './Form.module.css'

function Form(props){
    return(
        <form onSubmit={props.submit} className={style.form}>{props.children}</form>
    )
}

export default Form