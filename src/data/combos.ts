// Brawlhalla Combo Data - Real combos with actual notation
export type ComboTag = 'starter' | 'punish' | 'kill-confirm' | 'edge-guard' | 'string-extension' | 'aerial' | 'grounded' | 'recovery-punish';

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
    tags: ComboTag[];
}

export const combos: Combo[] = [
    // ==================== SWORD COMBOS (5 total) ====================
    {
        id: 'sword-1',
        name: 'Sword Basic Starter',
        legend: 'Bodvar',
        weapon: 'Sword',
        inputs: ['Dlight', 'Sair'],
        damage: 22,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fundamental sword combo. Works at all health percentages. Great for learning sword spacing.',
        videoUrl: 'https://www.youtube.com/watch?v=nH0TOqIDfYs',
        tags: ['starter', 'grounded']
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
        notes: 'String combo. Second Nair is a read. Chase dodge up between Nairs.',
        videoUrl: 'https://www.youtube.com/watch?v=nH0TOqIDfYs',
        tags: ['string-extension', 'aerial']
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
        notes: 'Use near edge for gimps. Dair spikes at high damage.',
        videoUrl: 'https://www.youtube.com/watch?v=nH0TOqIDfYs',
        tags: ['edge-guard', 'kill-confirm']
    },
    {
        id: 'sword-4',
        name: 'Sword Recovery Confirm',
        legend: 'Val',
        weapon: 'Sword',
        inputs: ['Dlight', 'Recovery'],
        damage: 28,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'True combo at low to mid damage. Great for taking stocks near the top blast zone.',
        videoUrl: 'https://www.youtube.com/watch?v=nH0TOqIDfYs',
        tags: ['kill-confirm', 'aerial']
    },
    {
        id: 'sword-5',
        name: 'Sword Extended String',
        legend: 'Petra',
        weapon: 'Sword',
        inputs: ['Slight', 'Dlight', 'Nair', 'Sair'],
        damage: 42,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Advanced string requiring dodge reads. Slight to Dlight is true, rest is read-based.',
        videoUrl: 'https://www.youtube.com/watch?v=nH0TOqIDfYs',
        tags: ['string-extension', 'starter', 'punish']
    },

    // ==================== HAMMER COMBOS (5 total) ====================
    {
        id: 'hammer-1',
        name: 'Hammer Bread and Butter',
        legend: 'Bodvar',
        weapon: 'Hammer',
        inputs: ['Dlight', 'Sair'],
        damage: 28,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'The most fundamental hammer combo. Jump cancel the Dlight into Sair.',
        videoUrl: 'https://www.youtube.com/watch?v=6mKqhQqKtbc',
        tags: ['starter', 'grounded']
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
        notes: 'Iconic hammer string. The GP is a read on dodge in. High risk, high reward.',
        videoUrl: 'https://www.youtube.com/watch?v=6mKqhQqKtbc',
        tags: ['string-extension', 'punish']
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
        notes: 'Works at kill percent. Use offstage for early kills.',
        videoUrl: 'https://www.youtube.com/watch?v=6mKqhQqKtbc',
        tags: ['edge-guard', 'kill-confirm']
    },
    {
        id: 'hammer-4',
        name: 'Hammer Stomp Combo',
        legend: 'Cassidy',
        weapon: 'Hammer',
        inputs: ['Dlight', 'Jump', 'Dair'],
        damage: 30,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'True combo that spikes. Use at edge for early kills or stage spikes.',
        videoUrl: 'https://www.youtube.com/watch?v=6mKqhQqKtbc',
        tags: ['edge-guard', 'aerial']
    },
    {
        id: 'hammer-5',
        name: 'Hammer Nlight Punish',
        legend: 'Scarlet',
        weapon: 'Hammer',
        inputs: ['Nlight', 'Sair'],
        damage: 26,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Quick punish option. Nlight has fast startup, confirms into Sair at low-mid damage.',
        videoUrl: 'https://www.youtube.com/watch?v=6mKqhQqKtbc',
        tags: ['punish', 'starter']
    },

    // ==================== SPEAR COMBOS (4 total) ====================
    {
        id: 'spear-1',
        name: 'Spear True Combo',
        legend: 'Orion',
        weapon: 'Spear',
        inputs: ['Dlight', 'Sair'],
        damage: 18,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic spear starter. Confirm into Sair on hit.',
        videoUrl: 'https://www.youtube.com/watch?v=xGp-rW7Dkgg',
        tags: ['starter', 'grounded']
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
        notes: 'Classic spear string. The Recovery is a read.',
        videoUrl: 'https://www.youtube.com/watch?v=xGp-rW7Dkgg',
        tags: ['string-extension', 'aerial']
    },
    {
        id: 'spear-3',
        name: 'Spear Kill Confirm',
        legend: 'Wu Shang',
        weapon: 'Spear',
        inputs: ['Dlight', 'Nair', 'Groundpound'],
        damage: 35,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Kill setup at high damage. GP is a read but catches most options.',
        videoUrl: 'https://www.youtube.com/watch?v=xGp-rW7Dkgg',
        tags: ['kill-confirm', 'string-extension']
    },
    {
        id: 'spear-4',
        name: 'Spear Edge Guard',
        legend: 'Mirage',
        weapon: 'Spear',
        inputs: ['Dair', 'Groundpound'],
        damage: 28,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Offstage true combo. Dair into GP for early gimps.',
        videoUrl: 'https://www.youtube.com/watch?v=xGp-rW7Dkgg',
        tags: ['edge-guard', 'recovery-punish']
    },

    // ==================== GAUNTLETS COMBOS (4 total) ====================
    {
        id: 'gauntlets-1',
        name: 'Gauntlets Ground Combo',
        legend: 'Val',
        weapon: 'Gauntlets',
        inputs: ['Dlight', 'Dlight', 'Nair'],
        damage: 26,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Requires gravity cancel on second Dlight. Tight timing window.',
        videoUrl: 'https://www.youtube.com/watch?v=jJBsAKST6Xc',
        tags: ['grounded', 'starter']
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
        notes: 'Extended gauntlets string. Requires fast inputs and chase dodge reads.',
        videoUrl: 'https://www.youtube.com/watch?v=jJBsAKST6Xc',
        tags: ['string-extension', 'kill-confirm']
    },
    {
        id: 'gauntlets-3',
        name: 'Gauntlets GP Confirm',
        legend: 'Mordex',
        weapon: 'Gauntlets',
        inputs: ['Dlight', 'Groundpound'],
        damage: 24,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic gauntlets true combo. GP spikes for edge guard situations.',
        videoUrl: 'https://www.youtube.com/watch?v=jJBsAKST6Xc',
        tags: ['edge-guard', 'grounded']
    },
    {
        id: 'gauntlets-4',
        name: 'Gauntlets Nair String',
        legend: 'Kor',
        weapon: 'Gauntlets',
        inputs: ['Nair', 'Nlight', 'Dlight', 'Sair'],
        damage: 38,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Aerial approach into ground game. Nlight to Dlight is a read.',
        videoUrl: 'https://www.youtube.com/watch?v=jJBsAKST6Xc',
        tags: ['aerial', 'string-extension']
    },

    // ==================== KATARS COMBOS (2 total) ====================
    {
        id: 'katars-1',
        name: 'Katars Punish Combo',
        legend: 'Lucien',
        weapon: 'Katars',
        inputs: ['Dlight', 'Nair'],
        damage: 20,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fast punish option. Great for whiff punishing.',
        videoUrl: 'https://www.youtube.com/watch?v=Xq0XWVJvmJ0',
        tags: ['punish', 'grounded']
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
        notes: 'Requires tight spacing and dodge reads. Practice the Nair timing.',
        videoUrl: 'https://www.youtube.com/watch?v=Xq0XWVJvmJ0',
        tags: ['string-extension', 'kill-confirm']
    },

    // ==================== BOW COMBOS (2 total) ====================
    {
        id: 'bow-1',
        name: 'Bow Approach',
        legend: 'Koji',
        weapon: 'Bow',
        inputs: ['Dlight', 'Nlight'],
        damage: 16,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic bow confirm. Good for building damage safely.',
        videoUrl: 'https://www.youtube.com/watch?v=AxSuhLqFkqI',
        tags: ['starter', 'grounded']
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
        notes: 'Use at kill percent. The Nair into Recovery kills early offstage.',
        videoUrl: 'https://www.youtube.com/watch?v=AxSuhLqFkqI',
        tags: ['kill-confirm', 'edge-guard']
    },

    // ==================== AXE COMBOS (2 total) ====================
    {
        id: 'axe-1',
        name: 'Axe Punish',
        legend: 'Teros',
        weapon: 'Axe',
        inputs: ['Slight', 'Nair'],
        damage: 30,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Heavy punish option. Slight has good range.',
        videoUrl: 'https://www.youtube.com/watch?v=JoVqYl-xpzw',
        tags: ['punish', 'grounded']
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
        notes: 'Damage string into kill option. The Slight can be dodged.',
        videoUrl: 'https://www.youtube.com/watch?v=JoVqYl-xpzw',
        tags: ['string-extension', 'kill-confirm']
    },

    // ==================== BLASTERS COMBOS (5 total) ====================
    {
        id: 'blasters-1',
        name: 'Blasters Slight Combo',
        legend: 'Lucien',
        weapon: 'Blasters',
        inputs: ['Slight', 'Dlight'],
        damage: 18,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fundamental blasters combo. Great for neutral approaches.',
        videoUrl: 'https://www.youtube.com/watch?v=hwsROFmU-x8',
        tags: ['starter', 'grounded']
    },
    {
        id: 'blasters-2',
        name: 'Blasters Dlight Sair',
        legend: 'Diana',
        weapon: 'Blasters',
        inputs: ['Dlight', 'Sair'],
        damage: 22,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic damage builder. Confirm Sair at any damage percent.',
        videoUrl: 'https://www.youtube.com/watch?v=hwsROFmU-x8',
        tags: ['starter', 'aerial']
    },
    {
        id: 'blasters-3',
        name: 'Blasters Recovery String',
        legend: 'Nix',
        weapon: 'Blasters',
        inputs: ['Dlight', 'Chase Dodge', 'Recovery'],
        damage: 28,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Kill setup at high damage. Recovery catches most options.',
        videoUrl: 'https://www.youtube.com/watch?v=hwsROFmU-x8',
        tags: ['kill-confirm', 'string-extension']
    },
    {
        id: 'blasters-4',
        name: 'Blasters Edge Guard',
        legend: 'Barraza',
        weapon: 'Blasters',
        inputs: ['Dair', 'Groundpound'],
        damage: 26,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Offstage edge guard combo. Dair to GP is true and spikes.',
        videoUrl: 'https://www.youtube.com/watch?v=hwsROFmU-x8',
        tags: ['edge-guard', 'recovery-punish']
    },
    {
        id: 'blasters-5',
        name: 'Blasters X-Pivot Nair',
        legend: 'Ada',
        weapon: 'Blasters',
        inputs: ['Nair', 'Slight', 'Dlight', 'Sair'],
        damage: 40,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Advanced string starting from aerial. Requires x-pivot for Nair approach.',
        videoUrl: 'https://www.youtube.com/watch?v=hwsROFmU-x8',
        tags: ['aerial', 'string-extension']
    },

    // ==================== SCYTHE COMBOS (6 total) ====================
    {
        id: 'scythe-1',
        name: 'Scythe Nlight Combo',
        legend: 'Nix',
        weapon: 'Scythe',
        inputs: ['Nlight', 'Nair'],
        damage: 20,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Scythe starter combo. Nlight catches approaches, confirm into Nair.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['starter', 'grounded']
    },
    {
        id: 'scythe-2',
        name: 'Scythe Slight Read',
        legend: 'Mordex',
        weapon: 'Scythe',
        inputs: ['Slight', 'Dlight', 'Nair'],
        damage: 28,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Dlight is a read after Slight. Cover dodge down with Dlight.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['punish', 'string-extension']
    },
    {
        id: 'scythe-3',
        name: 'Scythe Dair String',
        legend: 'Artemis',
        weapon: 'Scythe',
        inputs: ['Dair', 'Nlight', 'Nair'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Aerial approach into ground game. Nlight catches most dodges.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['aerial', 'string-extension']
    },
    {
        id: 'scythe-4',
        name: 'Scythe Active Input',
        legend: 'Fait',
        weapon: 'Scythe',
        inputs: ['Nair', 'Active Input Down', 'Dlight'],
        damage: 24,
        difficulty: 'hard',
        isTrueCombo: true,
        notes: 'Advanced scythe mechanic. Active input during Nair for true Dlight confirm.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['aerial', 'starter']
    },
    {
        id: 'scythe-5',
        name: 'Scythe Zero to Death',
        legend: 'Mordex',
        weapon: 'Scythe',
        inputs: ['Slight', 'Nair', 'Dlight', 'Sair', 'Recovery'],
        damage: 55,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Full scythe string. Requires read at every step. High reward for mastery.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['string-extension', 'kill-confirm']
    },
    {
        id: 'scythe-6',
        name: 'Scythe Edge Gimp',
        legend: 'Nix',
        weapon: 'Scythe',
        inputs: ['Dair', 'Groundpound'],
        damage: 26,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Offstage gimp setup. Dair floats them, GP spikes. Catches jumps.',
        videoUrl: 'https://www.youtube.com/watch?v=9-3T9JPMB0E',
        tags: ['edge-guard', 'recovery-punish']
    },

    // ==================== LANCE COMBOS (5 total) ====================
    {
        id: 'lance-1',
        name: 'Lance Dair Confirm',
        legend: 'Orion',
        weapon: 'Lance',
        inputs: ['Dair', 'Sair'],
        damage: 24,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic lance true combo. Dair at edge confirms into Sair for kills.',
        videoUrl: 'https://www.youtube.com/watch?v=iRpLJ7d7xnM',
        tags: ['starter', 'edge-guard']
    },
    {
        id: 'lance-2',
        name: 'Lance Nair Slight',
        legend: 'Scarlet',
        weapon: 'Lance',
        inputs: ['Nair', 'Slight'],
        damage: 22,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Aerial approach combo. Nair into Slight is true at most damages.',
        videoUrl: 'https://www.youtube.com/watch?v=iRpLJ7d7xnM',
        tags: ['aerial', 'starter']
    },
    {
        id: 'lance-3',
        name: 'Lance Dlight String',
        legend: 'Vraxx',
        weapon: 'Lance',
        inputs: ['Dlight', 'Sair', 'Recovery'],
        damage: 38,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Damage string. Sair after Dlight is a read, Recovery is kill confirm.',
        videoUrl: 'https://www.youtube.com/watch?v=iRpLJ7d7xnM',
        tags: ['string-extension', 'kill-confirm']
    },
    {
        id: 'lance-4',
        name: 'Lance Recovery Punish',
        legend: 'Ulgrim',
        weapon: 'Lance',
        inputs: ['Groundpound', 'Sair'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'GP catches recoveries, confirm into Sair. Strong edge guard tool.',
        videoUrl: 'https://www.youtube.com/watch?v=iRpLJ7d7xnM',
        tags: ['edge-guard', 'recovery-punish']
    },
    {
        id: 'lance-5',
        name: 'Lance Carry Combo',
        legend: 'Artemis',
        weapon: 'Lance',
        inputs: ['Slight', 'Nair', 'Sair'],
        damage: 36,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Stage carry string. Slight pushes them across stage, Nair extends, Sair finishes.',
        videoUrl: 'https://www.youtube.com/watch?v=iRpLJ7d7xnM',
        tags: ['string-extension', 'punish']
    },

    // ==================== CANNON COMBOS (5 total) ====================
    {
        id: 'cannon-1',
        name: 'Cannon Dlight Sair',
        legend: 'Sidra',
        weapon: 'Cannon',
        inputs: ['Dlight', 'Sair'],
        damage: 24,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Fundamental cannon combo. Dlight into Sair is true at all damages.',
        videoUrl: 'https://www.youtube.com/watch?v=Lm_PKfudNhQ',
        tags: ['starter', 'grounded']
    },
    {
        id: 'cannon-2',
        name: 'Cannon Slight Combo',
        legend: 'Xull',
        weapon: 'Cannon',
        inputs: ['Slight', 'Dlight', 'Sair'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Extended true combo. All three hits are true with proper timing.',
        videoUrl: 'https://www.youtube.com/watch?v=Lm_PKfudNhQ',
        tags: ['starter', 'string-extension']
    },
    {
        id: 'cannon-3',
        name: 'Cannon Blast Zone',
        legend: 'Lin Fei',
        weapon: 'Cannon',
        inputs: ['Dlight', 'Jump', 'Nair', 'Sair'],
        damage: 40,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Carry to blast zone. Nair carries horizontally, Sair kills.',
        videoUrl: 'https://www.youtube.com/watch?v=Lm_PKfudNhQ',
        tags: ['kill-confirm', 'aerial']
    },
    {
        id: 'cannon-4',
        name: 'Cannon Edge Guard',
        legend: 'Onyx',
        weapon: 'Cannon',
        inputs: ['Dair', 'Recovery'],
        damage: 28,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Offstage edge guard. Dair spikes, Recovery catches recovery attempts.',
        videoUrl: 'https://www.youtube.com/watch?v=Lm_PKfudNhQ',
        tags: ['edge-guard', 'recovery-punish']
    },
    {
        id: 'cannon-5',
        name: 'Cannon Zero to Death',
        legend: 'Isaiah',
        weapon: 'Cannon',
        inputs: ['Slight', 'Dlight', 'Nair', 'Sair', 'Recovery'],
        damage: 58,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Full cannon string. Requires reads and stage positioning. Devastating when mastered.',
        videoUrl: 'https://www.youtube.com/watch?v=Lm_PKfudNhQ',
        tags: ['string-extension', 'kill-confirm']
    },

    // ==================== ORB COMBOS (5 total) ====================
    {
        id: 'orb-1',
        name: 'Orb Dlight Sair',
        legend: 'Fait',
        weapon: 'Orb',
        inputs: ['Dlight', 'Sair'],
        damage: 20,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Basic orb combo. Works at all damages, great for building damage.',
        videoUrl: 'https://www.youtube.com/watch?v=rJvPhZNz7Nk',
        tags: ['starter', 'grounded']
    },
    {
        id: 'orb-2',
        name: 'Orb Nair Slight',
        legend: 'Petra',
        weapon: 'Orb',
        inputs: ['Nair', 'Slight'],
        damage: 22,
        difficulty: 'easy',
        isTrueCombo: true,
        notes: 'Aerial approach into ground game. Nair to Slight is true.',
        videoUrl: 'https://www.youtube.com/watch?v=rJvPhZNz7Nk',
        tags: ['aerial', 'starter']
    },
    {
        id: 'orb-3',
        name: 'Orb Dlight String',
        legend: 'Thor',
        weapon: 'Orb',
        inputs: ['Dlight', 'Nair', 'Sair'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: false,
        notes: 'Extended damage string. Nair is a read, Sair confirms.',
        videoUrl: 'https://www.youtube.com/watch?v=rJvPhZNz7Nk',
        tags: ['string-extension', 'punish']
    },
    {
        id: 'orb-4',
        name: 'Orb Recovery Finisher',
        legend: 'Dusk',
        weapon: 'Orb',
        inputs: ['Dlight', 'Recovery'],
        damage: 26,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Kill confirm at high damage. Recovery has good kill power near top.',
        videoUrl: 'https://www.youtube.com/watch?v=rJvPhZNz7Nk',
        tags: ['kill-confirm', 'aerial']
    },
    {
        id: 'orb-5',
        name: 'Orb Edge Gimp',
        legend: 'Fait',
        weapon: 'Orb',
        inputs: ['Dair', 'Groundpound'],
        damage: 24,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Offstage gimp. Dair floats, GP spikes. Risky but rewarding.',
        videoUrl: 'https://www.youtube.com/watch?v=rJvPhZNz7Nk',
        tags: ['edge-guard', 'recovery-punish']
    },

    // ==================== GREATSWORD COMBOS (5 total) ====================
    {
        id: 'greatsword-1',
        name: 'Greatsword Basic Bridge',
        legend: 'Jaeyun',
        weapon: 'Greatsword',
        inputs: ['Dlight (Opener)', 'Nlight (Bridge)', 'Nair (Finisher)'],
        damage: 28,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Basic GS combo structure. Opener > Bridge > Finisher is the core loop.',
        videoUrl: 'https://www.youtube.com/watch?v=LNZZfz_5kGE',
        tags: ['starter', 'grounded']
    },
    {
        id: 'greatsword-2',
        name: 'Greatsword Aerial Bridge',
        legend: 'Mako',
        weapon: 'Greatsword',
        inputs: ['Nair (Opener)', 'Slight (Bridge)', 'Sair (Finisher)'],
        damage: 32,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'Aerial approach into GS combo. Good for catching jumps.',
        videoUrl: 'https://www.youtube.com/watch?v=LNZZfz_5kGE',
        tags: ['aerial', 'starter']
    },
    {
        id: 'greatsword-3',
        name: 'Greatsword Kill Setup',
        legend: 'Jaeyun',
        weapon: 'Greatsword',
        inputs: ['Dlight', 'Slight', 'Dair (Finisher)'],
        damage: 36,
        difficulty: 'hard',
        isTrueCombo: true,
        notes: 'Kill confirm combo. Dair finisher spikes at edge.',
        videoUrl: 'https://www.youtube.com/watch?v=LNZZfz_5kGE',
        tags: ['kill-confirm', 'edge-guard']
    },
    {
        id: 'greatsword-4',
        name: 'Greatsword Extended Loop',
        legend: 'Magyar',
        weapon: 'Greatsword',
        inputs: ['Nlight', 'Dlight', 'Slight', 'Nair'],
        damage: 44,
        difficulty: 'hard',
        isTrueCombo: false,
        notes: 'Extended GS string. Requires bridge timing mastery.',
        videoUrl: 'https://www.youtube.com/watch?v=LNZZfz_5kGE',
        tags: ['string-extension', 'punish']
    },
    {
        id: 'greatsword-5',
        name: 'Greatsword Recovery Confirm',
        legend: 'Mako',
        weapon: 'Greatsword',
        inputs: ['Dlight', 'Nlight', 'Recovery'],
        damage: 38,
        difficulty: 'medium',
        isTrueCombo: true,
        notes: 'True combo into Recovery. Kills near top blast zone.',
        videoUrl: 'https://www.youtube.com/watch?v=LNZZfz_5kGE',
        tags: ['kill-confirm', 'aerial']
    }
];

export const weapons = [
    'Sword', 'Hammer', 'Spear', 'Gauntlets', 'Katars', 'Bow', 'Axe',
    'Blasters', 'Scythe', 'Lance', 'Cannon', 'Orb', 'Greatsword'
] as const;

export const difficulties = ['easy', 'medium', 'hard'] as const;

export const comboTags: ComboTag[] = [
    'starter', 'punish', 'kill-confirm', 'edge-guard',
    'string-extension', 'aerial', 'grounded', 'recovery-punish'
];

export function getCombosByWeapon(weapon: string): Combo[] {
    return combos.filter(c => c.weapon.toLowerCase() === weapon.toLowerCase());
}

export function getCombosByLegend(legend: string): Combo[] {
    return combos.filter(c => c.legend.toLowerCase() === legend.toLowerCase());
}

export function getCombosByTag(tag: ComboTag): Combo[] {
    return combos.filter(c => c.tags.includes(tag));
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
    tags?: ComboTag[];
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
        if (filters.tags && filters.tags.length > 0) {
            const hasMatchingTag = filters.tags.some(tag => combo.tags.includes(tag));
            if (!hasMatchingTag) return false;
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return (
                combo.name.toLowerCase().includes(searchLower) ||
                combo.legend.toLowerCase().includes(searchLower) ||
                combo.weapon.toLowerCase().includes(searchLower) ||
                combo.inputs.some(input => input.toLowerCase().includes(searchLower)) ||
                combo.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }
        return true;
    });
}
