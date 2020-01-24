import { fromCenter, fromEnd, fromStart } from '../../elements/ElementBuilder'

import hookSprite from '../../assets/hook.png'
import ReactLogo from '../../globalObjects/ReactLogo'
import { fadeTo, moveTo, group, scaleTo } from '../../interactions/Interactions'
import Slide from '../Slide'

class TitleSlide extends Slide {
  public async init() {
    this.add(this.build.title('React Hooks'))

    const body = this.build.body(['And why we need them'])
    this.add(body)

    const hook = await this.build.image(hookSprite, fromCenter(), fromCenter())
    this.add(hook)

    const reactLogo = ReactLogo.getInstance(this.deck).getChild()
    this.steps = [
      group(
        fadeTo(this.container, 0, 500),
        scaleTo(reactLogo, 0.1, 500),
        moveTo(reactLogo, fromEnd(), fromStart(), 500),
        fadeTo(reactLogo, 0.2, 500)
      )
    ]
  }

  onEnter() {}

  onExit() {}
}

export default TitleSlide
