export abstract class AbstractService {
  public abstract execute(...data: unknown[]): Promise<unknown>;
}
