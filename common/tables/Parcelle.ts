import { Coordonnnes_t } from '../c_types/Coordonnees_t';
import { Dimensions_t } from '../c_types/Dimensions_t';
export interface Parcelle {
    idjardin: number;
    coordonnees: Coordonnnes_t;
    dimensions: Dimensions_t;
}
