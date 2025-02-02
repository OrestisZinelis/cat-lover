import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFavorites, addFavorite, removeFavorite } from '@src/api/favorite.api'
import type { Favorite } from '@src/types/api/Favorite.types'

export const useGetFavorites = () =>
  useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeFavorite,
    onMutate: async favoriteId => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previousFavorites = queryClient.getQueryData<Favorite[]>(['favorites'])

      queryClient.setQueryData(['favorites'], (oldFavorites: Favorite[] = []) =>
        oldFavorites.filter(fav => fav.id !== favoriteId)
      )

      return { previousFavorites }
    },
    onError: (_err, _favoriteId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites)
      }
    }
  })
}
export function useAddFavoriteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFavorite,
    onMutate: async imageId => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previousFavorites = queryClient.getQueryData<Favorite[]>(['favorites'])

      queryClient.setQueryData(['favorites'], (oldFavorites: Favorite[] = []) => [
        ...oldFavorites,
        { id: Date.now(), image_id: imageId, created_at: new Date().toISOString(), image: { id: imageId, url: '' } }
      ])

      return { previousFavorites }
    },
    onSuccess: (data, imageId) => {
      queryClient.setQueryData(['favorites'], (oldFavorites: Favorite[] = []) => {
        return oldFavorites.map(fav =>
          fav.image_id === imageId
            ? { ...fav, id: data.id, image_id: imageId, image: { id: imageId, url: data.imageUrl } }
            : fav
        )
      })
    },
    onError: (_err, _imageId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites)
      }
    }
  })
}
