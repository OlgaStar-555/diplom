import type {AllData, MovieHall} from "./types/allData.ts";
import type {LoginRequest} from "./types/login.ts";

export interface DataResponse {
    success: boolean,
    result?: unknown,
    error?: string
}

export default class API {
    private static SERVER_NAME: string = 'https://shfe-diplom.neto-server.ru/';

    public static ALL = 'alldata'

    private static postfixList = {
        hall: 'hall',
        price: 'price',

    }

    public static async getAllData(
        postfix: string = 'alldata',
        options: RequestInit = {
            method: "GET",
        },
    ): Promise<AllData | undefined> {

        console.log('\n\n\t\t!!!\tgetAllData!!!\n\n')

        return await fetch(`${API.SERVER_NAME}${postfix}`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("\n\n\n\t\tTHEN DATA");

                console.table(data);


                if (data.success) {
                    return data.result;
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
        console.log('API removeHall', id)


        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data?.success) {
                    return data?.result
                }
            })


    }

    public static async addHall(hallName: string): Promise<AllData | undefined> {
        if (hallName === '') {
            return
        }
        console.log('API addHall', hallName)

        const params = new FormData()
        params.set('hallName', hallName)

        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    if (data.success) {
                        return data.result;
                    }
                }
            );


    }

    public static async setConfigOfHall(
        id: number,
        rowCount: number,
        colCount: number,
        arrayConfig: string[][]
    ): Promise<MovieHall | undefined> {
        if (arrayConfig.length === 0 || arrayConfig?.[0].length === 0) {
            return
        }
        console.log('API CONFIG\n\n', arrayConfig)

        const params = new FormData()
        params.set('rowCount', rowCount.toString())
        params.set('placeCount', colCount.toString())
        params.set('config', JSON.stringify(arrayConfig))

        console.log(params)
        console.log(`${API.SERVER_NAME}${API.postfixList.hall}/${id}`)


        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}/${id}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    console.log(data)
                    if (data.success) {
                        return data.result;
                    }
                }
            );
    }

    public static async setPriceOfHall(
        id: number,
        priceStandart: number,
        priceVip: number,
    ): Promise<MovieHall | undefined> {


        console.log(`API CONFIG PRICE \n\n', ${priceStandart} <==> ${priceVip}`)

        const params = new FormData()
        params.set('priceStandart', priceStandart.toString())
        params.set('priceVip', priceVip.toString())

        console.log(`${API.SERVER_NAME}${API.postfixList.price}/${id}`)

        console.log(params)

        return await fetch(`${API.SERVER_NAME}${API.postfixList.price}/${id}`, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then((data) => {
                    console.log(data)
                    if (data.success) {
                        return data.result;
                    }
                }
            );
    }


}

