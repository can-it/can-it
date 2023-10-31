import RiGenerator from '../types/ri-generator';
import RiPattern from '../types/ri-pattern';

export default class NestedRiGenerator implements RiGenerator {
  constructor(
    private riPattern: RiPattern
  ) {
  }
  
  generate(ris: string[]) {
    return ris.join(this.riPattern.separator);
  }
}
