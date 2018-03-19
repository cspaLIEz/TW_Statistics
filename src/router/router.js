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
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/index',
        icon: 'home',
        name: 'index',
        title: '系统首页',
        component: Main,
        children: [
            { path: 'index', title: '系统首页', name: 'index', redirect:"/home" }
        ]
    },
    {
        path: '/program',
        icon: 'ios-paper',
        name: 'program',
        title: '节目管理',
        component: Main,
        children: [
            { path: 'build', title: '节目制作', name: 'program_build', icon:'hammer', component: () => import('@/views/program/build/build.vue') },
            { path: 'lists', title: '节目列表', name: 'program_lists', icon: 'ios-list-outline', component: () => import('@/views/program/lists/lists.vue') },
            { path: 'approval', title: '节目审批', name: 'program_approval', icon: 'funnel', component: () => import('@/views/program/approval/approval.vue') },
            { path: 'broadcast', title: '插播消息', name: 'program_broadcast', icon: 'monitor', component: () => import('@/views/program/broadcast/broadcast.vue') }
        ]
    },
    {
        path: '/release',
        icon: 'ios-paperplane',
        name: 'release',
        title: '发布管理',
        component: Main,
        children: [
            { path: 'schedule', title: '发布日程', name: 'release_build', icon:'ios-calendar', component: () => import('@/views/release/schedule/schedule.vue') },
            { path: 'approval', title: '发布审批', name: 'release_lists', icon: 'compose', component: () => import('@/views/release/approval/approval.vue') },
            { path: 'lists', title: '发布列表', name: 'release_approval', icon: 'android-list', component: () => import('@/views/release/lists/lists.vue') }
        ]
    },
    {
        path: '/terminal',
        icon: 'android-desktop',
        name: 'terminal',
        title: '终端管理',
        component: Main,
        children: [
            { path: 'information', title: '终端注册', name: 'terminal_information', icon:'information-circled', component: () => import('@/views/terminal/information/information.vue') },
            { path: 'state', title: '终端状态', name: 'terminal_state', icon:'ios-pulse', component: () => import('@/views/terminal/state/state.vue') },
            { path: 'control', title: '终端控制', name: 'terminal_control', icon:'mouse', component: () => import('@/views/terminal/control/control.vue') }
        ]
    },
    {
        path: '/resources',
        icon: 'social-buffer',
        name: 'resources',
        title: '资源管理',
        component: Main,
        children: [
            { path: 'material', title: '素材', name: 'resources_material', icon:'filing', component: () => import('@/views/resources/material/material.vue') },
            { path: 'template', title: '模板', name: 'resources_template', icon:'document-text', component: () => import('@/views/resources/template/template.vue') }
        ]
    },
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
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
