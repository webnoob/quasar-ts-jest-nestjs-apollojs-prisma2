import { injectable } from 'inversify-props'

import BaseApolloCrudService from './baseApolloCrud.service'

@injectable()
export default abstract class BaseCrudService<DTO, T> extends BaseApolloCrudService<DTO, T> {
}
