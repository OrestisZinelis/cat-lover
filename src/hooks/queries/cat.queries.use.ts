import { useQuery } from "@tanstack/react-query";
import { getRandomCats, getCatById, getCatsByBreedId } from "@api/cat.api";

export const useGetCats = () =>
  useQuery({
    queryKey: ["cats"],
    queryFn: () => getRandomCats(10),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

export const useGetCatById = (id: string) =>
  useQuery({
    queryKey: ["cat", id],
    queryFn: () => getCatById(id),
    retry: false,
    refetchOnMount: false,
  });

export const useGetCatsByBreedId = (breedId: string) =>
  useQuery({
    queryKey: ["cats-by-breed", breedId],
    queryFn: () => getCatsByBreedId(breedId, 10),
    refetchOnMount: false,
    retry: false,
  });
