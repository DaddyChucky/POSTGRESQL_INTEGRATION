import { Coordonnnes_t } from "../c_types/Coordonnees_t";

export interface VarieteContenuDansUnRang {
    nomVariete: string;
    IDJardinRang: number;
    coordonneesParcelleRang: Coordonnnes_t;
    numeroRang: number;
    typeMiseEnPlace: string;
}
