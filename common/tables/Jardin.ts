export interface Jardin {
  id: number;
  nom: string;
  surface: number;
  bpotager: boolean;
  bornement: boolean;
  bverger: boolean;
  typesol: string | null;
  hauteurmaximale: number | null;
}
