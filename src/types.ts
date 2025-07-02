export interface IBooks{
    _id:string
    title:string,
    author:string,
      genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn:string,
    description?:string,
    copies:number,
    available?:boolean,
   
}