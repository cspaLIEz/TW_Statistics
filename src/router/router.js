import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

// 节目制作
// export const build = {
//     path: '/build',
//     name: 'build',
//     component: () => import('@/views/build/index.vue')
// };
// 节目制作预览
// export const buildpreview = {
//     path: '/buildpreview',
//     name: 'buildpreview',
//     component: () => import('@/views/build/preview.vue')
// };

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        // { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/main/switch/switch.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/switch',
        icon: 'power',
        name: 'index',
        title: '全局开关',
        component: Main,
        children: [
            { path: '/home', title: '全局开关', name: 'home_index', icon: 'power', component: () => import('@/views/main/switch/switch.vue') }
        ]
    },
    /*{
        path: '/program',
        icon: 'ios-paper',
        name: 'program',
        title: '饰品数量监控',
        component: Main,
        children: [
            // { path: 'build', title: '节目制作', name: 'program_build', icon:'hammer', redirect: '/build'},
            // { path: 'lists', title: '节目列表', name: 'program_lists', icon: 'ios-list-outline', component: () => import('@/views/program/lists/lists.vue') },
            // { path: 'approval', title: '节目审批', name: 'program_approval', icon: 'funnel', component: () => import('@/views/program/approval/approval.vue') },
            { path: '/monitor', title: '饰品数量监控', name: 'stock_monitor', icon: 'monitor', component: () => import('@/views/main/monitor/monitor.vue') }
        ]
    },
    {
        path: '/release',
        icon: 'ios-paperplane',
        name: 'release',
        title: '推荐位',
        component: Main,
        children: [
            { path: '/recommend', title: '推荐位', name: 'release_build', icon:'ios-calendar', component: () => import('@/views/main/recommend/recommend.vue') }
        //     { path: 'approval', title: '发布审批', name: 'release_lists', icon: 'compose', component: () => import('@/views/release/approval/approval.vue') },
        //     { path: 'lists', title: '发布列表', name: 'release_approval', icon: 'android-list', component: () => import('@/views/release/lists/lists.vue') }
        ]
    },
    {
        path: '/terminal',
        icon: 'android-desktop',
        name: 'terminal',
        title: '套装管理',
        component: Main,
        children: [
            { path: '/suit', title: '套装管理', name: 'terminal_information', icon:'information-circled', component: () => import('@/views/main/suit/suit.vue') }
            // { path: 'state', title: '终端状态', name: 'terminal_state', icon:'ios-pulse', component: () => import('@/views/terminal/state/state.vue') },
            // { path: 'control', title: '终端控制', name: 'terminal_control', icon:'mouse', component: () => import('@/views/terminal/control/control.vue') }
        ]
    },
    {
        path: '/resources',
        icon: 'social-buffer',
        name: 'resources',
        title: '装备管理',
        component: Main,
        children: [
            { path: '/equipment', title: '装备管理', name: 'resources_material', icon:'filing', component: () => import('@/views/main/equipment/equipment.vue') }
            // { path: 'template', title: '模板', name: 'resources_template', icon:'document-text', component: () => import('@/views/resources/template/template.vue') }
        ]
    }
    {
        path: '/journal',
        icon: 'ios-paper-outline',
        name: 'journal',
        title: '日志管理',
        component: Main,
        children: [
            { path: 'handle', title: '操作日志', name: 'journal_handle', icon: 'ios-cog', component: () => import('@/views/journal/handle/handle.vue') },
            { path: 'broadcast-message', title: '插播消息日志', name: 'journal_broadcast-message', icon: 'ios-pricetags', component: () => import('@/views/journal/broadcast-message/broadcast-message.vue') }
        ]
    },
    {
        path: '/systems',
        icon: 'wrench',
        name: 'systems',
        title: '系统管理',
        component: Main,
        children: [
            { path: 'organization', title: '机构管理', name: 'systems_organization', icon: 'podium', component: () => import('@/views/systems/organization/organization.vue') },
            { path: 'role', title: '角色管理', name: 'systems_role', icon: 'android-options', component: () => import('@/views/systems/role/role.vue') },
            { path: 'user', title: '用户管理', name: 'systems_user', icon: 'ios-people', component: () => import('@/views/systems/user/user.vue') },
            { path: 'parameter', title: '系统参数', name: 'systems_parameter', icon: 'ios-settings', component: () => import('@/views/systems/parameter/parameter.vue') }
        ]
    }*/
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    // build,
    // buildpreview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
