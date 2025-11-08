import React, {type ReactNode, useEffect, useState} from "react";

import './Popup.css'
import {T_DURATION} from "../../config/constants.ts";

export interface ButtonProps {
    name: string;
    btnTitle: string;
    isSubmit: boolean
    element?: ReactNode;
    handler?: (data: unknown | File) => void
}

interface PopupProps {
    setIsPopup: (isPopup: boolean) => void;
    children?: React.JSX.Element;
    buttonProps?: ButtonProps[];
    handleSubmit?: () => void;
    title: string;
}


export default function Popup({
                                  setIsPopup,
                                  children,
                                  buttonProps,
                                  handleSubmit,
                                  title = 'Управление чем-то'
                              }: PopupProps) {
    const defaultClassName = 'popup'
    const activeClassName = `${defaultClassName} active`

    function closePopup() {
        setPopupClassName(defaultClassName)
        setTimeout(() => {
            setIsPopup(false)
        }, T_DURATION)
    }


    const [popupClassName, setPopupClassName] = useState(defaultClassName)

    useEffect(() => {
        setTimeout(() => {
            setPopupClassName(activeClassName)
        }, 0)
    }, []);


    // const [isSubmit, SetIsSubmit] = useState(false)

    // const actBtn = (handler: (data: unknown) => void) => {
    //     handler()
    //     closePopup()
    // }


    return (
        <div className={popupClassName} style={{transitionDuration: `var(--t-duration)`}}>
            <div className="popup__wrapper">
                <article className="card card_admin ">
                    <div className="card__header">
                        <h3 className="title">
                            {title}
                        </h3>
                        <button type="button" onClick={closePopup} className="close"></button>
                    </div>

                    <form className="card__body" onSubmit={handleSubmit}>
                        <div className="form_inputs">
                            {children}
                        </div>
                        <div className="button-list">
                            {buttonProps?.length &&
                                buttonProps.map(({
                                                     element,
                                                     name,
                                                     btnTitle, isSubmit = false, handler = () => {
                                    }
                                                 }) => {

                                    return (
                                        element !== undefined ?
                                            element
                                            : <button key={name}
                                                      className='button button_admin'
                                                      type={isSubmit ? 'submit' : 'button'}
                                                      onClick={handler}
                                            >
                                                {btnTitle}
                                            </button>
                                    )
                                })
                            }
                            <button className="button button_admin button_cancel" onClick={closePopup} type="button">
                                Отменить
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    )
}