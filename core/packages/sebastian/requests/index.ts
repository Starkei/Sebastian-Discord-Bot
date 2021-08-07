export class SebastianRequest {
  private readonly parseRule = {
    add: {
      targetsAfter: ["добавь"],
      targetsDelimiter: ",",
      targetsEnds: ["в"],
      placeAfter: ["в"],
    },

    watch: {
      targetsAfter: ["следи за", "проследи за"],
      targetsDelimiter: ",",
      targetsEnds: ["в"],
      placeAfter: ["в"],
    },

    endOfRequest: ".",
  };
  constructor(private readonly name: string) {}

  public parse(content: string): ParsedRequest {
    content = content.replace(this.name + ",", "");
    const requests = content
      .split(this.parseRule.endOfRequest)
      .filter((request) => request !== "")
      .map((request) => `${request}${this.parseRule.endOfRequest}`);
    const result: ParsedRequest = {
      add: this.extractAdd(requests),
      watch: this.extractWatch(requests),
    };
    return result;
  }

  public isRequestCorrect(content: string): boolean {
    content = content.replace(this.name + ",", "");
    const isAddRule: boolean = this.isAddRule(content);
    const isWatchRule: boolean = this.isWatchRule(content);
    return isAddRule || isWatchRule;
  }

  public isWatchRule(content: string): boolean {
    const requests = content
      .split(this.parseRule.endOfRequest)
      .filter((request) => request !== "")
      .map((request) => `${request}${this.parseRule.endOfRequest}`);
    const result = this.extractWatch(requests);
    return Boolean(result.targets.length);
  }

  public isAddRule(content: string): boolean {
    const requests = content
      .split(this.parseRule.endOfRequest)
      .filter((request) => request !== "")
      .map((request) => `${request}${this.parseRule.endOfRequest}`);
    const result = this.extractAdd(requests);
    return Boolean(result.targets.length);
  }

  private extractAdd(contents: string[]): {
    targets: string[];
    place: string;
  } {
    const emptyResult = {
      targets: [],
      place: "",
    };
    for (const content of contents) {
      const addTargets = this.extract(
        this.parseRule.add.targetsAfter,
        this.parseRule.add.targetsEnds,
        content,
        this.parseRule.add.targetsDelimiter
      );
      if (addTargets.fails) {
        continue;
      }
      const addPlaces = this.extract(this.parseRule.add.placeAfter, [this.parseRule.endOfRequest], content);
      if (addPlaces.fails) {
        continue;
      }
      return {
        targets: addTargets.values,
        place: addPlaces.values[0],
      };
    }
    return emptyResult;
  }

  private extractWatch(contents: string[]): {
    targets: string[];
    place: string;
  } {
    const emptyResult = {
      targets: [],
      place: "",
    };
    for (const content of contents) {
      const watchTargets = this.extract(
        this.parseRule.watch.targetsAfter,
        this.parseRule.watch.targetsEnds,
        content,
        this.parseRule.watch.targetsDelimiter
      );
      if (watchTargets.fails) {
        continue;
      }
      const watchPlaces = this.extract(this.parseRule.watch.placeAfter, [this.parseRule.endOfRequest], content);
      if (watchPlaces.fails) {
        continue;
      }
      return {
        targets: watchTargets.values,
        place: watchPlaces.values[0],
      };
    }
    return emptyResult;
  }

  private extract(start: string[], ends: string[], content: string, separator: string = "nothing"): Extracted {
    start = this.format(start);
    ends = this.format(ends);

    const valuesAfter = this.getIfUniq(start, content);
    if (!valuesAfter) {
      return { fails: true };
    }
    content = this.reverseCutFromStartToEndOfWord(valuesAfter, content);

    const valuesEnds = this.getIfUniq(ends, content);
    if (!valuesEnds) {
      return { fails: true };
    }
    const params = this.cutFromStartToStartOfWord(valuesEnds, content).trim();
    if (!params.length) {
      return { fails: true };
    }
    content = this.reverseCutFromStartToEndOfWord(valuesEnds, content);
    if (separator === "nothing") {
      return {
        fails: false,
        content,
        values: [params],
      };
    }
    return {
      fails: false,
      content,
      values: params
        .split(separator)
        .filter((param) => param !== "")
        .map((param) => param.trim()),
    };
  }

  private getIfUniq(words: string[], content: string): string | undefined {
    let count = 0;
    let suitableWord = undefined;
    for (const word of words) {
      if (content.includes(word)) {
        count++;
        suitableWord = word;
      }
    }
    if (count === 1) {
      return suitableWord;
    }
    return undefined;
  }

  private reverseCutFromStartToEndOfWord(word: string, content: string) {
    const position = content.search(word);
    if (position < 0) {
      return content;
    }
    content = content.slice(position + word.length);
    return content;
  }

  private cutFromStartToStartOfWord(word: string, content: string) {
    const position = content.search(word === "." ? new RegExp(`\\${word}`, "g") : word);
    if (position < 0) {
      return content;
    }
    content = content.slice(0, position);
    return content;
  }

  private format(words: string[]): string[] {
    const newArr: string[] = [];
    for (const word of words) {
      if (word !== this.parseRule.endOfRequest) {
        newArr.push(` ${word} `);
        newArr.push(` ${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)} `);
      } else {
        newArr.push(word);
      }
    }
    return newArr;
  }
}

type Extracted =
  | {
      values: string[];
      content: string;
      fails: false;
    }
  | { fails: true };

type ParsedRequest = {
  add: {
    targets: string[];
    place: string;
  };
  watch: {
    targets: string[];
    place: string;
  };
};
