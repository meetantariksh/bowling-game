class Person {
  constructor(name = '') {
    this.name = name;
    this.frames = [];
  }

  setFrames(frame) {
    this.frames.push(frame);
  }
}

export default Person;
