import RollValues from './RollValues';
import Frame from './Frames';

class Person {
  constructor(name = '') {
    this.name = name;
    this.frames = [];
    this.gameComplete = false;
  }

  setFrames(frame) {
    this.frames.push(frame);
  }

  getAvailableRolls() {
    if (this.frames && this.frames.length !== 0) {
      if (this.frames[this.frames.length - 1].isFrameComplete) {
        return RollValues;
      }
      const { frame } = this.frames[this.frames.length - 1];
      return frame[frame.length - 1].availableRolls;
    }
    return RollValues;
  }

  setRoll(input) {
    const roll = parseInt(input, 10);
    if (this.frames && this.frames.length !== 0) {
      if (this.frames[this.frames.length - 1].isFrameComplete) {
        const frame = new Frame();
        frame.setRoll(roll);
        this.setFrames(frame);
        return frame;
      }
      const frame = this.frames[this.frames.length - 1];
      frame.setRoll(roll);
      this.calculateFrameScore();
      return frame;
    }
    const frame = new Frame();
    frame.setRoll(roll);
    this.setFrames(frame);
    return frame;
  }

  calculateFrameScore() {
    const frameIndex = this.frames.length - 1;
    // const frame = this.frames[frameIndex];
  }
}

export default Person;
