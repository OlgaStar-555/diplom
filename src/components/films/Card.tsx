import "./Fims.css";

import type {MovieFilm, MovieSeance} from "../../types/allData.ts";
import type {FilmHall} from "./Films.tsx";
import {useNavigate} from "react-router-dom";
import {FILMS} from "../../config/configRouter.ts";
import useClientContext from "../../layout/client/ClientContext.tsx";
import {getNumFromTime} from "../../functions.ts";
import React from "react";

export interface FilmProps extends MovieFilm {
    filmHalls?: Map<number, FilmHall>;
    setSeance: (id: number) => void
}

export default function Card(props: FilmProps) {

    const {todayMin, todayStr, activeDate} = useClientContext()

    const navigate = useNavigate()

    const handleClick = (seance: MovieSeance): void => {
        props.setSeance(seance.id)

        navigate(`${FILMS}/?seanceId=${seance.id}&date=${activeDate}`)
    };

    const items: React.ReactNode[] = [];
    props.filmHalls?.forEach((hallSeances, key) => {
        items.push(
            <li key={key} className="links__item">
                <h4 className="links-item__title">{hallSeances.hall_name}</h4>
                <ul className="links-item__buttons">
                    {hallSeances?.seanceList?.map((seance) => {
                        return (
                            <li key={seance.id}>
                                <button
                                    disabled={
                                        activeDate === todayStr
                                        && todayMin > getNumFromTime(seance.seance_time)
                                    }
                                    className="button button_link"
                                    onClick={() => {
                                        handleClick(seance)
                                    }}
                                >
                                    {seance.seance_time}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </li>
        );
    });

    return (
        <article className="card card_movie">
            <div className="card__img">
                <img
                    src={props.film_poster}
                    alt={props.film_name}
                    title={props.film_name}
                    className="image"
                />
            </div>
            <div className="card__description">
                <h3 className="card__title">{props.film_name}</h3>
                <p className="card__text">{props.film_description}</p>
                <p className="card__data">
                    <span>{props.film_duration}</span>
                    &nbsp;
                    <span>{props.film_origin}</span>
                </p>
            </div>
            <ul className="card__links">{items}</ul>
        </article>
    );
}
