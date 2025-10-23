// import {useState} from "react";
import './client.css'

import Films from "../../components/films/Films.tsx";
import NavDate from "../../components/NavDate/NavDate.tsx";
import type {AllData} from "../../types/allData.ts";
import {useRouteLoaderData} from 'react-router-dom';

export default function Client() {

    const allData  = useRouteLoaderData('root') as AllData

    console.log("New App");

    console.log(allData)

    return (
        <>
            <NavDate/>
            <Films {...allData}></Films>
        </>
    );
}
