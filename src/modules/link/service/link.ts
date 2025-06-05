import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { LinkInfoEntity } from '../entity/link';

/**
 * 链接服务
 */
@Provide()
export class LinkInfoService extends BaseService {
  @InjectEntityModel(LinkInfoEntity)
  linkInfoEntity: Repository<LinkInfoEntity>;

  /**
   * 确保eps会更新写的假的接口
   */
  async info(id: number): Promise<LinkInfoEntity> {
    // 创建一个空的LinkInfoEntity对象
    const test = new LinkInfoEntity();
    test.id = id;
    test.name = '测试链接';
    test.url = 'https://example.com/test';
    return test;
  }
}
