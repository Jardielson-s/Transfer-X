export interface IUseCase<I, O> {
  execute: (...agrs: I[]) => Promise<O>;
}
