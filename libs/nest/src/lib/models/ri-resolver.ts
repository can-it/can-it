export class RiResolver {
  constructor(private resolver: (req: unknown) => string) {}

  execute(req: unknown) {
    return this.resolver(req);
  }
}
