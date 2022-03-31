import { Jardin } from "../../../../common/tables/Jardin";
import { Parcelle } from "../../../../common/tables/Parcelle";
import { RangParcelle } from './rang-parcelle';
import { VarieteContenuDansUnRang } from '../../../../common/tables/VarieteContenuDansUnRang';

export interface DialogData {
  jardin: Jardin;
  parcelles: Parcelle[];
  rangsParcelles: RangParcelle[];
  varietesInRangs: VarieteContenuDansUnRang[];
}
