import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useGetFavorites,
  useRemoveFavoriteMutation,
} from "@hooks/queries/favorite.queries.use";
import { useResponsiveImagesCols } from "@hooks/responsiveIimagesCols.use";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SkeletonImages from "@components/SkeletonImages";
import { ImageList, ImageListItem, Tooltip } from "@mui/material";
import type { Favorite } from "@src/types/api/Favorite.types";
import { useAlert } from "@hooks/alert.use";

export default function Favorites() {
  const {
    data: favorites = [],
    isFetching: isFetchingFavorites,
    isError: isErrorFetchingFavorites,
  } = useGetFavorites();
  const removeFavoriteMutation = useRemoveFavoriteMutation();
  const cols = useResponsiveImagesCols();

  const { showAlert } = useAlert();

  useEffect(() => {
    if (isErrorFetchingFavorites) {
      showAlert(`Failed to load favorites`, "error");
    }
  }, [isErrorFetchingFavorites, showAlert]);

  const sortedFavorites = favorites?.sort(
    (a: Favorite, b: Favorite) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const handleRemoveFavorite = async (id: Favorite["id"]) => {
    try {
      const fav = favorites?.find((fav) => fav.id === id);
      if (!fav) return;

      await removeFavoriteMutation.mutateAsync(fav.id);
      showAlert("Removed from favorites!", "success");
    } catch (error) {
      showAlert("Failed to remove favorite", "error");
      console.error(error);
    }
  };

  let content;

  if (isFetchingFavorites) {
    content = (
      <ImageList variant="masonry" cols={cols} gap={8}>
        <SkeletonImages />;
      </ImageList>
    );
  } else if (!favorites.length) {
    content = (
      <div className="text-center text-gray-500">No favorites yet.</div>
    );
  } else {
    content = (
      <ImageList variant="masonry" cols={cols} gap={8}>
        {sortedFavorites.map((fav) => (
          <ImageListItem key={fav.id}>
            <Link to={`${fav.image_id}`}>
              <img src={fav.image.url} alt={fav.image_id} loading="lazy" />
            </Link>

            <Tooltip title="Remove from favorites">
              <DeleteForeverIcon
                className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded cursor-pointer"
                onClick={() => handleRemoveFavorite(fav.id)}
              />
            </Tooltip>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      {content}
      <Outlet />
    </div>
  );
}
