// import {useState} from "react";
import './Client.css'

import Films from "../../../components/films/Films.tsx";
import NavDate from "../../../components/navdate/NavDate.tsx";
import useAllData from "../../../context/AllDataContext.tsx";

export default function Client() {



    console.log("\n\n\n\t\tCLIENT\n");
    console.log("\t\tNew App\n\n");

    const {allData} = useAllData()


    console.log(useAllData())
    console.log('allData()')
    console.log(allData)

    return (
        <>
            <NavDate/>
            <Films {...allData}></Films>
        </>
    );
}
