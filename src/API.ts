import type {AllData, MovieHall} from "./types/allData.ts";
import type {LoginRequest} from "./types/login.ts";
import type {TicketForSend, TicketProps} from "./layout/client/paymentTypes.ts";
import {toast} from "react-toastify";

export interface DataResponse {
    success?: boolean,
    result?: unknown,
    error?: string
}

export default class API {
    private static SERVER_NAME: string = 'https://shfe-diplom.neto-server.ru/';

    private static postfixList = {
        allData: 'alldata',
        hall: 'hall',
        open: 'open',
        price: 'price',
        film: 'film',
        seance: 'seance',
        hallConfig: 'hallconfig',
        ticket: 'ticket'
    }

    private static errorNotification(error?: string) {
        if(error !== undefined) {
            console.error(error)
            toast.error(error)
        }
    }

    public static async getAllData(): Promise<AllData | undefined> {

        return await fetch(
            `${API.SERVER_NAME}${this.postfixList.allData}`,
            {method: "GET"}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data?.success) {
                    return data.result;
                } else {
                    API.errorNotification(data?.error)
                }
            });
    }

    public static async getHallConfig(seanceId: number, date: string): Promise<string[][] | undefined> {

        return await fetch(
            `${API.SERVER_NAME}${this.postfixList.hallConfig}?seanceId=${seanceId}&date=${date}`,
            {method: "GET"}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data?.success) {
                    return data.result;
                } else {
                    API.errorNotification(data?.error)
                }
            });
    }

    public static async login(loginData: LoginRequest) {
        return await fetch(`${API.SERVER_NAME}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
    }

    public static async removeHall(id: number): Promise<AllData | undefined> {

        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.success) {
                    return data?.result
                } else {
                    API.errorNotification(data?.error)
                }
            })
    }

    public static async removeFilm(id: number): Promise<AllData | undefined> {

        return await fetch(`${API.SERVER_NAME}${API.postfixList.film}/${id}`,
            {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then((data) => {
                if (data?.success) {
                    return data?.result
                } else {
                    API.errorNotification(data?.error)
                }
            })
    }

    public static async removeSeance(id: string): Promise<AllData | undefined> {

        return await fetch(`${API.SERVER_NAME}${API.postfixList.seance}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.success) {
                    return data?.result
                } else {
                    API.errorNotification(data?.error)
                }
            })
    }

    public static async addHall(hallName: string): Promise<AllData | undefined> {
        if (hallName === '') {
            return
        }

        const params = new FormData()
        params.set('hallName', hallName)

        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }

    public static async addFilm(filmName: string,
                                filmDuration: string,
                                filmDescription: string,
                                filmOrigin: string,
                                filePoster: File | null
    ):

        Promise<AllData | undefined> {

        if (filmName === '') {
            return
        }

        const params = new FormData()

        params.set('filmName', filmName)
        params.set('filmDuration', filmDuration)
        params.set('filmDescription', filmDescription)
        params.set('filmOrigin', filmOrigin)

        if (filePoster !== null) {
            params.set('filePoster', filePoster)
        }

        return await fetch(`${API.SERVER_NAME}${API.postfixList.film}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }

    public static async addTickets(seanceId: number,
                                   ticketDate: string,
                                   tickets: TicketForSend[]
    ): Promise<TicketProps[] | undefined> {

        const params = new FormData()

        params.set('seanceId', seanceId.toString())
        params.set('ticketDate', ticketDate.toString())
        params.set('tickets', JSON.stringify(tickets))

        return await fetch(`${API.SERVER_NAME}${API.postfixList.ticket}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }


    public static async addSeance(
        seanceHallId: string,
        seanceFilmId: string,
        seanceTime: string,
    ): Promise<AllData | undefined> {

        const params = new FormData()
        params.set('seanceHallid', seanceHallId)
        params.set('seanceFilmid', seanceFilmId)
        params.set('seanceTime', seanceTime)

        return await fetch(`${API.SERVER_NAME}${API.postfixList.seance}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }

    public static async setConfigOfHall(
        id: number,
        rowCount: number,
        colCount: number,
        arrayConfig: string[][]
    ):
        Promise<MovieHall | undefined> {

        if (arrayConfig.length === 0 || arrayConfig?.[0].length === 0) {
            return
        }

        const params = new FormData()

        params.set('rowCount', rowCount.toString())
        params.set('placeCount', colCount.toString())
        params.set('config', JSON.stringify(arrayConfig))

        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}/${id}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }

    public static async setPriceOfHall(
        id: number,
        priceStandart: number,
        priceVip: number,
    ):
        Promise<MovieHall | undefined> {

        const params = new FormData()

        params.set('priceStandart', priceStandart.toString())
        params.set('priceVip', priceVip.toString())

        return await fetch(`${API.SERVER_NAME}${API.postfixList.price}/${id}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            );
    }


    public static async openHall(hallId: number, hallOpen: boolean): Promise<AllData | undefined> {

        const params = new FormData()
        params.set('hallOpen', hallOpen ? '1' : '0')

        return await fetch(`${API.SERVER_NAME}${API.postfixList.open}/${hallId}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data?.success) {
                        return data.result;
                    } else {
                        API.errorNotification(data?.error)
                    }
                }
            )
    }
}

