import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "@src/api/breed.api";

export const useGetBreeds = () =>
  useQuery({ queryKey: ["breeds"], queryFn: getBreeds, refetchOnMount: false });
