import './HallConfig.css'

import {useContext, useEffect, useState} from "react";
import API from "../../../../API.ts";
import {AllDataContext} from "../../../../context/AllDataContext.tsx";
import AdminCard from "../AdminCard.tsx";
import type {HallControlProps} from "../../AdminList.tsx";
import type {MovieHall} from "../../../../types/allData.ts";
import {hallPlaceTypesAdmin, HALL_PLACE_TYPES_ADMIN, type HallPlaceTypesAdmin} from "../../../../config/halls.ts";
import HallPlace from "../../../HallPlace/HallPlace.tsx";
import HallSizes from "./Components/HallSizes.tsx";
import Legend from "../../../Legend/Legend.tsx";

export default function HallConfig({halls}: HallControlProps) {

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;


    const [hallsMap, setHallsMap] = useState<Map<number, MovieHall>>(new Map())

    const [activeHallId, setActiveHallId] = useState<number | undefined>(undefined)

    const [activeHall, setActiveHall] = useState<string[][]>([])

    const createNewArrFromArr = (arr: string[][] = []) => {
        if (arr.length && arr[0].length) {
            setActiveHall(structuredClone(arr))
        }
    }

    const createNewArr = (numRows = 0, numCols = 0) => {
        if (numRows > 0 && numCols > 0) {
            const newArr: string[][] = Array.from({length: numRows}, () =>
                Array.from({length: numCols}, () => hallPlaceTypesAdmin[0]))

            setActiveHall(newArr)
        }
    }

    const [rowCount, setRowCount] = useState<number>(0)
    const [colCount, setColCount] = useState<number>(0)


    useEffect(() => {
        if (halls && halls.length > 0) {
            const id = activeHallId || halls[0].id

            const hall = halls.filter((hall) => {
                return hall.id === id
            })[0]

            setActiveHallId(id)
            setHallsMap(new Map(halls.map(hall => [hall.id, hall])));
            setRowCount(hall.hall_config.length)
            setColCount(hall.hall_config[0].length)
            createNewArrFromArr(hall.hall_config)
        }
    }, [halls, activeHallId]);

    const selectHall = (id: number) => {
        setActiveHallId(id)
        const activeHall = hallsMap.get(id)?.hall_config

        if (activeHall?.length && activeHall[0].length) {
            setRowCount(activeHall.length)
            setColCount(activeHall[0].length)
            createNewArrFromArr(hallsMap.get(id)?.hall_config || [])
        }
    }

    const BOX_ID = 'hall-config'

    const saveConfig = async () => {
        if (activeHallId !== undefined) {
            await API.setConfigOfHall(activeHallId, rowCount, colCount, activeHall).then((data) => {

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
            createNewArrFromArr(hallsMap.get(activeHallId)?.hall_config || [])
        }
    }

    const handleHallChange = (row: number, col: number) => {
        // Создаём новую копию всего массива, чтобы React увидел изменение
        const newHall = activeHall.map(rowArr => [...rowArr]);

        const newPlaceTypeNum = (hallPlaceTypesAdmin.indexOf(newHall[row][col] as HallPlaceTypesAdmin) + 1) % hallPlaceTypesAdmin.length;
        newHall[row][col] = hallPlaceTypesAdmin[newPlaceTypeNum];

        // Обновляем состояние
        setActiveHall(newHall);
    };

    return (
        <>
            <AdminCard boxId={BOX_ID} title="Конфигурация залов">
                <>
                    <section className="box box_buttons">
                        <h4 className="subtitle">Выберите зал для конфигурации:</h4>
                        <div className="row row_buttons">
                            {halls?.map((hall) => {
                                return (
                                    <button key={hall.id}
                                            className={`button button_select-hall${hall.id === activeHallId ? ' active' : ''}`}
                                            onClick={() => {
                                                selectHall(hall.id)
                                            }} type="button">
                                        {hall.hall_name}
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                    <section className="box box_sizes">
                        <h4 className="subtitle">Укажите количество рядов и максимальное количество кресел в ряду:</h4>
                        <HallSizes
                            rowCount={rowCount}
                            colCount={colCount}
                            setRowCount={setRowCount}
                            setColCount={setColCount}
                            createNewArr={createNewArr}/>
                    </section>
                    <section className="box box_legend">
                        <h4 className="subtitle">Теперь вы можете указать типы кресел на схеме зала:</h4>
                        <Legend hallPlaceTypes={hallPlaceTypesAdmin} hallPlaceTypesRu={HALL_PLACE_TYPES_ADMIN}/>
                    </section>
                    <section className="box box_hall-config">
                        <p className="hall-config__text">
                            Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
                        </p>
                        <div className="hall-config__wrapper">
                            <div className="hall-config__places"
                                 style={
                                     {
                                         gridTemplateRows: `repeat(${activeHall.length}, 1fr`,
                                         gridTemplateColumns: `repeat(${activeHall[0]?.length}, 1fr`
                                     }
                                 }
                            >
                                {activeHall.map((row: string[], idxRow: number) =>
                                    row.map((placeType, idxCol: number) =>
                                        (
                                            <HallPlace key={`${idxRow}-${idxCol}`}
                                                       row={idxRow} col={idxCol}
                                                       onPlaceClick={handleHallChange}
                                                       status={placeType as HallPlaceTypesAdmin}
                                                       isAdmin={true}
                                                       hall={activeHall}
                                            />
                                        )
                                    )
                                )}
                            </div>
                        </div>
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