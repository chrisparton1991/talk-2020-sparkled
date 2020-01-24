import ElementBuilder, { Placement } from "../elements/ElementBuilder";
import Point from "../types/Point";
import { animate } from "../utils/animate";
import Interaction from "./Interaction";

/**
 * Animates the position of a target object by a fixed to.
 */
class MoveInteraction implements Interaction {
  private readonly target: PIXI.Container;
  private readonly durationMs: number;
  private readonly to: () => Point;
  private from: (() => Point) | null = null;

  constructor(target: PIXI.Container, x: Placement, y: Placement, durationMs: number) {
    this.target = target;
    this.durationMs = durationMs;
    this.to = () => ({
      x: ElementBuilder.calculatePlacementX(target, x),
      y: ElementBuilder.calculatePlacementY(target, y)
    });
  }

  async apply(reverse: boolean, immediate: boolean) {
    this.from = (this.from !== null) ? this.from : () => ({x: this.target.position.x, y: this.target.position.y});

    const from = reverse ? this.to : this.from;
    const to = reverse ? this.from : this.to;

    await animate(immediate ? 0.00001 : this.durationMs, progress => {
      const {x: fromX, y: fromY} = from();
      const {x: toX, y: toY} = to();
      this.target.position.x = fromX + (toX - fromX) * progress;
      this.target.position.y = fromY + (toY - fromY) * progress;
    });
  }
}


export default MoveInteraction;
