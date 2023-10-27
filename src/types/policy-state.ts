export type Permission = [action: string, resourceIdentity: string];

export default interface PolicyState {
  allow: Permission[],
  deny?: Permission[]
}
