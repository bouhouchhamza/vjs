declare module 'bcryptjs' {
  export function compareSync(password: string, hash: string): boolean;
  export function hashSync(password: string, salt: number): string;
}
