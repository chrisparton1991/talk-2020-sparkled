import Slide from '../Slide'

class ToThePastSlide extends Slide {
  public async init() {
    this.add(this.build.title('<to the past video>'))

    this.steps = []
  }

  onEnter() {}

  onExit() {}
}

export default ToThePastSlide
