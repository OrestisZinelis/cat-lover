import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useGetBreeds } from "@src/hooks/queries/breed.queries.use";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import type { AlertHandler } from "@src/types/Alert.types";

export default function Breeds({ showAlert }: AlertHandler) {
  const navigate = useNavigate();
  const {
    data: breeds = [],
    isFetching: isFetchingBreeds,
    isError: isErrorFetchingBreeds,
  } = useGetBreeds();

  useEffect(() => {
    if (isErrorFetchingBreeds) {
      showAlert(`Failed to load breeds`, "error");
    }
  }, [isErrorFetchingBreeds, showAlert]);

  const skeleton = Array.from({ length: 10 }, (_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton variant="text" width={100} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" width={150} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" width={100} />
      </TableCell>
    </TableRow>
  ));

  let breedsContent;

  if (isFetchingBreeds) {
    breedsContent = skeleton;
  } else {
    breedsContent = breeds?.map((breed) => (
      <TableRow
        key={breed.id}
        onClick={() => navigate(breed.id)}
        className="cursor-pointer hover:bg-gray-100"
      >
        <TableCell component="th" scope="row">
          {breed.name}
        </TableCell>
        <TableCell align="center">{breed.life_span}</TableCell>
        <TableCell align="center">{breed.weight.metric}</TableCell>
        <TableCell align="right">{breed.temperament}</TableCell>
        <TableCell align="right">{breed.origin}</TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      {!breeds.length && !isFetchingBreeds && (
        <div className="text-center text-gray-500">No breeds available.</div>
      )}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <Table stickyHeader sx={{ minWidth: 350 }} aria-label="breeds table">
            <TableHead>
              <TableRow>
                <TableCell>Breed</TableCell>
                <TableCell align="center">Life span (years)</TableCell>
                <TableCell align="center">Weight (kg)</TableCell>
                <TableCell align="right">Temperament</TableCell>
                <TableCell align="right">Origin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{breedsContent}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Outlet />
    </div>
  );
}
