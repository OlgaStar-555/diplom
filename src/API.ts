import type {AllData} from "./types/allData.ts";
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
                if(data?.success) {
                    return data?.result
                }
            })


    }

    public static async addHall(hallName: string): Promise<AllData | undefined> {
        if(hallName === '') {
            return
        }
        console.log('API addHall', hallName)

        const params = new FormData()
        params.set('hallName', hallName)
        console.log('params')
        console.table(params)


        return await fetch(`${API.SERVER_NAME}${API.postfixList.hall}`, {
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

