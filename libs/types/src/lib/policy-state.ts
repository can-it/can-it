export type Permission = [action: string, resourceIdentity: string];

export interface PolicyState {
  allow: Permission[],
  deny?: Permission[]
}
