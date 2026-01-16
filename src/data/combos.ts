// Brawlhalla Combo Data - Real combos with actual notation
export interface Combo {
    id: string;
    name: string;
    legend: string;
    weapon: string;
    inputs: string[];
    damage: number;
    difficulty: 'easy' | 'medium' | 'hard';
    isTrueCombo: boolean;
    notes: string;
    videoUrl?: string;
}

export const combos: Combo[] = [
    // SWORD COMBOS
    {
        id: 'sword-1',
        name: 'Sword Basic Starter',
        legend: 'Bodvar',
        weapon: 'Sword',
        inputs: ['Dlight', 'Sair'],
        damage: 22,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fundamental sword combo. Works at all health percentages. Great for learning sword spacing.'
    },
    {
        id: 'sword-2',
        name: 'Sword Ladder',
        legend: 'Hattori',
        weapon: 'Sword',
        inputs: ['Dlight', 'Nair', 'Nair', 'Recovery'],
        damage: 38,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'String combo. Second Nair is a read. Chase dodge up between Nairs.'
    },
    {
        id: 'sword-3',
        name: 'Sword Edge Guard',
        legend: 'Koji',
        weapon: 'Sword',
        inputs: ['Dlight', 'Dair'],
        damage: 24,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Use near edge for gimps. Dair spikes at high damage.'
    },

    // HAMMER COMBOS
    {
        id: 'hammer-1',
        name: 'Hammer Bread and Butter',
        legend: 'Bodvar',
        weapon: 'Hammer',
        inputs: ['Dlight', 'Sair'],
        damage: 28,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'The most fundamental hammer combo. Jump cancel the Dlight into Sair.'
    },
    {
        id: 'hammer-2',
        name: 'Hammer Russian Mafia',
        legend: 'Teros',
        weapon: 'Hammer',
        inputs: ['Dlight', 'Jump', 'Nair', 'Groundpound'],
        damage: 45,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Iconic hammer string. The GP is a read on dodge in. High risk, high reward.'
    },
    {
        id: 'hammer-3',
        name: 'Hammer Recovery Gimp',
        legend: 'Gnash',
        weapon: 'Hammer',
        inputs: ['Sair', 'Recovery'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Works at kill percent. Use offstage for early kills.'
    },

    // SPEAR COMBOS
    {
        id: 'spear-1',
        name: 'Spear True Combo',
        legend: 'Orion',
        weapon: 'Spear',
        inputs: ['Dlight', 'Sair'],
        damage: 18,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic spear starter. Confirm into Sair on hit.'
    },
    {
        id: 'spear-2',
        name: 'Spear Helicopter',
        legend: 'Brynn',
        weapon: 'Spear',
        inputs: ['Dlight', 'Nair', 'Recovery'],
        damage: 30,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Classic spear string. The Recovery is a read.'
    },

    // GAUNTLETS COMBOS
    {
        id: 'gauntlets-1',
        name: 'Gauntlets Ground Combo',
        legend: 'Val',
        weapon: 'Gauntlets',
        inputs: ['Dlight', 'Dlight', 'Nair'],
        damage: 26,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Requires gravity cancel on second Dlight. Tight timing window.'
    },
    {
        id: 'gauntlets-2',
        name: 'Gauntlets Zero to Death',
        legend: 'Wu Shang',
        weapon: 'Gauntlets',
        inputs: ['Slight', 'Dlight', 'Jump', 'Dlight', 'Nair', 'Recovery'],
        damage: 52,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Extended gauntlets string. Requires fast inputs and chase dodge reads.'
    },

    // KATARS COMBOS
    {
        id: 'katars-1',
        name: 'Katars Punish Combo',
        legend: 'Lucien',
        weapon: 'Katars',
        inputs: ['Dlight', 'Nair'],
        damage: 20,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fast punish option. Great for whiff punishing.'
    },
    {
        id: 'katars-2',
        name: 'Katars Extended String',
        legend: 'Asuri',
        weapon: 'Katars',
        inputs: ['Slight', 'Dlight', 'Nair', 'Recovery'],
        damage: 38,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Requires tight spacing and dodge reads. Practice the Nair timing.'
    },

    // BOW COMBOS
    {
        id: 'bow-1',
        name: 'Bow Approach',
        legend: 'Koji',
        weapon: 'Bow',
        inputs: ['Dlight', 'Nlight'],
        damage: 16,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic bow confirm. Good for building damage safely.'
    },
    {
        id: 'bow-2',
        name: 'Bow Kill Confirm',
        legend: 'Diana',
        weapon: 'Bow',
        inputs: ['Dlight', 'Nair', 'Recovery'],
        damage: 34,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Use at kill percent. The Nair into Recovery kills early offstage.'
    },

    // AXE COMBOS
    {
        id: 'axe-1',
        name: 'Axe Punish',
        legend: 'Teros',
        weapon: 'Axe',
        inputs: ['Slight', 'Nair'],
        damage: 30,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Heavy punish option. Slight has good range.'
    },
    {
        id: 'axe-2',
        name: 'Axe Helicopter',
        legend: 'Ragnir',
        weapon: 'Axe',
        inputs: ['Dlight', 'Slight', 'Recovery'],
        damage: 42,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Damage string into kill option. The Slight can be dodged.'
    }
];

export const weapons = [
    'Sword', 'Hammer', 'Spear', 'Gauntlets', 'Katars', 'Bow', 'Axe',
    'Blasters', 'Scythe', 'Lance', 'Cannon', 'Orb', 'Greatsword'
] as const;

export const difficulties = ['easy', 'medium', 'hard'] as const;

export function getCombosByWeapon(weapon: string): Combo[] {
    return combos.filter(c => c.weapon.toLowerCase() === weapon.toLowerCase());
}

export function getCombosByLegend(legend: string): Combo[] {
    return combos.filter(c => c.legend.toLowerCase() === legend.toLowerCase());
}

export function getTrueCombosOnly(): Combo[] {
    return combos.filter(c => c.isTrueCombo);
}

export function filterCombos(filters: {
    weapon?: string;
    legend?: string;
    difficulty?: string;
    trueComboOnly?: boolean;
    search?: string;
}): Combo[] {
    return combos.filter(combo => {
        if (filters.weapon && combo.weapon.toLowerCase() !== filters.weapon.toLowerCase()) {
            return false;
        }
        if (filters.legend && combo.legend.toLowerCase() !== filters.legend.toLowerCase()) {
            return false;
        }
        if (filters.difficulty && combo.difficulty !== filters.difficulty) {
            return false;
        }
        if (filters.trueComboOnly && !combo.isTrueCombo) {
            return false;
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return (
                combo.name.toLowerCase().includes(searchLower) ||
                combo.legend.toLowerCase().includes(searchLower) ||
                combo.weapon.toLowerCase().includes(searchLower) ||
                combo.inputs.some(input => input.toLowerCase().includes(searchLower))
            );
        }
        return true;
    });
}
