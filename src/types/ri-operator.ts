export interface RiOperator {
  isMatch(reqRi: string, permRi: string): boolean;
}
