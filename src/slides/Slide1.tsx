import React, { useRef } from 'react'
import Theme from '../theme/Theme'

type Props = {
  theme: Theme
}

const S = {}

const Slide1: React.FC<Props> = ({ theme }) => {
  return (
    <h1>Slide 1</h1>
  )
}

export default Slide1
