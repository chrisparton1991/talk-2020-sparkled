import Slide from "../Slide";

class BackToTheFutureSlide extends Slide {

  public async init() {
    this.add(this.build.title("<back to the future video>"));

    this.steps = [];
  }

  onEnter() {
  }

  onExit() {
  }
}

export default BackToTheFutureSlide;
