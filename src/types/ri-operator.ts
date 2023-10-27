export default interface RiOperator {
  isMatch(reqRi: string, permRi: string): boolean;
  generate(ris: string | string[]): string;
}
