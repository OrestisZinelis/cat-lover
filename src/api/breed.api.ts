import { api } from "@api/axios";
import type { Breed } from "@src/types/api/Breed.types";

export const getBreeds = async (): Promise<Breed[]> => {
  const { data } = await api.get<Breed[]>("/breeds");
  return data;
};
