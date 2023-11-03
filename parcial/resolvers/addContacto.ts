import express,{ Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";
import { getLocation } from "./getLocation.ts";
import { getWeather } from "./getWeather.ts";
import { getTime } from "./getTime.ts";
import { getContinente } from "./getContinente.ts";


const addContacto = async (req: Request, res: Response) => {
  try {
    const app = express();

    const { dni, nomap, email,  codPos, ISO } = req.body;
    

    if (!dni || !nomap || !email || !codPos || !ISO) {
      res.status(500).send("tAn faltaU dAt0s");
      return;
    }

    const alreadyExists = await ContactoModel.findOne({ dni }).exec();
    if (alreadyExists) {
      res.status(400).send("El cont4ct0 ya ExiStE");
      return;
    }

    const newContacto = new ContactoModel({ dni, nomap, email,  codPos, ISO });
    await newContacto.save();

    const ciudad= app.get(await getLocation(codPos,ISO)).city
    const pais= app.get(await getLocation(codPos,ISO)).country

    const location=app.get(await getLocation(codPos,ISO))
    const tiempo= app.get(await getWeather(location)).temperature

    const continente= app.get(await getContinente(ISO)).continente

    const hora= app.get(await getTime(continente,pais,ciudad)).date_time


    res.status(200).send({
      dni: newContacto.dni,
      nomap: newContacto.nomap,
      email: newContacto.email,
      codPos: newContacto.codPos,
      ciudad: ciudad,
      pais: pais,
      hora:hora,
      tiempo: tiempo,
      id: newContacto._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default addContacto;
