import { useEffect } from "react";
import type { JSX } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetCats } from "@hooks/queries/cat.queries.use";
import { useResponsiveImagesCols } from "@hooks/responsiveIimagesCols.use";
import SkeletonImages from "@components/SkeletonImages";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";
import { useAlert } from "@hooks/alert.use";

export default function Cats() {
  const {
    data: cats = [],
    isFetching: isFetchingCats,
    isError: isErrorFetchingCats,
    refetch: refetchCats,
  } = useGetCats();
  const cols = useResponsiveImagesCols();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isErrorFetchingCats) {
      showAlert(`Failed to load cats`, "error");
    }
  }, [isErrorFetchingCats, showAlert]);

  let catsContent: JSX.Element | null;

  if (isFetchingCats) {
    catsContent = (
      <ImageList variant="masonry" cols={cols} gap={8}>
        <SkeletonImages />;
      </ImageList>
    );
  } else if (!cats.length) {
    catsContent = (
      <div className="text-center text-gray-500">No cats available.</div>
    );
  } else {
    catsContent = (
      <ImageList variant="masonry" cols={cols} gap={8}>
        {cats.map((cat) => (
          <ImageListItem key={cat.id}>
            <Link to={`${cat.id}`}>
              <img src={cat.url} alt="Cat" loading="lazy" />
              <ImageListItemBar position="bottom" title={cat.breeds[0].name} />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      <Button
        className="flex self-center"
        variant="contained"
        color="secondary"
        loading={isFetchingCats}
        onClick={() => refetchCats()}
      >
        Load More
      </Button>
      {catsContent}
      <Outlet />
    </div>
  );
}
