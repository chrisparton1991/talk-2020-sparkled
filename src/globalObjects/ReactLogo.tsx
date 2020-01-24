import * as PIXI from "pixi.js";
import reactLogoSprite from "../assets/react-logo.png";
import { fromCenter } from "../elements/ElementBuilder";
import SlideDeck from "../slideDesk/SlideDeck";
import GlobalObject from "./GlobalObject";

let instance: ReactLogo | null = null;

class ReactLogo extends GlobalObject<PIXI.Sprite> {
  private image: PIXI.Sprite = new PIXI.Sprite();

  public static getInstance(deck: SlideDeck) {
    if (instance === null) {
      instance = new ReactLogo(deck);
    }

    return instance;
  }

  async init() {
    this.image = await this.deck.elementBuilder.image(reactLogoSprite, fromCenter(-125), fromCenter(-10), .4);
    this.image.zIndex = 100;
  }

  getChild() {
    return this.image;
  }
}

export default ReactLogo;
