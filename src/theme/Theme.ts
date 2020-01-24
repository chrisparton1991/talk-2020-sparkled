interface Theme {
  /** The unscaled width of the canvas. */
  canvasWidth: number

  /** The unscaled height of the canvas. */
  canvasHeight: number

  /** Horizontal margin to prevent content from being cropped, expressed as a pixel value. */
  safeMarginX: number

  /** Vertical margin to prevent content from being cropped, expressed as a pixel value. */
  safeMarginY: number

  /** The colour of the slide background, expressed as a hexadecimal colour e.g. 0xFFFFFF. */
  backgroundColor: number

  /** The font to use for titles. **/
  titleFontFamily: string

  /** The size of the title text. */
  titleFontSize: number

  /** Horizontal title offset to account for font alignment issues. **/
  titleOffsetX: number

  /** Vertical title offset to account for font alignment issues. **/
  titleOffsetY: number

  /** The font to use for body text. **/
  bodyFontFamily: string
}

export default Theme
