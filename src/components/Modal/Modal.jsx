import style from './Modal.module.css'
function Modal(props){
    return (
        <div className={`${style.modal} ${style[props.display]}`}>
            <div className={style.dialog}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal