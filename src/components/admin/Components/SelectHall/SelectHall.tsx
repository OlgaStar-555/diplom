import './SelectHall.css'

import type {MovieHall} from "../../../../types/allData.ts";


interface SelectHallProps {
    halls: MovieHall[] | undefined;
    activeHallId: number | undefined;
    handleClick: (id: number) => void
    title?: string;
}

export default function SelectHall({halls, activeHallId, handleClick, title}: SelectHallProps) {


    return (
        <section className="box box_buttons">
            <h4 className="subtitle">{title || 'Выберите зал для конфигурации'}:</h4>
            <div className="row row_buttons">
                {halls?.map((hall) => {
                    return (
                        <button key={hall.id}
                                className={`button button_select-hall${hall.id === activeHallId ? ' active' : ''}`}
                                onClick={() => {
                                    handleClick(hall.id)
                                }} type="button">
                            {hall.hall_name}
                        </button>
                    )
                })}
            </div>
        </section>
    )

}