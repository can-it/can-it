export interface Action<Type = string, Payload = Record<string, unknown>> {
  type: Type;
  payload?: Payload;
}
