import firstPcSprite from '../../assets/first-pc.jpg'
import meIn2006Sprite from '../../assets/me-in-2006.jpg'
import { fromEnd, fromStart } from '../../elements/ElementBuilder'
import Slide from '../Slide'

class MeIn2006Slide extends Slide {
  public async init() {
    this.add(this.build.title('2006'))

    const meIn2006 = await this.build.image(
      meIn2006Sprite,
      fromStart(0),
      fromEnd(0),
      0.5
    )
    this.add(meIn2006)

    const firstPc = await this.build.image(
      firstPcSprite,
      fromStart(500),
      fromEnd(0),
      0.321
    )
    this.add(firstPc)

    this.steps = []
  }

  onEnter() {}

  onExit() {}
}

export default MeIn2006Slide
