import { Inject, Get, Query } from '@midwayjs/core';
import { CoolController, BaseController, CoolTag, TagTypes } from '@cool-midway/core';
import { LinkInfoEntity } from '../../entity/link';
import { LinkInfoService as LinkInfoService } from '../../service/link';

/**
 * 链接
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: LinkInfoEntity,
  service: LinkInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name', 'a.url'],
    fieldEq: ['a.name'],
    select: ['a.*'],
  },
})
export class AppLinkInfoController extends BaseController {
  @Inject()
  linkInfoService: LinkInfoService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getLink', { summary: '测试接口' })
  async getLink(@Query() link: string) {
    return this.linkInfoService.info(1);
  }
}
