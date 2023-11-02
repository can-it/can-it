export interface ActionOperator {
  isMatch(reqAction: string, permAction: string): boolean;
}
