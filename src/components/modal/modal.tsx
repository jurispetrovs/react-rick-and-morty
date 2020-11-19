import React, {FC} from 'react'
import './modal.css'

type Props = {
    onClick: any
}

export const Modal:FC<Props> = ({children, onClick}) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <span className="modal__close" onClick={onClick}>X</span>
                {children}     
            </div>
        </div>
    )
}