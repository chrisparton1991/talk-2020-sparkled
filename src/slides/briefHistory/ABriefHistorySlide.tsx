import Slide from '../Slide'

class ABriefHistorySlide extends Slide {
  public async init() {
    this.add(this.build.title('JS: A brief history'))
    this.steps = []
  }

  onEnter() {}

  onExit() {}
}

export default ABriefHistorySlide
