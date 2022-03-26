import { DescriptionVariete_t } from '../c_types/DescriptionVariete_t';

export interface VarieteContenuDansUnRang {
    nom: string;
    anneeMiseEnMarche: Date;
    description: DescriptionVariete_t;
    periodeMiseEnPlace: string;
    periodeRecolte: string;
    commentaireGeneral: string;
}
