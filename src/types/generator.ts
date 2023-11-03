export interface Generator {
  transform(ris: string | string[]): string;
}
