import SlideDeck from "../slideDesk/SlideDeck";

abstract class GlobalObject<T extends PIXI.DisplayObject> {

  protected deck: SlideDeck;

  protected constructor(deck: SlideDeck) {
    this.deck = deck;
  }

  public abstract async init(): Promise<void>;

  public abstract getChild(): T;
}

export default GlobalObject;
