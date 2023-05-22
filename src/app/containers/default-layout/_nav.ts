import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
    {
        name: $localize`Kezdőlap`,
        url: '/dashboard',
        iconComponent: {name: 'cil-speedometer'}
    },
    {
        title: true,
        name: 'Tanítványok'
    },
    {
        name: 'Tanítványok',
        url: '/smart-table',
        iconComponent: { name: 'cil-address-book'},
    },
    {
        title: true,
        name: 'Tanfolyamok'
    },
    {
        name: 'Email sablonok',
        url: '/smart-table',
        iconComponent: { name: 'cil-envelope-closed'},
    },
    {
        name: 'Meghívók küldése',
        url: '/smart-table',
        iconComponent: { name: 'cil-send'},
    },
];
