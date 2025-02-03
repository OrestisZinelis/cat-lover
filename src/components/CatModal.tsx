import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useGetCatById } from '@src/hooks/queries/cat.queries.use'
import {
  useGetFavorites,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation
} from '@src/hooks/queries/favorite.queries.use'
import { Button, Tooltip, IconButton, Modal, Card, CardContent, CardActions, CircularProgress } from '@mui/material'
import Close from '@mui/icons-material/Close'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'

export default function CatModal({
  showAlert
}: {
  readonly showAlert: (message: string, severity: 'success' | 'error') => void
}) {
  const { catId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: cat, isFetching: isFetchingCat, isError: isFetchingCatError } = useGetCatById(catId ?? '')
  const { data: favorites, isFetching: isFetchingFavorites } = useGetFavorites()
  const { mutateAsync: removeFavorite, isPending: isPendingRemoveFavorite } = useRemoveFavoriteMutation()
  const { mutateAsync: addFavorite, isPending: isPendingAddFavorite } = useAddFavoriteMutation()

  const [open, setOpen] = useState(true)

  const navigateBack = useCallback(() => {
    if (location.pathname === `/cats/${catId}`) {
      navigate('/cats')
    } else {
      navigate(-1)
    }
  }, [location.pathname, catId, navigate])

  useEffect(() => {
    if ((!cat || isFetchingCatError) && !isFetchingCat) {
      showAlert(`Failed to load cat`, 'error')
      setOpen(false)
      navigateBack()
    }
  }, [cat, isFetchingCatError, isFetchingCat, showAlert, setOpen, navigateBack])

  const isFetching = isFetchingCat || isFetchingFavorites
  const isMutatingPending = isPendingRemoveFavorite || isPendingAddFavorite

  const isFavorite = favorites?.some(fav => fav.image_id === catId)

  const handleAddFavorite = async () => {
    try {
      await addFavorite(catId!)
      showAlert('Added to favorites!', 'success')
    } catch (error) {
      showAlert('Failed to add favorite', 'error')
      console.error(error)
    }
  }

  const handleRemoveFavorite = async () => {
    try {
      const fav = favorites?.find(fav => fav.image_id === catId)
      if (!fav) return

      await removeFavorite(fav.id)
      showAlert('Removed from favorites!', 'success')
    } catch (error) {
      showAlert('Failed to remove favorite', 'error')
      console.error(error)
    }
  }

  const handleCopyLink = async () => {
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}/cats/${catId}`

    try {
      await navigator.clipboard.writeText(fullUrl)
      showAlert('URL copied to clipboard!', 'success')
    } catch (error) {
      showAlert('Failed to copy URL.', 'error')
      console.error(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    navigateBack()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="cat"
      aria-describedby="cat-display"
      className="flex items-center justify-center my-4"
    >
      <Card className="md:max-w-full lg:max-w-[50%] min-w-[500px] min-h-[500px] mx-4">
        {!cat ? (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <CircularProgress color="secondary" size="10rem" />
          </div>
        ) : (
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between">
              {isFavorite ? (
                <Tooltip title="Remove from favorites">
                  <span>
                    <IconButton loading={isFetching || isMutatingPending} onClick={handleRemoveFavorite}>
                      <Favorite color="error" />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="Add to favorites">
                  <span>
                    <IconButton loading={isFetching || isMutatingPending} onClick={handleAddFavorite}>
                      <FavoriteBorder />
                    </IconButton>
                  </span>
                </Tooltip>
              )}

              <div className="ml-auto">
                <Tooltip title="Close">
                  <IconButton color="error" onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <img src={cat.url} alt={`cat-${cat.id}`} className="rounded max-h-[80vh] object-contain" />

            {cat.breeds?.[0] && (
              <>
                <Link to={`/breeds/${cat.breeds[0].id}`}>
                  <h2 className="text-lg text-center font-bold">{cat.breeds[0].name}</h2>
                </Link>
                <p className="text-center text-gray-600">{cat.breeds[0].description}</p>
              </>
            )}

            <CardActions className="flex justify-center">
              <Button onClick={handleCopyLink}>Copy Link</Button>
            </CardActions>
          </CardContent>
        )}
      </Card>
    </Modal>
  )
}
