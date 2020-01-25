import { RefObject, useEffect } from 'react'
import Theme from '../theme/Theme'

function useResizeSlideDeck(element: RefObject<HTMLElement>, theme: Theme) {
  useEffect(() => {
    const resize = () => {
      if (!element.current?.parentElement) {
        return
      }

      const { clientWidth, clientHeight } = element.current.parentElement

      const scale = Math.min(
        clientWidth / theme.canvasWidth,
        clientHeight / theme.canvasHeight
      )

      element.current.style.transform = `scale3d(${scale}, ${scale}, 1)`
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [element, theme])
}

export default useResizeSlideDeck
