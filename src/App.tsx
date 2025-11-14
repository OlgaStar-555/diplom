import "./css/App.css";

import Background from "./components/bg/Background";
import Header from "./components/Header/Header";
import {Outlet, useLocation} from "react-router-dom";
import {ADMIN} from "./config/configRouter.ts";
import {ToastContainer} from "react-toastify";

export default function App() {

    const location = useLocation()

    const isAdmin = location.pathname.includes(ADMIN)

    return (
        <>
            <Background isAdmin={isAdmin}/>
            <Header isAdmin={isAdmin} isHome={location.pathname === '/'}/>
            <main>
                <div className={`container container_${isAdmin ? 'admin' : 'content'}`}>
                    <Outlet />
                </div>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
