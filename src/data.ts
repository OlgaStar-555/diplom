
export const SERVER_NAME = "";




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
