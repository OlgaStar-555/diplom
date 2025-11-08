import './AdminPage.css'

import React, {useCallback, useContext, useState} from "react";

import {AllDataContext} from "../../context/AllDataContext.tsx";
import HallControl from "./AdminCards/HallControl/HallControl.tsx";
import HallConfig from "./AdminCards/HallConfig/HallConfig.tsx";
import type {MovieHall} from "../../types/allData.ts";
import {T_DURATION} from "../../config/constants.ts";
import HallPriceConfig from "./AdminCards/HallPriceConfig/HallPriceConfig.tsx";
import FilmsAdmin from "./AdminCards/FilmsAdmin/FilmsAdmin.tsx";
import OpenHall from "./AdminCards/HallOpen/HallOpen.tsx";

export interface HallControlProps {
    halls?: MovieHall[];
}

export interface HallConfigProps extends HallControlProps {
    hallsMap: Map<number, MovieHall | undefined>;
    setHallsMap: (hallsMap: Map<number, MovieHall>) => void;
}

export default function AdminList() {

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }

    const {allData} = context;

    console.log('\n\n\t\tAdminList\n\n')

    const [hallsMap, setHallsMap] = useState<Map<number, MovieHall>>(new Map())

    const memoizedSetHallsMap = useCallback((newMap: Map<number, MovieHall>) => {
        setHallsMap(newMap);
    }, [])


    return (
        <section className="card-list"
                 style={{'--t-duration': `${T_DURATION / 1_000}s`} as React.CSSProperties}

        >
            <HallControl halls={allData?.halls}/>
            <HallConfig halls={allData?.halls}
                        hallsMap={hallsMap}
                        setHallsMap={memoizedSetHallsMap}/>
            <HallPriceConfig halls={allData?.halls}
                             hallsMap={hallsMap}
                             setHallsMap={memoizedSetHallsMap}
            />
            <FilmsAdmin/>

            <OpenHall  halls={allData?.halls}
                       hallsMap={hallsMap}
                       setHallsMap={memoizedSetHallsMap}/>
        </section>

    )
}