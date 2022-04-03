import { Jardin } from "../tables/Jardin";
import { Parcelle } from "../tables/Parcelle";
import { RangParcelle } from '../../client/src/app/jardins/rang-parcelle';
import { VarieteContenuDansUnRang } from '../tables/VarieteContenuDansUnRang';
import { Variete } from "../tables/Variete";

export interface DialogData {
  jardin: Jardin;
  parcelles: Parcelle[];
  rangsParcelles: RangParcelle[];
  varietesInRangs: VarieteContenuDansUnRang[];
  variete: Variete;
  pending: boolean;
  success: boolean;
  update: boolean;
  delete: boolean;
  prodInsertError: boolean;
  adaptInsertError: boolean;
}
