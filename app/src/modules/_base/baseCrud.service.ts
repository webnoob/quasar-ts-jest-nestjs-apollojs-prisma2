import { injectable } from 'inversify-props'

import BaseApolloCrudService from './apollo/baseApolloCrud.service'

@injectable()
export default abstract class BaseCrudService<DTO, T> extends BaseApolloCrudService<DTO, T> {
}
