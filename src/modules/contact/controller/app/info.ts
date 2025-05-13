import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ContactInfoEntity } from '../../entity/info';
import { ContactInfoService } from '../../service/info';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

/**
 * 联系人信息
 */
@CoolController({
  api: ['add', 'update', 'info', 'list', 'page'],
  entity: ContactInfoEntity,
  service: ContactInfoService,
  pageQueryOp: {
    // 1. 自定义 where
    where: async (ctx) => {
      const { search } = ctx.request.body;
      // console.log('search', search);
      // 如果 search 为空或仅包含空格，直接返回空数组
      if (search == undefined || !search || !search.trim()) {
        return [['1 = 0']];
      }
      const where = [];

      if (search && search.trim()) {
        // 按空格分割关键词
        const tokens = search.split(' ').filter(s => s.trim() !== '');

        // 遍历关键词，生成查询条件
        tokens.forEach((token, idx) => {
          const nameKey = `nameKw${idx}`;
          const companyKey = `companyKw${idx}`;
          const positionKey = `positionKw${idx}`;
          const phoneKey = `phoneKw${idx}`;
          const emailKey = `emailKw${idx}`;
          const miscKey = `miscKw${idx}`;
          const pathKey = `pathKw${idx}`;
          const remarkKey = `remarkKw${idx}`;

          where.push([
            '(a.name LIKE :' + nameKey +
            ' OR a.company LIKE :' + companyKey +
            ' OR a.position LIKE :' + positionKey +
            ' OR a.phone LIKE :' + phoneKey +
            ' OR a.email LIKE :' + emailKey +
            ' OR a.misc LIKE :' + miscKey +
            ' OR a.path LIKE :' + pathKey +
            ' OR a.remark LIKE :' + remarkKey + ')',
            {
              [nameKey]: `%${token}%`,
              [companyKey]: `%${token}%`,
              [positionKey]: `%${token}%`,
              [phoneKey]: `%${token}%`,
              [emailKey]: `%${token}%`,
              [miscKey]: `%${token}%`,
              [pathKey]: `%${token}%`,
              [remarkKey]: `%${token}%`,
            },
          ]);
        });
      }
      // console.log('where', where);
      return where;
    },
  },
})
export class ContactInfoController extends BaseController {
  @Inject()
  contactInfoService: ContactInfoService;

  // 覆盖父类的 page 方法
  async page(): Promise<{ code: number; message: string; data?: any;}> {
    const ctx = this.baseCtx; // 使用父类提供的上下文
    const { search } = ctx.request.body as { search?: string };

    // 如果 search 为空或仅包含空格，直接返回空结果
    if (search == undefined || !search || !search.trim()) {
      return {
        "code": 1000,
        "message": "success",
        "data":
        {
            "list": [],
            "pagination":
            {
                "page": 1,
                "size": 20,
                "total": 0
            }
        }
    };
    }

    // 调用父类的分页逻辑
    const result = await super.page();
    return result;
  }
}
