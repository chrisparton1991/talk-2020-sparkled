import cavemanSprite from "../../assets/caveman.png";
import validHtmlSprite from "../../assets/valid-html.png";
import { fromCenter, fromStart } from "../../elements/ElementBuilder";
import Slide from "../Slide";

class WebDevIn2006Slide extends Slide {

  public async init() {
    this.add(this.build.title("Web development in 2006"));

    const caveman = await this.build.image(cavemanSprite, fromStart(0), fromStart(0));
    this.add(caveman);

    const validHtml = await this.build.image(validHtmlSprite, fromCenter(0), fromCenter(0));
    this.add(validHtml);

    this.steps = [];
  }

  onEnter() {
  }

  onExit() {
  }
}

export default WebDevIn2006Slide;
