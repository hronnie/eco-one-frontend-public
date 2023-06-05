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
        name: 'Alapadatok',
        url: '/student',
        iconComponent: { name: 'cil-address-book'},
    },
    {
        name: 'Fokozatok',
        url: '/completed-training',
        iconComponent: { name: 'cil-calendar-check'},
    },
    {
        title: true,
        name: 'Tanfolyamok'
    },

    {
        name: 'Tanfolyamok felvitele',
        url: '/fill-training',
        iconComponent: { name: 'cil-cloud-upload'},
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
