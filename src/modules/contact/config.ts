import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '联系人模块',
    // 模块描述
    description: '用于管理联系人信息',
    // 中间件，只对本模块有效
    middlewares: [],
    // 全局中间件
    globalMiddlewares: [],
  } as ModuleConfig;
};