import Rolls from './Rolls';
import RollValues from './RollValues';

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
      const sum = parseInt(this.frame[0].roll, 10) + roll;
      if (sum === 10) {
        this.hasSpare = true;
        this.isFrameComplete = true;
        returnRoll.roll = '/';
        this.frame.push(returnRoll);
        return returnRoll;
      }
      this.isFrameComplete = true;
      returnRoll.roll = roll;
      this.frame.push(returnRoll);
      return returnRoll;
    }
    if (roll === 10) {
      this.hasStrike = true;
      this.isFrameComplete = true;
      returnRoll.roll = 'X';
      returnRoll.availableRolls = RollValues(false);
      this.frame.push(returnRoll);
      return returnRoll;
    }
    returnRoll.roll = roll;
    returnRoll.availableRolls = {};
    const rollVal = RollValues(true);
    for (let i = 0; i <= 10 - roll; ) {
      returnRoll.availableRolls = {
        ...returnRoll.availableRolls,
        [i]: rollVal[i],
      };
      i += 1;
    }
    this.frame.push(returnRoll);
    return returnRoll;
  }

  setFinalFrame(roll) {
    let score = 0;
    const returnRoll = new Rolls();
    if (this.frame.length === 1) {
      if (this.hasStrike) {
        if (roll === 10) {
          returnRoll.roll = 'X';
          returnRoll.availableRolls = RollValues(false);
          this.frame.push(returnRoll);
          return returnRoll;
        }
        returnRoll.roll = roll;
        const rollVal = RollValues(true);
        for (let i = 0; i <= 10 - roll; ) {
          returnRoll.availableRolls = {
            ...returnRoll.availableRolls,
            [i]: rollVal[i],
          };
          i += 1;
        }
        this.frame.push(returnRoll);
        return returnRoll;
      }
      score = parseInt(this.frame[0].roll, 10) + roll;
      if (score === 10) {
        this.hasSpare = true;
        returnRoll.roll = '/';
        returnRoll.availableRolls = RollValues(false);
        this.frame.push(returnRoll);
        return returnRoll;
      }
      this.isFrameComplete = true;
      this.frameScore = score;
      returnRoll.roll = roll;
      this.isFrameScoreCalculated = true;
      this.frame.push(returnRoll);
      return returnRoll;
    }
    if (this.hasSpare) {
      returnRoll.roll = roll === 10 ? 'X' : roll;
      this.isFrameComplete = true;
      this.frameScore = roll + 10;
      this.isFrameScoreCalculated = true;
      this.frame.push(returnRoll);
      return returnRoll;
    }
    if (this.frame[1].roll === 'X') {
      returnRoll.roll = roll === 10 ? 'X' : roll;
      this.frameScore = roll + 20;
      this.isFrameComplete = true;
      this.isFrameScoreCalculated = true;
      this.frame.push(returnRoll);
      return returnRoll;
    }
    score = parseInt(this.frame[1].roll, 10) + roll + 10;
    this.frameScore = score;
    returnRoll.roll = score === 20 ? '/' : roll;
    this.isFrameComplete = true;
    this.isFrameScoreCalculated = true;
    this.frame.push(returnRoll);
    return returnRoll;
  }
}

export default Frames;
