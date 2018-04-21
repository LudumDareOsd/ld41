export class Util {
  public static getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  public static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}