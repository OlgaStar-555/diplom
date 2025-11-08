import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./css/index.css";
import {RouterProvider} from "react-router-dom";
import {Router} from "./router.tsx";
import AllDataProvider from "./context/AllDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AllDataProvider>
            <RouterProvider router={Router}/>
        </AllDataProvider>
    </StrictMode>
)