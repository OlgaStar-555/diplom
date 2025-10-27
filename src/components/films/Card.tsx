import "./Fims.css";
// import { useState } from "react";

import type {MovieFilm} from "../../types/allData.ts";

import type {FilmHall} from "./Films.tsx";

export interface FilmProps extends MovieFilm {
    filmHalls?: Map<number, FilmHall>;
}

export default function Content(props: FilmProps) {
    console.log(`\n\n\n\n\t\tCARD\t${props.film_name}\n\n`);

    console.log("props.filmHalls");
    console.log(props.filmHalls);

    const handleClick = ({currentTarget}:React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        console.log(currentTarget);
        console.log(currentTarget.dataset.seanceId);
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
                                    className="button button_link"
                                    onClick={handleClick}
                                    data-seance-id={seance.id}>
                                    {seance.time}
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
