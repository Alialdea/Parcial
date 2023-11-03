import { Time } from "../types.ts";

//http://worldtimeapi.org/api/timezone/:area/:location[/:region]
//http://worldtimeapi.org/api/timezone/America/Argentina/Salta"


export const getTime = async ( continente: string, pais: string, ciudad:string ): Promise<Time> => {
  const BASE_URL = "http://worldtimeapi.org/api/timezone";
  const url = `${BASE_URL}/${continente}/${pais}/${ciudad}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Cannot fetch time");
  }
  const data = await response.json();

  return {
    date_time: data.date_time
  };
};