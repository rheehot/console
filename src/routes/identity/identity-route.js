const Identity = () => import('@/views/identity/Identity');
const IdentityNavBar = () => import('@/views/identity/IdentityNavBar');
const User = () => import('@/views/identity/user/User');
const Project = () => import('@//views/identity/project/Project');

export default {
    path: 'identity',
    name: 'identity',
    redirect: '/identity/project',
    meta: { label: 'Identity', breadcrumb: true },
    components: {
        lnb: IdentityNavBar,
        main: Identity,
    },
    children: [
        {
            path: 'project',
            name: 'project',
            meta: { label: 'Project', breadcrumb: true },
            component: Project,
        },
        {
            path: 'user',
            name: 'user',
            meta: { label: 'User', breadcrumb: true },
            component: User,
        },
    ],
};
