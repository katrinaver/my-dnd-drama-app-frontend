export type Ability =
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma";

export type SkillName =
    | "acrobatics"
    | "animalHandling"
    | "arcana"
    | "athletics"
    | "deception"
    | "history"
    | "insight"
    | "intimidation"
    | "investigation"
    | "medicine"
    | "nature"
    | "perception"
    | "performance"
    | "persuasion"
    | "religion"
    | "sleightOfHand"
    | "stealth"
    | "survival";

export type HeroCardType = {
    name: string;
    race: string;
    class: string;
    level: number;

    attributes: Record<Ability, number>

    skills: Record<
        SkillName,
        {
            proficient: boolean;
            value: number;
        }
    >;

    combat: {
        armorClass: number;
        initiative: number;
        speed: number;
        hitPoints: {
            max: number;
            current: number;
            temporary: number;
        };
    };

    proficiencyBonus: number;

    attacks: {
        name: string;
        attackBonus: number;
        damage: string;
    }[];

    equipment: {
        name: string;
        quantity: number;
    }[];

    spells: {
        spellcastingAbility: Ability;
        spellSaveDC: number;
        spellAttackBonus: number;
        slots: Partial<Record<number, number>>; // важно для форм
    };
};