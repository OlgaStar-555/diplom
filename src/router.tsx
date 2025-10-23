import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import Client from "./layout/client/Client.tsx";
import Payment from "./layout/Payment.tsx";
import getData from "./data.ts";
import {Suspense} from "react";
import LoadingFallback from "./layout/loader.tsx";
import Admin from "./layout/admin/Admin.tsx";
import AdminList from "./components/admin/AdminList.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";

import * as R from './config/configRouter.ts'

async function rootLoader() {
    return await getData('alldata')
}

export const router = createBrowserRouter([
    {
        path: R.ROOT,
        id: R.ROOT_ID,
        element: <Suspense fallback={<LoadingFallback/>}> <App/> </Suspense>,
        hydrateFallbackElement: <LoadingFallback/>,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <Client/>
            },
            {
                path: R.PAYMENT,
                id: R.PAYMENT,
                element: <Payment/>,
                children: [
                    // {
                    //     index: true,
                    //     Component: AdminList
                    // },
                    // {path: "auth", Component: LoginForm},

                ],
            },
            {
                path: R.ADMIN,
                id: R.ADMIN,
                element: <Admin/>,
                children: [
                    {
                        index: true,
                        element: <AdminList/>


                    },
                    {
                        path: R.AUTH,
                        id: R.AUTH,
                        element: <LoginForm/>
                    },

                ],
            },

        ],
    },
]);