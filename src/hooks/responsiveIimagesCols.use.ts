import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export function useResponsiveImagesCols() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  return isSmallScreen ? 1 : isMediumScreen ? 2 : 3
}
