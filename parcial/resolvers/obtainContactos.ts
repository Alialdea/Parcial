import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const obtainContactos = async (_req: Request, res: Response) => {
    try {
        const contactos = await ContactoModel.find({}).exec();
        
        res.status(200).json(contactos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export default obtainContactos;