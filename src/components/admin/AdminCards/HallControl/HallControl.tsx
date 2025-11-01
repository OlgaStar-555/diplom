import './HallControl.css'

import React, {type ChangeEvent, useContext, useState} from "react";
// import type {MovieHall} from "../../../../types/allData.ts";
import API from "../../../../API.ts";
import Popup, {type ButtonProps, type StateMapItem} from "../../../popup/Popup.tsx";
import {AllDataContext} from "../../../../context/AllDataContext.tsx";
import AdminCard from "../AdminCard.tsx";
import type {HallControlProps} from "../../AdminList.tsx";


export default function HallControl({halls}: HallControlProps) {
    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;

    const removeHall = async (id: number) => {
        await API.removeHall(id).then((data) => {
            console.log('\n\n\t\tREMOVE')
            console.log(data)
            refreshAllData(data)
        })
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [isPopup, setIsPopup] = useState<boolean>(false);

    const openPopup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setLoading(true)
        setIsPopup(!isPopup)
        setLoading(false)
    }
    const BOX_ID = 'hall-control'

    const MAP_KEY_STR = 'hallName'

    const [newHallName, setNewHallName] = useState('')

    const statesMap = new Map<string, StateMapItem>([[MAP_KEY_STR, {val: newHallName, setVal: setNewHallName}]])

    const popupButtonProps: ButtonProps = {
        name: MAP_KEY_STR,
        btnTitle: 'добавить зал',
        isSubmit: false,
        handler: async () => {
            setIsPopup(false)

            await API.addHall(newHallName).then((data) => {
                refreshAllData(data)
            })
        }
    }

    const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setNewHallName(target.value);
    };

    return (
        <>
            <AdminCard boxId={BOX_ID} title="Управление залами">
                <>
                    <section className='box'>
                        <h4 className="subtitle">Доступные залы:</h4>
                        <ul className="admin-list admin-list_halls">
                            {halls?.map((hall) => {
                                console.log(hall)
                                return (
                                    <li key={hall.id} className="halls__item hall">
                                        <h5 className="subtitle" key={hall.id}>{hall.hall_name}</h5>
                                        <button className="button button_remove-hall"
                                                disabled={loading}
                                                onClick={async () => {
                                                    try {
                                                        await removeHall(hall.id);
                                                    } catch (error) {
                                                        console.error("Ошибка при удалении зала:", error);
                                                    }
                                                }}
                                                type="button">
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                    <button onClick={openPopup} className="button button_admin" type="button" disabled={loading}>
                        {loading ? 'Loading...' : 'Создать зал'}
                    </button>
                </>
            </AdminCard>
            {isPopup &&
                <Popup statesMap={statesMap} setIsPopup={setIsPopup} title="Добавление Зала"
                       buttonProps={[popupButtonProps]}>
                    <div className="card__text-field">
                        <label className="field__title" htmlFor="hall-name">Название зала</label>
                        <input type="text"
                               name={MAP_KEY_STR}
                               placeholder='Например, «Зал 1»'
                               id="hall-name"
                               className="field__input"
                               onChange={handleInputChange}
                        />
                    </div>
                </Popup>}
        </>
    )
}