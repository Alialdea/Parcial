import express, { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";
import { getLocation } from "./getLocation.ts";
import { getWeather } from "./getWeather.ts";
import { getTime } from "./getTime.ts";
import { getContinente } from "./getContinente.ts";

const updateContacto = async (req: Request, res: Response) => {
  try {
    const app = express();

    const { dni } = req.params;
    const { nomap, email,  codPos, ISO} = req.body;
    

    if (!dni || !nomap || !email || !codPos || !ISO) {
        res.status(500).send("tAn faltaU dAt0s");
        return;
    }

    const updatedContacto = await ContactoModel.findOneAndUpdate(
        { dni },
        {nomap, email, codPos, ISO},
        { new: true }
      ).exec();
  
      if (!updatedContacto) {
        res.status(404).send("Contact0 not found");
        return;
      }
  
    const ciudad= app.get(await getLocation(codPos,ISO)).city
    const pais= app.get(await getLocation(codPos,ISO)).country

    const location=app.get(await getLocation(codPos,ISO))
    const tiempo= app.get(await getWeather(location)).temperature

    const continente= app.get(await getContinente(ISO)).continente

    const hora= app.get(await getTime(continente,pais,ciudad)).date_time

     
    
    res.status(200).send({
        dni: updatedContacto.dni,
        nomap: updatedContacto.nomap,
        email: updatedContacto.email,
        codPos: updatedContacto.codPos,
        ciudad: ciudad,
        pais: pais,
        hora:hora,
        tiempo: tiempo,
        id: updatedContacto._id.toString(),
      });


    } catch (error) {
      res.status(500).send(error.message);
      return;
    }
};

export default updateContacto;