import { ImageListItem, Skeleton } from '@mui/material'

interface SkeletonListProps {
  readonly length?: number
  readonly height?: string | number
}

export default function SkeletonList({ length = 12, height = '10vh' }: SkeletonListProps) {
  return (
    <>
      {Array.from({ length }, (_, index) => (
        <ImageListItem key={index}>
          <Skeleton variant="rectangular" width="100%" height={height} />
        </ImageListItem>
      ))}
    </>
  )
}
