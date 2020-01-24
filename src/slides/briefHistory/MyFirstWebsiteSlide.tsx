import firstWebsiteSprite from '../../assets/first-website.jpg'
import { fromCenter } from '../../elements/ElementBuilder'
import Slide from '../Slide'

class MyFirstWebsiteSlide extends Slide {
  public async init() {
    const firstWebsite = await this.build.image(
      firstWebsiteSprite,
      fromCenter(0),
      fromCenter(0),
      0.8
    )
    this.add(firstWebsite)

    this.steps = []
  }

  onEnter() {}

  onExit() {}
}

export default MyFirstWebsiteSlide
