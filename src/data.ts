const SERVER_NAME = "https://shfe-diplom.neto-server.ru/";

export default async function getData(
  postfix: string,
  options: RequestInit = {
    method: "GET",
  }
) {
  console.log("\n\n\n\n\t\t\tDATE\n\n\n\n");

  console.log(Date.now() % 100000);

  const data = await fetch(`${SERVER_NAME}${postfix}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("\n\n\n\t\tTHEN DATA");

      console.log(data);
      console.log(data.result);
      if (data.success) {
        return data.result;
      } 
    });

  return await data;
}
