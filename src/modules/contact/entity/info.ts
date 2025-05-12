import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 联系人信息
 */
@Entity('contact_info')
export class ContactInfoEntity extends BaseEntity {
  @Column({ comment: '姓名', length: 50, nullable: false })
  name: string;

  @Column({ comment: '公司', length: 100, nullable: true })
  company: string;

  @Column({ comment: '职位', length: 50, nullable: true })
  position: string;

  @Column({ comment: '电话', length: 30, nullable: true })
  phone: string;

  @Column({ comment: '邮箱', length: 120, nullable: true })
  email: string;

  @Column({ comment: '其他信息', type: 'text', nullable: true })
  misc: string;

  @Column({ comment: '路径', type: 'text', nullable: true })
  path: string[];

  @Column({ comment: '路径', type: 'text', nullable: true })
  remark: string[];
}
