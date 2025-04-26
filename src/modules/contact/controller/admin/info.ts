import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ContactInfoEntity } from '../../entity/info';
import { ContactInfoService } from '../../service/info';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

/**
 * 联系人信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ContactInfoEntity,
  service: ContactInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.company', 'a.position'],
    fieldEq: ['a.phone', 'a.email'],
    fieldLike: [
      { column: 'a.name', requestParam: 'name' },
      { column: 'a.company', requestParam: 'company' },
      { column: 'a.position', requestParam: 'position' },
    ],
    where: async ctx => {
      const { createTimeStart, createTimeEnd, path } = ctx.request.body;
      const where = [];
      if (createTimeStart) {
        where.push(['a.createTime >= :createTimeStart', { createTimeStart }]);
      }
      if (createTimeEnd) {
        where.push(['a.createTime <= :createTimeEnd', { createTimeEnd }]);
      }
      if (path && path.length > 0) {
        where.push(['a.path IN (:path)', { path }]);
      }
      return where;
    },
    join: [
      {
        entity: BaseSysUserEntity,
        alias: 'b',
        condition: 'a.createBy = b.id',
      },
    ],
    select: [
      'a.*',
      'b.name as createByName',
    ],
  },
})
export class AdminContactInfoController extends BaseController {
  @Inject()
  contactInfoService: ContactInfoService;
}