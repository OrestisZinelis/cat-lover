import type { Breed } from "@src/types/api/Breed.types";

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}
