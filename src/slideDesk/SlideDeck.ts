import Mousetrap from 'mousetrap'
import * as PIXI from 'pixi.js'
import ElementBuilder from '../elements/ElementBuilder'
import { noop } from '../interactions/Interactions'
import Slide from '../slides/Slide'
import { getCurrentTheme } from '../theme/currentTheme'

class SlideDeck {
  public app = new PIXI.Application({
    resolution: Math.max(window.devicePixelRatio, 2),
    antialias: true
  })
  public element = this.app.view
  public canvas = new PIXI.Container()
  public globals = new PIXI.Container()
  public elementBuilder: ElementBuilder

  private background = new PIXI.Graphics()
  private slideIndex = 0
  private stepIndex = 0
  private slides: Slide[] = []
  private isTransitioning = false

  public constructor() {
    this.elementBuilder = new ElementBuilder()
    this.canvas.sortableChildren = true
    this.drawCanvasBackground()
    this.drawCanvasBounds()
    this.handleResize()
    this.handleInteraction()
  }

  public async loadSlides(loadFn: (slideDeck: SlideDeck) => Slide[]) {
    this.slides = loadFn(this)

    for (const slide of this.slides) {
      await slide.init()
    }
  }

  public async show() {
    this.app.stage.addChild(this.canvas)
    this.currentSlide().show()

    const savedSlide = parseInt(sessionStorage.getItem('slideIndex') || '0')
    const savedStep = parseInt(sessionStorage.getItem('stepIndex') || '0')

    while (
      this.slideIndex < savedSlide &&
      this.slideIndex < this.slides.length
    ) {
      await this.next(true)
    }

    while (
      this.stepIndex < savedStep &&
      this.stepIndex < this.currentSlide().steps.length
    ) {
      await this.next(true)
    }

    // Ensure replay animations are finished before showing the canvas.
    setTimeout(() => document.body.appendChild(this.app.view))
  }

  private drawCanvasBackground() {
  }

  private drawCanvasBounds() {
    const {
      canvasWidth,
      canvasHeight,
      safeMarginX,
      safeMarginY
    } = getCurrentTheme()

    const bounds = new PIXI.Graphics()
    bounds.beginFill(0xffffff, 0.1)

    bounds.drawRect(0, 0, safeMarginX, canvasHeight) // Left column
    bounds.drawRect(canvasWidth - safeMarginX, 0, safeMarginX, canvasHeight) // Right column

    bounds.drawRect(safeMarginX, 0, canvasWidth - safeMarginX * 2, safeMarginY) // Top row
    bounds.drawRect(
      safeMarginX,
      canvasHeight - safeMarginY,
      canvasWidth - safeMarginX * 2,
      safeMarginY
    ) // Bottom row

    bounds.endFill()

    bounds.renderable = false
    bounds.zIndex = 2
    this.canvas.addChild(bounds)
    Mousetrap.bind('b b', () => (bounds.renderable = !bounds.renderable))
  }

  private handleResize() {
    const { canvas } = this

    const resize = () => {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window
      const { canvasWidth, canvasHeight } = getCurrentTheme()

      const scale = Math.min(
        windowWidth / canvasWidth,
        windowHeight / canvasHeight
      )
      const newWidth = canvasWidth * scale
      const newHeight = canvasHeight * scale

      this.app.view.style.width = newWidth + 'px'
      this.app.view.style.height = newHeight + 'px'
      this.app.renderer.resize(newWidth, newHeight)

      canvas.scale.x = canvas.scale.y = scale
    }

    resize()
    window.addEventListener('resize', resize)
  }

  private handleInteraction() {
    Mousetrap.bind(['up', 'left'], this.prev)
    Mousetrap.bind(['down', 'right'], () => this.next(false))
    Mousetrap.bind(['f f'], () => document.body.requestFullscreen())

    this.app.view.addEventListener('click', async event => {
      const leftHalfClicked = event.clientX < window.innerWidth / 2
      await (leftHalfClicked ? this.prev() : this.next())
    })
  }

  private prev = async () => {
    if (this.isTransitioning) {
      return // Need to wait for current transition to finish.
    } else if (this.slideIndex === 0 && this.stepIndex === 0) {
      return // Already at start of show.
    }

    this.isTransitioning = true
    this.stepIndex--
    await this.currentStep().apply(true, false)

    if (this.stepIndex < 0) {
      this.currentSlide().hide()
      this.slideIndex--

      this.stepIndex = this.slides[this.slideIndex].steps.length
      this.currentSlide().show()
    }

    this.isTransitioning = false
    sessionStorage.setItem('slideIndex', this.slideIndex.toString())
    sessionStorage.setItem('stepIndex', this.stepIndex.toString())
  }

  private next = async (immediate: boolean = false) => {
    if (this.isTransitioning) {
      return // Need to wait for current transition to finish.
    } else if (
      this.slideIndex === this.slides.length - 1 &&
      this.stepIndex === this.currentSlide().steps.length
    ) {
      return // Already at end of show.
    }

    this.isTransitioning = true
    await this.currentStep().apply(false, immediate)
    this.stepIndex++

    if (this.stepIndex > this.currentSlide().steps.length) {
      this.currentSlide().hide()
      this.slideIndex++

      this.stepIndex = 0
      this.currentSlide().show()
    }

    this.isTransitioning = false
    sessionStorage.setItem('slideIndex', this.slideIndex.toString())
    sessionStorage.setItem('stepIndex', this.stepIndex.toString())
  }

  private currentStep = () => {
    return this.currentSlide().steps[this.stepIndex] || noop
  }

  private currentSlide = () => {
    return this.slides[this.slideIndex]
  }
}

export default SlideDeck
