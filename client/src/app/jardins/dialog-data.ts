import { Jardin } from "../../../../common/tables/Jardin";
import { Parcelle } from "../../../../common/tables/Parcelle";
import { RangParcelle } from './rang-parcelle';

export interface DialogData {
  jardin: Jardin;
  parcelles: Parcelle[];
  rangsParcelles: RangParcelle[];
}
