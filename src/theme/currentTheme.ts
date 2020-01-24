import defaultTheme from './defaultTheme'
import Theme from './Theme'

let currentTheme = defaultTheme

function getCurrentTheme() {
  return currentTheme
}

function setCurrentTheme(theme: Theme) {
  currentTheme = theme
}

export { getCurrentTheme, setCurrentTheme }
