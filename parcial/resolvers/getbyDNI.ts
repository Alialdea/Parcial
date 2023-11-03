import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getbyDNI = async (req: Request, res: Response) => {
  try {
    const { dni } = req.query;

    if (!dni) {
      res.status(404).json({ error: "n0 hAs metid0 el dn1" });
      return;
    }

    const discs = await ContactoModel.find({ dni: dni }).exec();

    res.status(200).json(discs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getbyDNI;