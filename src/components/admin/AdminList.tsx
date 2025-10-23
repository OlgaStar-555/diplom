import {useRouteLoaderData} from "react-router-dom";
import type {AllData} from "../../types/allData.ts";

export default function AdminList() {
    console.log('\n\n\t\tAdminList\n\n')
    const allData = useRouteLoaderData('root') as AllData
    console.log(allData)

    return <div>!!!AdminList!!!</div>
}