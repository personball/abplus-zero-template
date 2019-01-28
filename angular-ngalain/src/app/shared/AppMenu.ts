import { Menu } from '@delon/theme';
import { ACLCanType, ACLType } from '@delon/acl';

// 全局的左侧导航菜单
// Tips 对于单页应用，菜单配置和UI上的本地化配置建议在前端这边管理，不依赖后端（但是权限定义必须依赖后端）
export class AppMenu {
    static Menus: Menu[] = [
        {
            text: '主导航',
            i18n: 'menu.main',
            group: true,
            children: [
                {
                    text: '仪表盘',
                    i18n: 'menu.dashboard',
                    link: '/dashboard',
                    icon: { type: 'icon', value: 'appstore' }
                },
                {
                    text: '设置',
                    i18n: 'menu.setting',
                    icon: { type: 'icon', value: 'appstore' },
                    children: [
                        {
                            text: '用户',
                            i18n: 'menu.setting.users',
                            link: '/setting/users',
                            icon: { type: 'icon', value: 'appstore' },
                            acl: <ACLType>{ ability: ['Pages.Users'] }
                        },
                        {
                            text: '角色',
                            i18n: 'menu.setting.roles',
                            link: '/setting/roles',
                            icon: { type: 'icon', value: 'appstore' },
                            acl: <ACLType>{ ability: ['Pages.Roles'] }
                        },
                        {
                            text: '租户',
                            i18n: 'menu.setting.tenants',
                            link: '/setting/tenants',
                            icon: { type: 'icon', value: 'appstore' },
                            acl: <ACLType>{ ability: ['Pages.Tenants'] }
                        }
                    ]
                },
                {
                    text: '快捷菜单',
                    i18n: 'menu.shortcut',
                    icon: { type: 'icon', value: 'rocket' },
                    shortcutRoot: true
                },
                // {
                //     text: '测试菜单ACL',
                //     i18n: 'menu.test.menu.acl',
                //     icon: { type: 'icon', value: 'rocket' },
                //     shortcut: true
                // }
            ]
        }
    ];
}
