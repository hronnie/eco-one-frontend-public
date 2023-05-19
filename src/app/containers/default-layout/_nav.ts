import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
    {
        name: $localize`Dashboard`,
        url: '/dashboard',
        iconComponent: {name: 'cil-speedometer'},
        badge: {
            color: 'info',
            text: $localize`NEW`
        }
    }
];
