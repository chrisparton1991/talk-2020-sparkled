import { Placement } from "../elements/ElementBuilder";
import FadeInteraction from "./FadeInteraction";
import GroupInteraction from "./GroupInteraction";
import Interaction from "./Interaction";
import MoveInteraction from "./MoveInteraction";
import NoopInteraction from "./NoopInteraction";
import ScaleInteraction from "./ScaleInteraction";
import SequenceInteraction from "./SequenceInteraction";

function buildFade(target: PIXI.DisplayObject, alpha: number, durationMs: number) {
  return new FadeInteraction(target, alpha, durationMs);
}

function buildScale(target: PIXI.DisplayObject, scale: number, durationMs: number) {
  return new ScaleInteraction(target, scale, durationMs);
}

function buildGroup(...interactions: Interaction[]) {
  return new GroupInteraction(...interactions);
}

function buildMove(target: PIXI.Container, x: Placement, y: Placement, durationMs: number) {
  return new MoveInteraction(target, x, y, durationMs);
}

function buildNoop() {
  return new NoopInteraction();
}

function buildSequence(...interactions: Interaction[]) {
  return new SequenceInteraction(...interactions);
}

export const fadeTo = buildFade;
export const scaleTo = buildScale;
export const group = buildGroup;
export const moveTo = buildMove;
export const noop = buildNoop();
export const sequence = buildSequence;
