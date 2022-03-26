export interface Jardin {
    ID: number;
    nom: string;
    surface: number;
    bPotager: boolean;
    bOrnement: boolean;
    bVerger: boolean;
    typeSol: string | null;
    hauteurMaximale: number | null;
  }
  