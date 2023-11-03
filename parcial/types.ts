import mongoose from "npm:mongoose@7.6.3"

export type Location = {
    country: string;
    city: string;
    zipcode: string;
  };

export type Weather={
    temperature: number,
}

export type Time={
    date_time:string
}

export type Continente={
    continente:string
}

export type Contacto={
    dni: string,
    nomap: string,
    email: string,
    codPos: string,
    ciudad: string,
    pais: string,
    hora: string,
    tiempo: string,
    id: mongoose.Types.ObjectId
}