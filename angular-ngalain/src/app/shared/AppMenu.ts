import { Menu } from '@delon/theme';

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
                    text: '快捷菜单',
                    i18n: 'menu.shortcut',
                    icon: { type: 'icon', value: 'rocket' },
                    shortcutRoot: true
                }
            ]
        }
    ];
}
