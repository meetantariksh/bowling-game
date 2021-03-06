import RollValues from './RollValues';
import Frame from './Frames';

class Person {
  constructor(name = '') {
    this.name = name;
    this.frames = [];
    this.gameComplete = false;
    this.totalScore = 0;
  }

  setFrames(frame) {
    this.frames.push(frame);
  }

  getAvailableRolls() {
    if (this.frames && this.frames.length !== 0) {
      if (this.frames[this.frames.length - 1].isFrameComplete) {
        return RollValues();
      }
      const { frame } = this.frames[this.frames.length - 1];
      return frame[frame.length - 1].availableRolls;
    }
    return RollValues();
  }

  setRoll(input) {
    const roll = parseInt(input, 10);
    if (this.frames && this.frames.length > 0 && this.frames.length < 10) {
      if (this.frames[this.frames.length - 1].isFrameComplete) {
        const frame = new Frame();
        frame.setRoll(roll);
        this.setFrames(frame);
        this.calculateFrameScore();
        if (this.frames.length === 10) {
          this.frames[9].isFrameComplete = false;
        }
        return frame;
      }
      const frame = this.frames[this.frames.length - 1];
      frame.setRoll(roll);
      this.calculateFrameScore();
      return frame;
    }
    if (this.frames.length === 10) {
      return this.rollLastFrame(roll);
    }
    const frame = new Frame();
    frame.setRoll(roll);
    this.setFrames(frame);
    return frame;
  }

  rollLastFrame(roll) {
    const frame = this.frames[9];
    let score = 0;
    if (this.frames[8].hasStrike && !this.frames[8].isFrameScoreCalculated) {
      const temp = frame.hasStrike ? 10 : parseInt(frame.frame[0].roll, 10);
      score = this.frames[7].frameScore + 10 + temp + roll;
      this.frames[8].frameScore = score;
      this.frames[8].isFrameScoreCalculated = true;
    }
    frame.setFinalFrame(roll);
    if (frame.isFrameComplete) {
      this.gameComplete = true;
      frame.frameScore = this.frames[8].frameScore + frame.frameScore;
      this.totalScore = frame.frameScore;
    }
    return frame;
  }

  calculateFrameScore() {
    const frameIndex = this.frames.length - 1;
    const frame = this.frames[frameIndex];
    let score = 0;
    if (frame.isFrameComplete) {
      if (frame.hasStrike) {
        if (
          this.frames[frameIndex - 1] &&
          this.frames[frameIndex - 1].hasSpare
        ) {
          score = this.frames[frameIndex - 2]
            ? this.frames[frameIndex - 2].frameScore
            : 0;
          this.frames[frameIndex - 1].frameScore = score + 20;
          this.frames[frameIndex - 1].isFrameScoreCalculated = true;
        } else if (
          this.frames[frameIndex - 2] &&
          this.frames[frameIndex - 2].hasStrike &&
          this.frames[frameIndex - 1].hasStrike
        ) {
          score = this.frames[frameIndex - 3]
            ? this.frames[frameIndex - 3].frameScore
            : 0;
          this.frames[frameIndex - 2].frameScore = score + 30;
          this.frames[frameIndex - 2].isFrameScoreCalculated = true;
        }
      } else if (
        frame.hasSpare &&
        this.frames[frameIndex - 1] &&
        this.frames[frameIndex - 1].hasStrike
      ) {
        score = this.frames[frameIndex - 2]
          ? this.frames[frameIndex - 2].frameScore
          : 0;
        this.frames[frameIndex - 1].frameScore = score + 20;
        this.frames[frameIndex - 1].isFrameScoreCalculated = true;
      } else if (!frame.hasSpare) {
        const frameScore = +frame.frame[0].roll + +frame.frame[1].roll;
        if (
          this.frames[frameIndex - 1] &&
          this.frames[frameIndex - 1].hasStrike
        ) {
          score = this.frames[frameIndex - 2]
            ? this.frames[frameIndex - 2].frameScore
            : 0;
          this.frames[frameIndex - 1].frameScore = score + frameScore + 10;
          this.frames[frameIndex - 1].isFrameScoreCalculated = true;
          this.frames[frameIndex].frameScore =
            score + frameScore + frameScore + 10;
          this.frames[frameIndex].isFrameScoreCalculated = true;
        } else {
          score = this.frames[frameIndex - 1]
            ? this.frames[frameIndex - 1].frameScore
            : 0;
          this.frames[frameIndex].frameScore = score + frameScore;
          this.frames[frameIndex].isFrameScoreCalculated = true;
        }
      }
    } else if (
      this.frames[frameIndex - 1] &&
      this.frames[frameIndex - 1].hasSpare
    ) {
      score = this.frames[frameIndex - 2]
        ? this.frames[frameIndex - 2].frameScore
        : 0;
      score = score + 10 + +frame.frame[0].roll;
      this.frames[frameIndex - 1].frameScore = score;
      this.frames[frameIndex - 1].isFrameScoreCalculated = true;
    } else if (
      this.frames[frameIndex - 2] &&
      this.frames[frameIndex - 2].hasStrike &&
      this.frames[frameIndex - 1].hasStrike
    ) {
      score = this.frames[frameIndex - 3]
        ? this.frames[frameIndex - 3].frameScore
        : 0;
      score = score + 20 + +frame.frame[0].roll;
      this.frames[frameIndex - 2].frameScore = score;
      this.frames[frameIndex - 2].isFrameScoreCalculated = true;
    }
  }
}

export default Person;
