// Brawlhalla Legends Data
export interface Legend {
    id: string;
    name: string;
    weapons: [string, string];
    stats: {
        strength: number;
        dexterity: number;
        defense: number;
        speed: number;
    };
}

export const legends: Legend[] = [
    { id: 'bodvar', name: 'Bödvar', weapons: ['Sword', 'Hammer'], stats: { strength: 6, dexterity: 6, defense: 5, speed: 5 } },
    { id: 'cassidy', name: 'Cassidy', weapons: ['Hammer', 'Blasters'], stats: { strength: 6, dexterity: 8, defense: 4, speed: 4 } },
    { id: 'orion', name: 'Orion', weapons: ['Spear', 'Lance'], stats: { strength: 4, dexterity: 6, defense: 6, speed: 6 } },
    { id: 'vraxx', name: 'Lord Vraxx', weapons: ['Blasters', 'Lance'], stats: { strength: 4, dexterity: 8, defense: 4, speed: 6 } },
    { id: 'gnash', name: 'Gnash', weapons: ['Hammer', 'Spear'], stats: { strength: 7, dexterity: 3, defense: 5, speed: 7 } },
    { id: 'nai', name: 'Queen Nai', weapons: ['Spear', 'Katars'], stats: { strength: 7, dexterity: 4, defense: 8, speed: 3 } },
    { id: 'hattori', name: 'Hattori', weapons: ['Sword', 'Spear'], stats: { strength: 4, dexterity: 6, defense: 4, speed: 8 } },
    { id: 'thatch', name: 'Thatch', weapons: ['Sword', 'Blasters'], stats: { strength: 8, dexterity: 5, defense: 3, speed: 6 } },
    { id: 'ada', name: 'Ada', weapons: ['Blasters', 'Spear'], stats: { strength: 6, dexterity: 7, defense: 3, speed: 6 } },
    { id: 'scarlet', name: 'Scarlet', weapons: ['Hammer', 'Lance'], stats: { strength: 8, dexterity: 5, defense: 5, speed: 4 } },
    { id: 'teros', name: 'Teros', weapons: ['Axe', 'Hammer'], stats: { strength: 8, dexterity: 3, defense: 6, speed: 5 } },
    { id: 'brynn', name: 'Brynn', weapons: ['Axe', 'Spear'], stats: { strength: 5, dexterity: 5, defense: 5, speed: 7 } },
    { id: 'asuri', name: 'Asuri', weapons: ['Katars', 'Sword'], stats: { strength: 7, dexterity: 4, defense: 4, speed: 7 } },
    { id: 'barraza', name: 'Barraza', weapons: ['Axe', 'Blasters'], stats: { strength: 6, dexterity: 4, defense: 8, speed: 4 } },
    { id: 'koji', name: 'Koji', weapons: ['Sword', 'Bow'], stats: { strength: 5, dexterity: 8, defense: 3, speed: 6 } },
    { id: 'diana', name: 'Diana', weapons: ['Bow', 'Blasters'], stats: { strength: 5, dexterity: 6, defense: 5, speed: 6 } },
    { id: 'val', name: 'Val', weapons: ['Sword', 'Gauntlets'], stats: { strength: 4, dexterity: 6, defense: 5, speed: 7 } },
    { id: 'lucien', name: 'Lucien', weapons: ['Katars', 'Blasters'], stats: { strength: 4, dexterity: 6, defense: 6, speed: 6 } },
    { id: 'mirage', name: 'Mirage', weapons: ['Scythe', 'Spear'], stats: { strength: 6, dexterity: 6, defense: 4, speed: 6 } },
    { id: 'wu-shang', name: 'Wu Shang', weapons: ['Gauntlets', 'Spear'], stats: { strength: 5, dexterity: 7, defense: 5, speed: 5 } },
    { id: 'ragnir', name: 'Ragnir', weapons: ['Axe', 'Katars'], stats: { strength: 5, dexterity: 6, defense: 5, speed: 6 } },
];

export const getLegendById = (id: string): Legend | undefined => {
    return legends.find(l => l.id === id);
};

export const getLegendByName = (name: string): Legend | undefined => {
    return legends.find(l => l.name.toLowerCase() === name.toLowerCase());
};

export const getLegendsWithWeapon = (weapon: string): Legend[] => {
    return legends.filter(l =>
        l.weapons.some(w => w.toLowerCase() === weapon.toLowerCase())
    );
};
