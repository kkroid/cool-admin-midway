import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfoEntity } from '../entity/info';
import { CoolCommException } from '@cool-midway/core';

/**
 * 联系人信息
 */
@Provide()
export class ContactInfoService extends BaseService {
  @InjectEntityModel(ContactInfoEntity)
  contactInfoEntity: Repository<ContactInfoEntity>;
}
