export interface Comparator {
  isAllowed(requestCode: string, permissionCode: string): boolean;
  isDenied(requestCode: string, permissionCode: string): boolean;
}
