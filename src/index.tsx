import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import SlideDeck from './slideDeck/SlideDeck'
import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import './style.css'
import { getCurrentTheme, setCurrentTheme } from './theme/currentTheme'
import defaultTheme from './theme/defaultTheme'

setCurrentTheme(defaultTheme)
const theme = getCurrentTheme()

WebFont.load({
  custom: {
    families: [theme.titleFontFamily, theme.bodyFontFamily],
    urls: ['fonts/fonts.css']
  },
  active: start
})

async function start() {
  const slideDeck = (
    <SlideDeck theme={theme} slides={[Slide1, Slide2]}/>
  )

  ReactDOM.render(slideDeck, document.querySelector('#slide-deck'))
}
