import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Theme from '../theme/Theme'
import useResizeSlideDeck from './useResizeSlideDeck'

type Props = {
  slides: React.FC<any>[]
  theme: Theme
}

const S = {
  Container: styled.div<{ theme: Theme }>`
    background: ${p => p.theme.backgroundColor};
    width: ${p => p.theme.canvasWidth}px;
    height: ${p => p.theme.canvasHeight}px;
    transform-origin: center;
    flex-shrink: 0;
  `
}

const SlideDeck: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useResizeSlideDeck(containerRef, props.theme)

  const [slideIndex, setSlideIndex] = useState(0)

  const CurrentSlide = useMemo(() => {
    return props.slides[slideIndex]
  }, [props.slides, slideIndex])



  return (
    <S.Container ref={containerRef} theme={props.theme}>
      <CurrentSlide/>
    </S.Container>
  )
}

export default SlideDeck
