import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export class JsonStore<T> {
  private readonly filePath: string;

  constructor(fileName: string) {
    this.filePath = join(process.cwd(), 'src', 'data', fileName);
  }

  read(fallback: T): T {
    if (!existsSync(this.filePath)) {
      return fallback;
    }

    return JSON.parse(readFileSync(this.filePath, 'utf8')) as T;
  }

  write(value: T): void {
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  }
}
