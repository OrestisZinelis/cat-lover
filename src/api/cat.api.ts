import { api } from '@api/axios'
import type { Cat } from '@src/types/api/Cat.types'
import type { Breed } from '@src/types/api/Breed.types'

export const getRandomCats = async (limit = 10): Promise<Cat[]> => {
  const { data } = await api.get<Cat[]>(`/images/search?limit=${limit}&has_breeds=1`)
  return data
}

export const getCatsByBreedId = async (breedId: Breed['id'], limit = 10): Promise<Cat[]> => {
  const { data } = await api.get<Cat[]>(`/images/search?limit=${limit}&breed_ids=${breedId}`)
  return data
}

export const getCatById = async (id: Cat['id']): Promise<Cat> => {
  const { data } = await api.get<Cat>(`/images/${id}`)
  return data
}
