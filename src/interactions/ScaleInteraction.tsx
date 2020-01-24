import { animate } from '../utils/animate'
import Interaction from './Interaction'

/**
 * Animates the size of a target object.
 */
class ScaleInteraction implements Interaction {
  private readonly target: PIXI.DisplayObject
  private readonly durationMs: number
  private readonly to: number
  private from: number | null = null

  constructor(
    target: PIXI.DisplayObject,
    to: number,
    durationMs: number = 1000
  ) {
    this.target = target
    this.durationMs = durationMs
    this.to = to
  }

  async apply(reverse: boolean, immediate: boolean) {
    this.from = this.from !== null ? this.from : this.target.scale.x

    const from = reverse ? this.to : this.from
    const to = reverse ? this.from : this.to

    await animate(immediate ? 0.00001 : this.durationMs, progress => {
      this.target.scale.x = from + (to - from) * progress
      this.target.scale.y = from + (to - from) * progress
    })
  }
}

export default ScaleInteraction
