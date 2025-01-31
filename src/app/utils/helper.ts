import { random } from 'lodash';

export class Helper {
  static createToken(seed: string, randomSeed?: number) {
    const chars = '~/-+*&^%$#$!@';
    const len = '~/-+*&^%$#$!@'.length - 1;
    const split = seed?.replace(' ', chars.split('')[random(0, len)]);
    randomSeed = randomSeed ?? new Date().getTime();
    const randomValue = random(1, randomSeed);
    return `${split.toLowerCase()}${
      chars.split('')[random(0, len)]
    }${randomValue}`;
  }
}
