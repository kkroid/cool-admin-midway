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

  /**
   * 电话号码验证
   * @param phone
   */
  async validatePhoneNumber(phone: string) {
    if (!/^\d{3,4}-\d{7,8}$/.test(phone)) {
      throw new CoolCommException('电话号码格式不正确，请使用区号-号码格式');
    }
  }

  /**
   * 邮箱验证
   * @param email
   */
  async validateEmail(email: string) {
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      throw new CoolCommException('邮箱格式不正确');
    }
  }

  async add(param: ContactInfoEntity): Promise<Object> {
    if (param.phone) {
      await this.validatePhoneNumber(param.phone);
    }
    if (param.email) {
      await this.validateEmail(param.email);
    }
    return await super.add(param);
  }

  async update(param: ContactInfoEntity): Promise<void> {
    if (param.phone) {
      await this.validatePhoneNumber(param.phone);
    }
    if (param.email) {
      await this.validateEmail(param.email);
    }
    await super.update(param);
  }
}