import './Components/HallPriceConfig.css'

import {useContext, useEffect, useState} from "react";
import API from "../../../../API.ts";
import {AllDataContext} from "../../../../context/AllDataContext.tsx";
import AdminCard from "../AdminCard.tsx";
import type {HallConfigProps} from "../../AdminList.tsx";
import HallPrice from "./Components/HallPrice.tsx";
import SelectHall from "../../Components/SelectHall/SelectHall.tsx";

export default function HallPriceConfig({halls, hallsMap, setHallsMap}: HallConfigProps) {

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;


    const [activeHallId, setActiveHallId] = useState<number | undefined>(undefined)

    const [priceStandart, setPriceStandart] = useState<number>(0)
    const [priceVip, setPriceVip] = useState<number>(0)


    useEffect(() => {
        console.log('\n\n\t\tUSE EFFECT PRICE')

        if (halls && halls.length > 0) {
            const id = activeHallId || halls[0].id

            const hall = halls.filter((hall) => {
                return hall.id === id
            })[0]

            setActiveHallId(id)
            if (halls.length) {

                const newHallsMap = new Map(halls.map(hall => [hall.id, hall]))
                if (newHallsMap !== undefined) {
                    setHallsMap(newHallsMap);
                }
            }
            setPriceStandart(hall.hall_price_standart)
            setPriceVip(hall.hall_price_vip)
        }
    }, [halls, activeHallId, setHallsMap]);

    const BOX_ID = 'hall-price-config'

    const saveConfig = async () => {
        if (activeHallId !== undefined) {
            await API.setPriceOfHall(activeHallId, priceStandart, priceVip).then((data) => {

                if (halls !== undefined && data !== undefined) {
                    const newHalls = halls.map((hall) => {
                        if (hall.id === activeHallId) {
                            return data
                        }
                        return hall
                    })

                    refreshAllData({halls: newHalls})
                    return data
                }
            })
        }
    }

    const cancelConfig = () => {
        if (activeHallId !== undefined) {
            setPriceVip(hallsMap.get(activeHallId)?.hall_price_vip || 0)
            setPriceStandart(hallsMap.get(activeHallId)?.hall_price_standart || 0)
        }
    }

    return (
        <>
            <AdminCard boxId={BOX_ID} title="Конфигурация цен">
                <>
                    <SelectHall halls={halls} activeHallId={activeHallId} handleClick={setActiveHallId}/>
                    <section className="box">
                        <h4 className="subtitle">Установите цены для типов кресел:</h4>
                        <HallPrice priceStandart={priceStandart}
                                   setPriceStandart={setPriceStandart}
                                   priceVip={priceVip}
                                   setPriceVip={setPriceVip}/>
                    </section>
                    <button onClick={saveConfig} className="button button_admin" type="button">
                        Сохранить
                    </button>
                    <button onClick={cancelConfig} className="button button_admin" type="button">
                        Отмена
                    </button>
                </>
            </AdminCard>
        </>
    )
}