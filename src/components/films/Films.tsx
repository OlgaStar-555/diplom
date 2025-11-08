import "./Fims.css";

import Card from "./Card";

import {type ReactNode, useState} from "react";

import type {FilmProps} from "./Card";
import type {AllData, MovieSeance} from "../../types/allData.ts";

export interface FilmHall {
    hall_id: number;
    hall_name?: string;
    seanceList?: SeanceData[];
}

export interface SeanceData {
    id: number;
    time: string;
}

export interface TicketProps {
    seance: MovieSeance | null;
}


export default function Films({halls, seances, films}: AllData): ReactNode {

    const [ticketProps, setTicketProps] = useState<TicketProps | undefined>({
        seance: null
    })

    if (halls && seances && films) {
        const hallsMap = new Map(halls.map((hall) => [hall.id, hall]));

        const seancesMap = new Map(seances.map((seanse) => [seanse.id, seanse]));

        const filmProps = films.map((film): FilmProps => {
            const filmHalls = new Map<number, FilmHall>();


            seancesMap.forEach((seance: MovieSeance, key: number) => {
                if (film.id === seance.seance_filmid) {
                    if (filmHalls.has(seance.seance_hallid)) {
                        filmHalls
                            .get(seance.seance_hallid)
                            ?.seanceList?.push({id: seance.id, time: seance.seance_time});
                    } else {
                        filmHalls.set(seance.seance_hallid, {
                            hall_id: seance.seance_hallid,
                            hall_name: hallsMap.get(seance.seance_hallid)?.hall_name,
                            seanceList: [{id: seance.id, time: seance.seance_time}],
                        });
                    }

                    seancesMap.delete(key);
                }
            });

            return {
                ...film,
                filmHalls: filmHalls,
                setSeance: (id: number) => {
                    console.log('\n\n\t\tticketProps')
                    console.table(ticketProps)

                    setTicketProps((prevProps: TicketProps | undefined) => {
                        const seance = seances?.find(item => item.id === id)
                        if (seance != undefined) {
                            return {...prevProps, seance}
                        }
                    })
                }
            };
        });

        return (
            <section className="content">
                <ul className="card-list">
                    {filmProps.map((filmProp) => {
                        return (
                            filmProp.filmHalls?.size ? (
                                <li key={filmProp.id}>
                                    <Card {...filmProp}  />
                                </li>
                            ) : null
                        );
                    })}
                </ul>
            </section>
        );
    }
}
