import mongoose from "npm:mongoose@7.6.3";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    dni: {type: String, required: true},
    nomap: {type: String, required: true},
    email: {type: String, required: true},
    codPos: {type: String, required: true},
    ciudad:{type: String, required: true},
    pais:{type: String, required: true},
    hora:{type: String, required: true},
    tiempo:{type: String, required: true}
  },
  { timestamps: true }//realizar un seguimiento de la actividad de los documentos
);

export type ContactoModelType = mongoose.Document & Omit<Contacto, "id">;

export default mongoose.model<ContactoModelType>("Contacto", contactoSchema);