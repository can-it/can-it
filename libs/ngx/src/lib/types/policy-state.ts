import { Permission } from './permission';

export default interface PolicyState {
  allow: Permission[];
  deny?: Permission[];
}
