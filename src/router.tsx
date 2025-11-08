import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import Client from "./layout/client/Client/Client.tsx";
import Payment from "./layout/client/Payment/Payment.tsx";
import {Suspense} from "react";
import LoadingFallback from "./layout/loader.tsx";
import Admin from "./layout/admin/Admin.tsx";
import AdminList from "./components/admin/AdminList.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";

import * as R from './config/configRouter.ts'
import ClientLayout from "./layout/client/ClientLayout.tsx";
import HallClient from "./layout/client/Hall/HallClient.tsx";

export const Router = createBrowserRouter([
    {
        path: R.ROOT,
        id: R.ROOT_ID,
        element: <Suspense fallback={<LoadingFallback/>}> <App/> </Suspense>,
        hydrateFallbackElement: <LoadingFallback/>,
        children: [
            {
                element: <ClientLayout />,
                children: [
                    {
                        index: true,
                        element: <Client/>
                    },
                    {
                        path: `${R.FILMS}/:seanceId`,
                        id: `${R.FILMS}:seanceId`,
                        element: <HallClient/>,
                    },
                    {
                        path: R.PAYMENT,
                        id: R.PAYMENT,
                        element: <Payment/>,
                    },
                ]
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