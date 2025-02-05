import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "@api/breed.api";

export const useGetBreeds = () =>
  useQuery({ queryKey: ["breeds"], queryFn: getBreeds, refetchOnMount: false });
