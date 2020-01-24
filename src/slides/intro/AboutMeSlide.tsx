import Slide from '../Slide'

class AboutMeSlide extends Slide {
  public async init() {
    this.add(this.build.title('About me'))
    this.add(
      this.build.body([
        '',
        '👋 Chris Parton',
        '',
        '🤓 Software engineer @ Southern Mobile',
        '',
        '👍 React (and hooks!)',
        '',
        '👍 Making stuff with lights',
        '',
        '🌊 Long walks on the beach'
      ])
    )

    this.steps = []
  }

  onEnter() {}

  onExit() {}
}

export default AboutMeSlide
