export class Biens {

  constructor(

         public titre: string,
         public   localisation: number,
         public   ville: string,
         public   quartier: string,
         public   dimensions: number,
         public   description: string,
         public   prix: number,
         public   type: string,
         public   categorie: string,
         public    etat: string,
         public   est_valide: boolean,
         public   agence: number) {
  }

  id: number;
}

