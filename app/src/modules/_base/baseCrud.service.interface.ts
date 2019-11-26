export default interface BaseCrudServiceInterface<DTO, T> {
  get (params?: any): Promise<T[]> // TODO: Type this
  getById (id: string): Promise<T>
  create (dto: DTO): Promise<T>
  update (dto: DTO): Promise<T>
  delete (id: string): Promise<any>
}
