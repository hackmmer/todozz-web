import { ThemeEnum } from './../enums/storage';
import { random } from 'lodash';
import { ThemeString } from '../enums/storage';

export class Helper {

  static createToken(seed: string, randomSeed?: number) {
    const len = seed.length;
    const split = seed?.replace(' ', seed[random(0, len)]);
    randomSeed = randomSeed ?? new Date().getTime();
    const randomValue = random(1, randomSeed);
    return `${split.toLowerCase()}${
      seed.split('')[random(0, len)]
    }${randomValue}`;
  }

  static toThemeEnum(theme: ThemeString) {
    switch (theme) {
      case 'dark-blue':
        return ThemeEnum['dark-blue'];
      case 'dark-red':
        return ThemeEnum['dark-red'];
      case 'light-blue':
        return ThemeEnum['light-blue'];
      case 'light-red':
        return ThemeEnum['light-red'];
      default:
        return ThemeEnum['light-blue'];
    }
  }
}
