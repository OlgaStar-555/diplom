import './FilmsSeances.css'

import React, {type ChangeEvent, useContext, useEffect, useState} from 'react';
import type {MovieFilm, MovieHall, MovieSeance} from "../../../../../../types/allData.ts";
import API from "../../../../../../API.ts";
import {AllDataContext} from "../../../../../../context/AllDataContext.tsx";
import {getMinutesRu, getNumFromTime} from "../../../../../../functions.ts";
import {filmBgcolors, MINUTES_IN_DAY} from "../../../../../../config/constants.ts";
import Popup, {type ButtonProps} from "../../../../../popup/Popup.tsx";

export interface FilmsSeancesProps {
    films: MovieFilm[] | undefined;
    halls: MovieHall[] | undefined;
    seances: MovieSeance[] | undefined;
}

interface MovieFilmBgColor extends MovieFilm {
    bgColor: string;
}

export default function FilmsSeances({films, halls, seances}: FilmsSeancesProps) {
    const [droppedItemsMap, setDroppedItemsMap] = useState<Map<number, MovieSeance[] | undefined>>(new Map());

    const [filmsMap, setFilmsMap] = useState<Map<number, MovieFilmBgColor>>(new Map())

    useEffect(() => {
        if (films && films.length > 0) {
            if (films.length) {
                const newFilmsMap = new Map(films.map((film, idx) => [film.id, {
                    ...film,
                    bgColor: filmBgcolors[idx % filmBgcolors.length]
                }]))

                if (newFilmsMap !== undefined) {
                    setFilmsMap(newFilmsMap);
                }
            }
        }
    }, [films, setFilmsMap]);

    const [removeBoxVisibleMap, setRemoveBoxVisibleMap] = useState<Map<number, boolean>>(new Map())

    useEffect(() => {
        const firstRemoveBoxVisibleMap = new Map(halls?.map(
            hall => [hall.id, false]
        ))

        setRemoveBoxVisibleMap(firstRemoveBoxVisibleMap)
    }, [halls]);

    useEffect(() => {
        const seancesInHallMap = new Map(
            halls?.map((hall) => {
                const seancesInHall = seances?.filter((seance) => {
                    return hall.id === seance.seance_hallid
                })
                return [hall.id, seancesInHall]
            })
        )

        setDroppedItemsMap(seancesInHallMap)
    }, [halls, seances]);

    const context = useContext(AllDataContext);

    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;

    const removeFilm = async (id: number) => {
        await API.removeFilm(id).then((data) => {
            refreshAllData(data)
        })
    }

    const removeSeance = async (id: string) => {
        await API.removeSeance(id).then((data) => {
            refreshAllData(data)
        })
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: number, isFromDropZone: boolean) => {
        e.dataTransfer.setData('itemId', itemId.toString());
        e.dataTransfer.setData('isFromDropZone', isFromDropZone.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleAddDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        filmId: number,
        isFromDropZone: boolean,
    ) => {
        setSelectedFilmId(filmId)

        handleDragStart(e, filmId, isFromDropZone)
    }

    const handleDragEnd = (hallId: number) => {
        setRemoveBoxVisibleMap((prevMap) => {
                const newMap = new Map(prevMap);
                newMap.set(hallId, false);
                return newMap;
            }
        )
    };

    const handleRemoveDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: number, isFromDropZone: boolean, hallId: number) => {
        setRemoveBoxVisibleMap((prevMap) => {
                const newMap = new Map(prevMap);
                newMap.set(hallId, true);
                return newMap;
            }
        )
        handleDragStart(e, itemId, isFromDropZone)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDropToZone = (e: React.DragEvent<HTMLDivElement>, hallId: number) => {
        e.preventDefault();

        const itemId = e.dataTransfer.getData('itemId');
        const isFromDropZone = e.dataTransfer.getData('isFromDropZone') === 'true';

        if (isFromDropZone) {
            return;
        }

        const itemToAdd = films?.find(item => item.id.toString() === itemId);

        if (itemToAdd) {
            setSelectedHallId(hallId)

            setIsPopup(true)
        }
    };

    const handleRemoveFromZone = (e: React.DragEvent<HTMLDivElement>, hallId: number) => {
        e.preventDefault();

        setRemoveBoxVisibleMap((prevMap) => {
                const newMap = new Map(prevMap);
                newMap.set(hallId, false);
                return newMap;
            }
        )

        const seanceId = e.dataTransfer.getData('itemId');
        const isFromDropZone = e.dataTransfer.getData('isFromDropZone') === 'true';

        if (isFromDropZone) {
            (async () => {
                try {
                    await removeSeance(seanceId)
                } catch (error) {
                    console.error("Ошибка при удалении фильма:", error);
                }
            })()
        }
    };

    const FILM_CARD_CLASS = 'film-card'

    const [isPopup, setIsPopup] = useState<boolean>(false);

    const [selectedHallId, setSelectedHallId] = useState<number>(0);

    const handleHallChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedHallId(parseInt(event.target.value));
    };

    const [selectedFilmId, setSelectedFilmId] = useState<number>(0);

    const handleFilmChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilmId(parseInt(event.target.value));
    };

    const [seanceTime, setSeanceTime] = useState<string>('00:00');

    const handleSeanceTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSeanceTime(event.target.value);
    };

    const popupButtonProps: ButtonProps = {
        name: 'add-seance',
        btnTitle: 'добавить сеанс',
        isSubmit: false,
        handler: async () => {
            setIsPopup(false)

            await API.addSeance(selectedHallId.toString(), selectedFilmId.toString(), seanceTime).then((data) => {
                refreshAllData(data)
            })
        }
    }

    return (
        <>
            <div className="dnd-container">

                <div className='film-cards'>
                    {films &&
                        (films.map(film => (
                                    <div
                                        key={film.id}
                                        draggable
                                        onDragStart={(e) => handleAddDragStart(e, film.id, false)}
                                        className={FILM_CARD_CLASS}
                                        style={{
                                            backgroundColor: filmsMap.get(film.id)?.bgColor
                                        }}
                                    >
                                        <img className={`${FILM_CARD_CLASS}__img`} src={film.film_poster}
                                             alt={film.film_name}/>
                                        <div className={`${FILM_CARD_CLASS}__description`}>
                                            <div className="description__title">
                                                {film.film_name}
                                            </div>
                                            <div className="description__duration">
                                                {`${film.film_duration} ${getMinutesRu(film.film_duration)}`}
                                            </div>
                                        </div>
                                        <button className={`${FILM_CARD_CLASS}__delete`}
                                                onClick={async () => {
                                                    try {
                                                        await removeFilm(film.id);
                                                    } catch (error) {
                                                        console.error("Ошибка при удалении фильма:", error);
                                                    }
                                                }}/>
                                    </div>
                                )
                            )
                        )
                    }
                </div>

                <div className="hall-box-list">
                    {halls &&
                        (
                            halls.map((hall) => {
                                    const seancesInHall = droppedItemsMap.get(hall.id)

                                    return (
                                        <div key={hall.id} className='hall-box'>
                                            <h3 className="title">
                                                {hall.hall_name}
                                            </h3>

                                            <div className="hall-box__drop-zone"
                                                 onDragOver={handleDragOver}
                                                 onDrop={(event) => {
                                                     handleDropToZone(event, hall.id)
                                                 }}
                                            >
                                                {seancesInHall !== undefined && seancesInHall.length > 0 ? (
                                                    seancesInHall.map(seance => (
                                                        <div
                                                            key={seance.id}
                                                            className='hall-box__seance'
                                                            style={{
                                                                left: `${Math.floor((getNumFromTime(seance.seance_time ?? '')) / MINUTES_IN_DAY * 100)}%`
                                                            }}
                                                        >
                                                            <div className='seance__film-name'
                                                                 draggable
                                                                 onDragStart={(e) =>
                                                                     handleRemoveDragStart(e, seance.id, true, hall.id)}
                                                                 onDragEnd={() => {
                                                                     handleDragEnd(hall.id)
                                                                 }}
                                                                 style={{
                                                                     width: `${Math.floor((filmsMap.get(seance.seance_filmid)?.film_duration ?? 0) / MINUTES_IN_DAY * 100)}%`,
                                                                     backgroundColor: filmsMap.get(seance.seance_filmid)?.bgColor
                                                                 }}
                                                            >
                                                                {filmsMap.get(seance.seance_filmid)?.film_name}
                                                            </div>
                                                            <div className="seance__time">
                                                                {seance.seance_time}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className='txt_empty'>Перетащите фильм сюда для создания сеанса</p>
                                                )}
                                            </div>
                                            {removeBoxVisibleMap.get(hall.id) && (
                                                <div className='hall-box__removal-zone'
                                                     onDragOver={handleDragOver}
                                                     onDrop={(event) => {
                                                         handleRemoveFromZone(event, hall.id)
                                                     }}
                                                >
                                                </div>
                                            )}
                                        </div>)
                                }
                            )
                        )
                    }
                </div>
            </div>
            {isPopup &&
                <Popup setIsPopup={setIsPopup} title="Добавление Зала"
                       buttonProps={[popupButtonProps]}>
                    <>
                        <div className="card__text-field">
                            <label className="field__title" htmlFor="hall-name">Название зала</label>
                            <select
                                id="hall-name"
                                className="field__input"
                                value={selectedHallId}
                                onChange={handleHallChange}
                            >
                                {halls?.map((hall) => (
                                    <option key={hall.id} value={hall.id}>
                                        {hall.hall_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="card__text-field">
                            <label className="field__title" htmlFor="film-name">Название фильма</label>
                            <select
                                id="hall-name"
                                className="field__input"
                                value={selectedFilmId}
                                onChange={handleFilmChange}
                            >
                                {films?.map((film) => (
                                    <option key={film.id} value={film.id}>
                                        {film.film_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="card__text-field">
                            <label className="field__title" htmlFor="seance-time">Время начала</label>
                            <input type="time"
                                   name='seance-time'
                                   placeholder='Например, «Зал 1»'
                                   id="seance-time"
                                   className="field__input"
                                   value={seanceTime}
                                   onChange={handleSeanceTimeChange}
                            />
                        </div>
                    </>
                </Popup>}
        </>
    )
}
