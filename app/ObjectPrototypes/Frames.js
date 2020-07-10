import Rolls from './Rolls';

class Frames {
  constructor() {
    this.frame = [];
    this.hasStrike = false;
    this.hasSpare = false;
    this.frameScore = 0;
    this.isFrameComplete = false;
    this.isFrameScoreCalculated = false;
  }

  setRoll(roll) {
    const returnRoll = new Rolls();
    if (this.frame.length > 0 && !this.isFrameComplete) {
      const sum = this.frame[0] + roll;
      if (sum === 10) {
        this.hasSpare = true;
        this.isFrameComplete = true;
        returnRoll.roll('/');
        this.frame.push(returnRoll);
      }
    } else if (roll === 10) {
      this.hasStrike = true;
      this.isFrameComplete = true;
      returnRoll.roll('X');
      this.frame.push(returnRoll);
    } else {
      returnRoll.roll(roll);
      for (let i = 1; i <= 10 - roll; ) {
        returnRoll.availableRolls.push(i);
        i += 1;
      }
      this.frame.push(roll);
    }
    return returnRoll;
  }
}

export default Frames;
