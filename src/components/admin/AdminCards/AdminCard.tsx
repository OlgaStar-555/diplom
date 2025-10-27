    import React from "react";

export interface AdminCardProps {
    title: string;
    boxId: string;
    children: React.JSX.Element;
}

export default function AdminCard({title, boxId, children} : AdminCardProps) {

    const CHECKBOX_ID = `accordion_${boxId}`

    return (
        <article id={boxId} className="card card_admin card_accordion">
            <input type="checkbox" id={CHECKBOX_ID} className="accordion__checkbox" defaultChecked/>
            <header>
                <label htmlFor={CHECKBOX_ID} className="card__header accordion__button">
                    <h3 className="title">
                        {title}
                    </h3>
                </label>
            </header>
            <div className="card__body">
                {children}
            </div>
        </article>
    )
}