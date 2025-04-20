export interface IRepository<I, O> {
  create: (...args: I[]) => Promise<O>;
  findById: (id: string) => Promise<O>;
}
