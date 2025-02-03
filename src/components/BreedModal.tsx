import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useGetCatsByBreedId } from "@src/hooks/queries/cat.queries.use";
import { useResponsiveImagesCols } from "@src/hooks/responsiveIimagesCols.use";
import Close from "@mui/icons-material/Close";
import SkeletonImages from "./SkeletonImages";
import {
  Button,
  IconButton,
  Tooltip,
  Modal,
  Card,
  CardContent,
  CardActions,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";

export default function BreedModal({
  showAlert,
}: {
  readonly showAlert: (message: string, severity: "success" | "error") => void;
}) {
  const { breedId } = useParams();
  const navigate = useNavigate();
  const {
    data: cats,
    isFetching: isFetchingCats,
    isError: isFetchingCatsError,
    refetch: refetchCats,
  } = useGetCatsByBreedId(breedId ?? "");
  const cols = useResponsiveImagesCols();

  const [open, setOpen] = useState(true);

  const breed = cats?.[0]?.breeds[0];

  const handleClose = useCallback(() => {
    setOpen(false);
    navigate("/breeds");
  }, [setOpen, navigate]);

  useEffect(() => {
    if ((!breed || isFetchingCatsError) && !isFetchingCats) {
      showAlert(`Failed to load cats for this breed`, "error");
      handleClose();
    }
  }, [breed, isFetchingCatsError, isFetchingCats, showAlert, handleClose]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="breed"
        aria-describedby="breed-display"
        className="flex items-center justify-center"
      >
        <Card className="w-full md:max-w-full lg:max-w-[50%] min-w-[500px] min-h-[500px] mx-4">
          {!breed ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <CircularProgress color="secondary" size="10rem" />
            </div>
          ) : (
            <CardContent className="flex flex-col gap-2 max-h-[90vh]">
              <div className="flex justify-end">
                <Tooltip title="Close">
                  <IconButton color="error" onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </div>

              <h2 className="text-lg text-center font-bold">{breed?.name}</h2>
              <p className="text-center text-gray-600">{breed?.description}</p>

              <ImageList className="mt-4" variant="masonry" cols={cols} gap={8}>
                {isFetchingCats ? (
                  <SkeletonImages height="5vh" />
                ) : (
                  (cats || []).map((cat) => (
                    <ImageListItem key={cat.id}>
                      <Link to={`./cats/${cat.id}`} relative="path">
                        <img src={cat.url} alt="Cat" loading="lazy" />
                      </Link>
                    </ImageListItem>
                  ))
                )}
              </ImageList>

              <CardActions className="flex justify-center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => refetchCats()}
                >
                  Load more
                </Button>
              </CardActions>
            </CardContent>
          )}
        </Card>
      </Modal>
      <Outlet />
    </>
  );
}
