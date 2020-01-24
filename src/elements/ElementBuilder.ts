import * as PIXI from 'pixi.js'
import { getCurrentTheme } from '../theme/currentTheme'
import Theme from '../theme/Theme'

enum Anchor {
  START = 0,
  CENTER = 0.5,
  END = 1
}

export interface Placement {
  anchor: Anchor
  offsetPx: number
}

class ElementBuilder {
  private readonly theme: Theme

  constructor() {
    this.theme = getCurrentTheme()
  }

  public title(text: string) {
    const {
      safeMarginX,
      safeMarginY,
      titleOffsetX,
      titleOffsetY,
      titleFontFamily
    } = this.theme
    const title = new PIXI.Text(text)
    title.style.fill = 0xffffff
    title.style.fontFamily = titleFontFamily
    title.style.fontSize = this.theme.titleFontSize
    title.style.letterSpacing = 1.2
    title.style.padding = 10
    title.x = safeMarginX + titleOffsetX
    title.y = safeMarginY + titleOffsetY
    return title
  }

  public body(lines: string[]) {
    const {
      safeMarginX,
      safeMarginY,
      titleOffsetX,
      bodyFontFamily
    } = this.theme
    const body = new PIXI.Text(lines.join('\n'))
    body.x = safeMarginX + titleOffsetX
    body.y = safeMarginY + 100
    body.style.fill = 0xffffff
    body.style.fontFamily = 'aa, ' + bodyFontFamily
    body.style.fontSize = 48
    body.style.letterSpacing = 1.2
    body.style.padding = 10
    return body
  }

  public async image(
    url: string,
    x: Placement,
    y: Placement,
    scale: number = 1
  ) {
    return new Promise<PIXI.Sprite>(resolve => {
      const image = PIXI.Sprite.from(url)

      // Wait for sprite to load so we know the size of the image.
      image.texture.baseTexture.on('loaded', () => {
        image.anchor.x = 0.5
        image.anchor.y = 0.5
        image.scale.x = image.scale.y = scale

        image.x = ElementBuilder.calculatePlacementX(image, x)
        image.y = ElementBuilder.calculatePlacementY(image, y)
        console.log([url, image.width, image.height, image.x, image.y])
        resolve(image)
      })
    })
  }

  public static calculatePlacementX(object: PIXI.Container, x: Placement) {
    const { canvasWidth, safeMarginX } = getCurrentTheme()
    return (
      ElementBuilder.calculatePlacement(
        object.width,
        canvasWidth,
        safeMarginX,
        x
      ) +
      object.width / 2
    )
  }

  public static calculatePlacementY(object: PIXI.Container, y: Placement) {
    const { canvasHeight, safeMarginY } = getCurrentTheme()
    return (
      ElementBuilder.calculatePlacement(
        object.height,
        canvasHeight,
        safeMarginY,
        y
      ) +
      object.height / 2
    )
  }

  private static calculatePlacement(
    objectSize: number,
    canvasSize: number,
    margin: number,
    placement: Placement
  ) {
    if (placement.anchor === Anchor.START) {
      return margin + placement.offsetPx
    } else if (placement.anchor === Anchor.CENTER) {
      return canvasSize / 2 - objectSize / 2 + placement.offsetPx
    } else {
      return canvasSize - margin - objectSize - placement.offsetPx
    }
  }
}

const fromStart = (offsetPx: number = 0): Placement => ({
  anchor: Anchor.START,
  offsetPx
})
const fromCenter = (offsetPx: number = 0): Placement => ({
  anchor: Anchor.CENTER,
  offsetPx
})
const fromEnd = (offsetPx: number = 0): Placement => ({
  anchor: Anchor.END,
  offsetPx
})

export default ElementBuilder
export { fromStart, fromCenter, fromEnd }
