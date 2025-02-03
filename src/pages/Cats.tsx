import { Link, Outlet } from "react-router-dom";
import { useGetCats } from "@src/hooks/queries/cat.queries.use";
import { useResponsiveImagesCols } from "@src/hooks/responsiveIimagesCols.use";
import SkeletonImages from "@components/SkeletonImages";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";

export default function Cats() {
  const { data: cats, isFetching, refetch } = useGetCats();
  const cols = useResponsiveImagesCols();

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      <Button
        className="flex self-center"
        variant="contained"
        color="secondary"
        loading={isFetching}
        onClick={() => refetch()}
      >
        Load More
      </Button>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {isFetching ? (
          <SkeletonImages />
        ) : (
          (cats || []).map((cat) => (
            <ImageListItem key={cat.id}>
              <Link to={`${cat.id}`}>
                <img src={cat.url} alt="Cat" loading="lazy" />
                <ImageListItemBar
                  position="bottom"
                  title={cat?.breeds[0]?.name ?? ""}
                />
              </Link>
            </ImageListItem>
          ))
        )}
      </ImageList>
      <Outlet />
    </div>
  );
}
