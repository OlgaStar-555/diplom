import "./App.css";

import Background from "./components/bg/Background";
import Header from "./components/header/Header";
import {Outlet, useLocation} from "react-router-dom";
import {ADMIN} from "./config/configRouter.ts";

export default function App() {
    console.log("\n\n\n\t\tApp\n\n")

    const location = useLocation()


    console.log('\n\n\t\tpath\t\t', location.pathname.includes(ADMIN))
    console.table(location)


    const isAdmin = location.pathname.includes(ADMIN)


    return (
        <>
            <Background isAdmin={isAdmin}/>
            <Header isAdmin={isAdmin}/>
            <main>
                <div className={`container container_${isAdmin ? 'admin' : 'content'}`}>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}
