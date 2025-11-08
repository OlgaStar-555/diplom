// ClientLayout.tsx
import {Outlet} from 'react-router-dom';
import {ClientContextProvider} from "./ClientContext.tsx";

export default function ClientLayout() {
    return (
        <ClientContextProvider>
            <Outlet/>
        </ClientContextProvider>
    );
};
