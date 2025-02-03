import { Link, Outlet } from 'react-router-dom'
import { useGetFavorites, useRemoveFavoriteMutation } from '@src/hooks/queries/favorite.queries.use'
import { useResponsiveImagesCols } from '@src/hooks/responsiveIimagesCols.use'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SkeletonImages from '@components/SkeletonImages'
import { ImageList, ImageListItem, Tooltip } from '@mui/material'
import type { Favorite } from '@src/types/api/Favorite.types'

export default function Favorites({
  showAlert
}: {
  readonly showAlert: (message: string, severity: 'success' | 'error') => void
}) {
  const { data: favorites, isFetching } = useGetFavorites()
  const removeFavoriteMutation = useRemoveFavoriteMutation()
  const cols = useResponsiveImagesCols()

  const sortedFavorites = favorites?.sort(
    (a: Favorite, b: Favorite) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const handleRemoveFavorite = async (id: Favorite['id']) => {
    try {
      const fav = favorites?.find(fav => fav.id === id)
      if (!fav) return

      await removeFavoriteMutation.mutateAsync(fav.id)
      showAlert('Removed from favorites!', 'success')
    } catch (error) {
      showAlert('Failed to remove favorite', 'error')
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      <ImageList variant="masonry" cols={cols} gap={8}>
        {isFetching ? (
          <SkeletonImages />
        ) : (
          (sortedFavorites || []).map(fav => (
            <ImageListItem key={fav.id}>
              <Link key={fav.id} to={`${fav.image_id}`}>
                <img src={fav.image.url} alt={fav.image_id} loading="lazy" />
              </Link>

              <Tooltip title="Remove from favorites">
                <DeleteForeverIcon
                  className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded cursor-pointer"
                  onClick={() => handleRemoveFavorite(fav.id)}
                />
              </Tooltip>
            </ImageListItem>
          ))
        )}
      </ImageList>
      <Outlet />
    </div>
  )
}
