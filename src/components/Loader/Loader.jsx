import style from './Loader.module.css'

function Loader({message, display}){
    if(message == null || message == '')
        message = 'Carregando...'

    
    return(
        <div className={`${style.modal} ${style[display]}`}>
            <div className={style.dialog}>
                <div className={style.loader}></div>
                <div className={style.message}>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}
export default Loader