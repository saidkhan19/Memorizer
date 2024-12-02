import { getRandomIntInclusive, shuffle } from "../utils";

export default class TextManager {
  constructor(data) {
    this.obj = data;
  }

  get stage() {
    return this.obj.stage;
  }

  get title() {
    return this.obj.title;
  }

  get stopwatch() {
    return this.obj.stopwatch;
  }

  splitIntoPhrases() {
    const text = this.obj.text;

    // Regex splits but retains delimiters via capturing group.
    const parts = text.split(/([\.,;!?]+|\n+)/); // Split and keep delimiters
    const phrases = [];

    for (let i = 0; i < parts.length; i += 2) {
      const phrase = parts[i];
      const delimiter = parts[i + 1] || ""; // Get the delimiter if it exists
      if (phrase || delimiter) {
        // Ensure no empty strings are added
        if (/\p{L}|\p{N}/u.test(phrase)) phrases.push(phrase + delimiter);
        else phrases[phrases.length - 1] += phrase + delimiter;
      }
    }

    console.log(phrases);
    return phrases;
  }

  _isAlphanumeric(str) {
    return /^[\p{L}\p{N}\p{Pc}]+$/u.test(str); // Allows letters, digits, and underscores
  }

  splitIntoSliderElements() {
    const text = this.obj.text;
    const textArray = text
      .split(/([\p{L}\p{N}\p{Pc}]+)/u)
      .filter((part) => part !== "");

    return textArray.map((item) => ({
      text: item,
      isWord: this._isAlphanumeric(item),
      value: getRandomIntInclusive(1, 10),
    }));
  }

  splitIntoSortElements() {
    const phrases = this.splitIntoPhrases();
    let elements = [];

    for (let i = 0, order = 1; i < phrases.length; order++) {
      const numberToJoin = getRandomIntInclusive(1, 4);

      const text = phrases
        .slice(i, i + numberToJoin)
        .join("")
        .trim();
      elements.push({ text, order });

      i += numberToJoin;
    }

    shuffle(elements);
    return elements;
  }

  splitIntoFirstLetterStageWords() {
    const text = this.obj.text;
    const textArray = text
      .split(/([\p{L}\p{N}\p{Pc}]+)/u)
      .filter((part) => part !== "");

    return textArray.map((item) => ({
      text: item,
      firstLetter: item.slice(0, 1),
      otherLetters: item.slice(1),
      isWord: this._isAlphanumeric(item),
    }));
  }

  splitIntoTestElements() {
    const text = this.obj.text;
    const textArray = text
      .split(/([\p{L}\p{N}\p{Pc}]+)/u)
      .filter((part) => part !== "");

    return textArray.map((item) => ({
      text: item,
      isWord: this._isAlphanumeric(item),
      visible: false,
      correct: true,
    }));
  }
}
