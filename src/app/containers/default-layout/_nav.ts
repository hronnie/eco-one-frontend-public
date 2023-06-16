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
        title: true,
        name: 'Mailchimp'
    },
    {
        name: 'Szinkronizálás',
        url: '/sync',
        iconComponent: { name: 'cil-sync'},
    },
];
