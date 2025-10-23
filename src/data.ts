
export const SERVER_NAME = "https://shfe-diplom.neto-server.ru/";

export interface DataResponse {
    success: boolean,
    result?: never,
    error?: string
}


export default async function getData(
    postfix: string,
    options: RequestInit = {
        method: "GET",
    },
) {

    return await fetch(`${SERVER_NAME}${postfix}`, options)
        .then((response) => response.json())
        .then((data) => {
            console.log("\n\n\n\t\tTHEN DATA");

            console.table(data);


            if (data.success) {
                return data.result;
            }
        });
}
