import './AddFilm.css'

import React, {type ChangeEvent, useContext, useState} from "react";
import Popup, {type ButtonProps} from "../../../../../popup/Popup.tsx";
import API from "../../../../../../API.ts";
import {AllDataContext} from "../../../../../../context/AllDataContext.tsx";


export default function AddFilm() {
    const context = useContext(AllDataContext);
    if (!context) {
        throw new Error('ChildComponent должен быть обернут в AllDataProvider');
    }
    const {refreshAllData} = context;

    const LOAD_FILE_ID = 'load-file'


    const [loading, setLoading] = useState<boolean>(false);
    const [isPopup, setIsPopup] = useState<boolean>(false);

    interface FilmInputsProps {
        filmName: string;
        filmDuration: string;
        filmDescription: string;
        filmOrigin: string;
    }

    interface FilmProps extends FilmInputsProps {
        filePoster: File | null;
    }

    const defaultFilm: FilmProps = {
        filmName: '',
        filmDuration: '0',
        filmDescription: '',
        filmOrigin: '',
        filePoster: null
    };

    type FilmPropMap = Record<keyof FilmInputsProps, keyof FilmInputsProps>;

    const FilmFields: FilmPropMap = {
        filmName: 'filmName',
        filmDuration: 'filmDuration',
        filmDescription: 'filmDescription',
        filmOrigin: 'filmOrigin',
    };
    const [newFilm, setNewFilm] = useState(defaultFilm)

    const setNewFilmProp = (prop: keyof FilmInputsProps, newValue: string) => {
        setNewFilm(prevNewFilm => (
                {
                    ...prevNewFilm,
                    [prop]: newValue
                }
            )
        )
    }

    const popupButtonProps: ButtonProps[] = [{
        name: 'add-new-film',
        btnTitle: 'добавить фильм',
        isSubmit: false,
        handler: async () => {
            setIsPopup(false)

            await API.addFilm(
                newFilm.filmName,
                newFilm.filmDuration,
                newFilm.filmDescription,
                newFilm.filmOrigin,
                newFilm.filePoster,
            ).then((data) => {
                refreshAllData(data)
            })
        }
    },
        {
            name: 'loadPoster',
            btnTitle: 'Загрузить постер',
            element:
                <label className='button button_admin button_load-file' htmlFor={LOAD_FILE_ID}>
                    <input id={LOAD_FILE_ID}
                           className='button__load-file'
                           onChange={
                               ({target}: React.ChangeEvent<HTMLInputElement>) => {
                                   if (target.files !== null && target.files.length > 0) {
                                       const loadingFile = target.files?.[0]

                                       setNewFilm(prevNewFilm => (
                                           {
                                               ...prevNewFilm,
                                               filePoster: loadingFile
                                           }
                                       ));
                                   }
                               }
                           }
                           type='file' accept='.png'/>
                </label>,
            isSubmit: false,
        }
    ]

    return (
        <>
            <button onClick={() => {
                setLoading(true)
                setIsPopup(true)
                setLoading(false)
            }}
                    className="button button_admin" type="button"
                    disabled={loading}>
                {loading ? 'Loading...' : 'Добавить фильм'}
            </button>
            {isPopup && <Popup setIsPopup={setIsPopup} title={'Добавление фильма'}
                               buttonProps={popupButtonProps}>

                <div className="card__text-field">
                    <label className="field__title" htmlFor="hall-name">Название фильма</label>
                    <input type="text"
                           name={FilmFields.filmName}
                           placeholder='Например, «Гражданин Кейн»'
                           id="hall-name"
                           className="field__input"

                           onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                               setNewFilmProp(FilmFields.filmName, target.value)
                           }}
                    />
                    <label className="field__title" htmlFor="hall-name">Продолжительность фильма (мин.)</label>
                    <input type="text"
                           name={FilmFields.filmDuration}
                           placeholder='Например, «Гражданин Кейн»'
                           id="hall-name"
                           className="field__input"

                           onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                               setNewFilmProp(FilmFields.filmDuration, target.value)
                           }}
                    />
                    <label className="field__title" htmlFor="hall-name">Описание фильма</label>
                    <textarea
                        name={FilmFields.filmDescription}
                        placeholder='Например, «Гражданин Кейн»'
                        id="hall-name"
                        className="field__input"

                        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
                            setNewFilmProp(FilmFields.filmDescription, target.value)
                        }}
                    />
                    <label className="field__title" htmlFor="hall-name">Страна</label>
                    <input type="text"
                           name={FilmFields.filmOrigin}
                           placeholder='Например, «Гражданин Кейн»'
                           id="hall-name"
                           className="field__input"

                           onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                               setNewFilmProp(FilmFields.filmOrigin, target.value)
                           }}
                    />
                </div>
            </Popup>}
        </>
    )
}