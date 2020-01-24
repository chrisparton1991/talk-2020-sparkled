import 'normalize.css'
import WebFont from "webfontloader";
import ReactLogo from "./globalObjects/ReactLogo";
import SlideDeck from "./slideDesk/SlideDeck";
import BackToTheFutureSlide from "./slides/backToTheFuture/BackToTheFutureSlide";
import JavaScriptIn2019Slide from "./slides/backToTheFuture/JavaScriptIn2019Slide";
import ABriefHistorySlide from "./slides/briefHistory/ABriefHistorySlide";
import MeIn2006Slide from "./slides/briefHistory/MeIn2006Slide";
import MyFirstWebsiteSlide from "./slides/briefHistory/MyFirstWebsiteSlide";
import ToThePastSlide from "./slides/briefHistory/ToThePastSlide";
import WebDevIn2006Slide from "./slides/briefHistory/WebDevIn2006Slide";
import AboutMeSlide from "./slides/intro/AboutMeSlide";
import TitleSlide from "./slides/intro/TitleSlide";
import './style.css'
import defaultTheme from "./theme/defaultTheme";
import {getCurrentTheme, setCurrentTheme} from "./theme/currentTheme";

setCurrentTheme(defaultTheme);
const theme = getCurrentTheme();

WebFont.load({
  custom: {
    families: [theme.titleFontFamily, theme.bodyFontFamily],
    urls: ['fonts/fonts.css']
  },
  active: start
});

async function start() {
  const deck = new SlideDeck();

  await deck.loadGlobalObjects(deck => [
    ReactLogo.getInstance(deck)
  ]);

  await deck.loadSlides(deck => [
    // Intro
    new TitleSlide(deck),
    new AboutMeSlide(deck),

    // A brief history of web development
    new ABriefHistorySlide(deck),
    new ToThePastSlide(deck),
    new MeIn2006Slide(deck),
    new MyFirstWebsiteSlide(deck),
    new WebDevIn2006Slide(deck),

    // Back to the future
    new BackToTheFutureSlide(deck),
    new JavaScriptIn2019Slide(deck)
  ]);

  await deck.show();
}
