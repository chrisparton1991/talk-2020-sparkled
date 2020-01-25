import { fromCenter, fromEnd, fromStart } from '../../elements/ElementBuilder'

import hookSprite from '../../assets/hook.png'
import { fadeTo, moveTo, group, scaleTo } from '../../interactions/Interactions'
import Slide from '../Slide'

class TitleSlide extends Slide {
  public async init() {
    this.add(this.build.title('React Hooks'))

    const body = this.build.body(['And why we need them'])
    this.add(body)

    const hook = await this.build.image(hookSprite, fromCenter(), fromCenter())
    this.add(hook)

    this.steps = [
      group(
        fadeTo(this.container, 0, 500)
      )
    ]
  }

  onEnter() {}

  onExit() {}
}

export default TitleSlide
