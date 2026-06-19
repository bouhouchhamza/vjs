export declare class JsonStore<T> {
    private readonly filePath;
    constructor(fileName: string);
    read(fallback: T): T;
    write(value: T): void;
}
