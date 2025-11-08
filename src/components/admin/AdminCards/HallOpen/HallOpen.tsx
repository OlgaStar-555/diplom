import {useContext, useEffect, useState} from "react";
import API from "../../../../API.ts";
import {AllDataContext} from "../../../../context/AllDataContext.tsx";
import AdminCard from "../AdminCard.tsx";
import type {HallConfigProps} from "../../AdminList.tsx";
import SelectHall from "../../Components/SelectHall/SelectHall.tsx";

export default function HallOpen({halls, hallsMap, setHallsMap}: HallConfigProps) {

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;


    const [activeHallId, setActiveHallId] = useState<number | undefined>(halls?.[0].id)
    const [hallOpen, setHallOpen] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        if (halls && halls.length > 0) {
            const id = (activeHallId !== undefined
                && halls.find(el => el.id === activeHallId) !== undefined)
                ? activeHallId
                : halls[0].id

            setActiveHallId(id)

            const newHallsMap = new Map(halls.map(hall => [hall.id, hall]))

            if (newHallsMap !== undefined) {
                const newHallOpen = newHallsMap.get(id)?.hall_open

                setHallOpen(newHallOpen === 1)

                setHallsMap(newHallsMap);
            }
        }
    }, [halls, hallOpen, setHallsMap, activeHallId]);

    const selectHall = (id: number) => {
        setActiveHallId(id)

        setHallOpen(hallsMap.get(id)?.hall_open === 1)
    }

    const BOX_ID = 'hall-open'

    const saveConfig = async () => {
        if (activeHallId !== undefined && hallOpen !== undefined) {
            await API.openHall(activeHallId, !hallOpen).then((data) => {

                if (halls !== undefined && data !== undefined && data.halls !== undefined) {
                    refreshAllData({halls: data?.halls})
                    return data
                }
            })
        }
    }

    return (
        <>
            <AdminCard boxId={BOX_ID} title="Открыть продажи">
                <>
                    <SelectHall halls={halls} activeHallId={activeHallId} handleClick={selectHall}/>

                    <p className="text_center">Всё готово к открытию</p>

                    <div style={{
                        textAlign: 'center'
                    }}>
                        <button onClick={saveConfig} className="button button_admin" type="button">
                            {(hallOpen) ? 'Закрыть' : 'Открыть'} продажу билетов
                        </button>
                    </div>
                </>
            </AdminCard>
        </>
    )
}