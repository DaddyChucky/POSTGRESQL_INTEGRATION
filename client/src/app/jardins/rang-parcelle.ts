import { Parcelle } from "../../../../common/tables/Parcelle";
import { Rang } from "../../../../common/tables/Rang";

export interface RangParcelle {
  parcelle: Parcelle;
  rangs: Rang[];
}
