import { api } from '@api/axios'
import { getCatById } from '@api/cat.api'
import type { Favorite } from '../types/api/Favorite.types'
import type { Cat } from '../types/api/Cat.types'

export const addFavorite = async (imageId: Cat['id']): Promise<{ id: number; imageUrl: string }> => {
  const { data } = await api.post<{ id: number }>('/favourites', { image_id: imageId })

  const cat = await getCatById(imageId) // Fetch the image URL associated with this imageId to avoid refetching favorites

  return { id: data.id, imageUrl: cat.url }
}

export const getFavorites = async (): Promise<Favorite[]> => {
  const { data } = await api.get<Favorite[]>('/favourites')
  return data
}

export const removeFavorite = async (favoriteId: Favorite['id']): Promise<void> => {
  await api.delete(`/favourites/${favoriteId}`)
}
