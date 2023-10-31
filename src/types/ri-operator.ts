export default interface RiOperator {
  isMatch(reqRi: string, permRi: string): boolean;
}
