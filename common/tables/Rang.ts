import { Coordonnnes_t } from "../c_types/Coordonnees_t";

export interface Rang {
    IDJardin: number;
    coordonneesParcelle: Coordonnnes_t;
    numero: number;
    coordonneesRang: Coordonnnes_t;
    dateDebutJachere: Date | null;
    dateFinJachere: Date | null;
}
