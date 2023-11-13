import { Comparator } from '@can-it/types';

export class ExactComparator implements Comparator {
  isAllowed(requestCode: string, permissionCode: string) {
    return requestCode === permissionCode;
  }

  isDenied(requestCode: string, permissionCode: string): boolean {
    return this.isAllowed(requestCode, permissionCode);
  }
}
