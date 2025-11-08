import {useContext} from 'react';
import AdminCard from "../AdminCard.tsx";
import {AllDataContext} from "../../../../context/AllDataContext.tsx";
import AddFilm from "./Components/AddFilm/AddFilm.tsx";
import FilmsSeances from "./Components/FilmSeances/FilmsSeances.tsx";

export default function FilmsAdmin() {
    const context = useContext(AllDataContext);
    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {allData} = context;

    const BOX_ID = 'films-admin'

    return (
        <AdminCard boxId={BOX_ID} title="Сетка сеансов">
            <>
                <AddFilm/>
                <FilmsSeances films={allData?.films}
                              halls={allData?.halls}
                              seances={allData?.seances}/>
            </>
        </AdminCard>
    )
}
