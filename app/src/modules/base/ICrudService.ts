export default interface ICrudService<DTO, T> {
  get(): Promise<T[]>
  getById(id: number): Promise<T>
  create(dto: DTO): Promise<T>
  update(dto: DTO): Promise<T>
  delete(id: number): Promise<any>
}
