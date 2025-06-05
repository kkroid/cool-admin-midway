import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 链接信息
 */
@Entity('link_info')
export class LinkInfoEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '名称', length: 200 })
  name: string;

  @Column({ comment: '链接地址', length: 500 })
  url: string;
}
