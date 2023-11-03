//https://restcountries:com/v3.1/alpha/:ISO_code
import { Continente } from "../types.ts";

export const getContinente = async ( countrycode: string ): Promise<Continente> => {
  const BASE_URL = "https://restcountries:com/v3.1/alpha";
  const url = `${BASE_URL}/:${countrycode}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Cannot fetch region");
  }
  const data = await response.json();

  return {
    continente:data.region
  }
}