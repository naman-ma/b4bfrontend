import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'icon-home'
  },
  {
    name: 'Settings',
    url: '/admin/settings',
    icon: 'icon-settings',
    children: [
      {
        name: 'General Settings',
        url: '/admin/settings/general',
        icon: 'icon-plus',
      },
      {
        name: 'Email Settings',
        url: '/admin/settings/email',
        icon: 'icon-envelope-letter',
      },
    ]
  },
  {
    name: 'Platform Management',
    url: '/admin/platform',
    icon: 'icon-people'
  },
  {
    name: 'User Management',
    url: '/admin/user/list',
    icon: 'icon-user'
  },
  {
    name: 'Category Management',
    url: '/admin/category/list',
    icon: 'icon-cursor'
  },
];
