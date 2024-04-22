import assert from 'node:assert';

interface Config {
  decimals: number;
}

/**
 * Class Shorten Int
 */
export default class ShortenInt {
  /**
   * Contains the info about current value
   */
  private val: BigInt;

  constructor(value: number | string | BigInt | ShortenInt) {
    if (typeof value === 'number') {
      this.parseNumberValue(value);
    } else if (typeof value === 'string') {
      this.parseStringValue(value);
    } else if (value instanceof BigInt) {
      this.parseBigIntValue(value);
    } else if (value instanceof ShortenInt) {
      this.val = value.val;
    } else {
      throw new Error(
        'Value is not valid. Check documentation to work with ShortenInt correctly',
      );
    }
  }

  private parseNumberValue(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error('Value should be integer');
    }

    this.val = BigInt(value);
  }

  private parseStringValue(value: string): void {}

  private parseBigIntValue(value: BigInt): void {
    this.val = value;
  }

  public toString(): string {
    let str = this.val.toString();

    let prefix = '';
    if (str[0] === '-') {
      str = str.slice(1, str.length);
      prefix = '-';
    }

    let suffix = '';
    const len = str.length;
    switch (true) {
      case len <= 3:
        break;
      case len <= 6:
        suffix = 'K';
        str = this.buildString(str, 3);
        break;
      case len <= 9:
        suffix = 'M';
        str = this.buildString(str, 6);
        break;
    }
    return prefix + str + suffix;
  }

  private buildString(str: string, pos: number): string {
    const dotPos = str.length - pos;
    let tmp = str.slice(0, dotPos);
    // Check after dot
    if (Number(str.slice(dotPos, dotPos + ShortenInt.config.decimals)) > 0) {
      tmp += '.' + str.slice(dotPos, dotPos + ShortenInt.config.decimals);
    }
    return tmp;
  }

  static config = {
    decimals: 1,
  };

  static setConfig(config: Config): void {
    // Validate
    if (config.decimals > 3 || config.decimals < 0) {
      throw new Error('Config.decimals should be in range of [0, 3]');
    }

    // Merge
    ShortenInt.config.decimals = config.decimals;
  }
}
