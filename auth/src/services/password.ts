import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(key: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(key, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(key: string, keyCompare: string) {
    const [hash, salt] = key.split(".");
    const buffer = (await scryptAsync(keyCompare, salt, 64)) as Buffer;

    return buffer.toString("hex") === hash;
  }
}
