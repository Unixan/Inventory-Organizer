const model = {
    html: {
        appDiv: document.getElementById('app')
    },
    consumables: [
        {
            name: 'Waterbottle',
            IMG: 'someimage',
            icon: 'someicon',
            id: 01,
            quality: 'common',
            value: 20,
            HP: 20,
            description: 'A cool, clear bottle of water.'
        },
        {
            name: 'Stale loaf of bread',
            IMG: 'someimage',
            icon: 'someicon',
            id: 02,
            quality: 'common',
            value: 30,
            HP: 10,
            description: 'Not very apetizing, but atleast its edable.'
        },
        {
            name: 'Roasted leg of wolf',
            IMG: 'someimage',
            icon: 'someicon',
            id: 03,
            quality: 'uncommon',
            value: 60,
            HP: 50,
            description: 'A fitting meal for a ruthless warrior.'
        },
        {
            name: 'Rotten flesh',
            IMG: 'someimage',
            icon: 'someicon',
            id: 04,
            quality: 'poor',
            value: 0,
            hp: -10,
            description: "Rotten meat beyond any kind of recognition. What animal is this from? Are you sure it's animal at all? Only the bravest will dare eat this."
        }
    ],
    Weapons: [
        {
            name: 'The Letteropener',
            IMG: 'someimage',
            icon: 'someicon',
            id: 11,
            quality: 'poor',
            value: 10,
            bonusDamage: 6,
            description: "Better than bare hands... Maybe..... Hey at least its sharp... ish...",
        },
        {
            name: 'The Smasher',
            IMG: 'someimage',
            icon: 'someicon',
            id: 12,
            quality: 'common',
            value: 20,
            bonusDamage: 10,
            description: "A common mace. Packs quite a punch, but clumsy to swing",
        }
    ],
    Armor: [
        {
            name: 'Tiny Tee',
            IMG: 'someimage',
            icon: 'someicon',
            id: 21,
            quality: 'poor',
            value: 5,
            bonusArmor: 1,
            description: "A tiny, torn t-shirt. Better than being naked, but not by much",
        }
    ],
    inventory:{
        isOpen: false,
        contents:[],
    },


}
