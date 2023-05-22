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
        url: '/student',
        iconComponent: { name: 'cil-address-book'},
    },
    {
        title: true,
        name: 'Tanfolyamok'
    },
    {
        name: 'Elvégzett tanfolyamok',
        url: '/completed-training',
        iconComponent: { name: 'cil-calendar-check'},
    },
    {
        name: 'Email sablonok',
        url: '/email-template',
        iconComponent: { name: 'cil-envelope-closed'},
    },
    {
        name: 'Meghívók küldése',
        url: '/invitation',
        iconComponent: { name: 'cil-send'},
    },
];
