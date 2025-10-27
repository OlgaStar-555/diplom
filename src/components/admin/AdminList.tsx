import './AdminPage.css'

import {useContext} from "react";

import {AllDataContext} from "../../context/AllDataContext.tsx";
import HallControl from "./AdminCards/HallControl/HallControl.tsx";
import HallConfig from "./AdminCards/HallConfig/HallConfig.tsx";
import HallControlX from "./AdminCards/HallControl/HallControlX.tsx";
import type {MovieHall} from "../../types/allData.ts";
import {T_DURATION} from "../../config/constants.ts";

export interface HallControlProps {
    halls?: MovieHall[]
}


export default function AdminList() {

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }

    const {allData} = context;

    console.log('\n\n\t\tAdminList\n\n')
    // const {allData, refreshAllData} = context;
    // const {allData} = context;

    // const [hallsMap, setHallsMap] = useState(new Map(allData?.halls?.map(hall => [hall.id, hall])))
    // const [filmsMap, setFilmsMap] = useState(new Map(allData?.films?.map(film => [film.id, film])))
    // const [seancesMap, setSeancesMap] = useState(new Map(allData?.seances?.map(seance => [seance.id, seance])))

    // console.log(hallsMap)
    // console.log(filmsMap)
    // console.log(seancesMap)

    // const setNewMapAllData = () => {
    //     setHallsMap(new Map(allData?.halls?.map(hall => [hall.id, hall])))
    //     setFilmsMap(new Map(allData?.films?.map(film => [film.id, film])))
    //     setSeancesMap(new Map(allData?.seances?.map(seance => [seance.id, seance])))
    // }

    // const getNewAllData = (isRefresh: boolean) => {
    //     if (isRefresh) {
    //         refreshAllData()
    //         setNewMapAllData()
    //     }
    // }


    return (
        <section className="card-list"
            style={{'--t-duration': `${T_DURATION / 1_000}s`}  as React.CSSProperties}

        >
            <HallControl halls={allData?.halls}/>
            <HallConfig  halls={allData?.halls}/>
            <HallControlX/>


        </section>

    )
}