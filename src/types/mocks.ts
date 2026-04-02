import type {HeroCardType} from "./HeroCardType"
import {type CampaignFormTypeMaster, type CampaignFormTypePlayer} from "./СampaignType"

export const defaultCharacter: HeroCardType = {
    name: "",
    race: "",
    class: "",
    level: 1,

    attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },

    skills: {
        acrobatics: { proficient: false, value: 0 },
        animalHandling: { proficient: false, value: 0 },
        arcana: { proficient: false, value: 0 },
        athletics: { proficient: false, value: 0 },
        deception: { proficient: false, value: 0 },
        history: { proficient: false, value: 0 },
        insight: { proficient: false, value: 0 },
        intimidation: { proficient: false, value: 0 },
        investigation: { proficient: false, value: 0 },
        medicine: { proficient: false, value: 0 },
        nature: { proficient: false, value: 0 },
        perception: { proficient: false, value: 0 },
        performance: { proficient: false, value: 0 },
        persuasion: { proficient: false, value: 0 },
        religion: { proficient: false, value: 0 },
        sleightOfHand: { proficient: false, value: 0 },
        stealth: { proficient: false, value: 0 },
        survival: { proficient: false, value: 0 }
    },

    combat: {
        armorClass: 10,
        initiative: 0,
        speed: 30,
        hitPoints: {
            max: 10,
            current: 10,
            temporary: 0
        }
    },

    proficiencyBonus: 2,

    attacks: [
        {
            name: "Longsword",
            attackBonus: 5,
            damage: "1d8"
        }
    ],

    equipment: [
        {
            name: "Backpack",
            quantity: 1
        }
    ],

    spells: {
        spellcastingAbility: "intelligence",
        spellSaveDC: 10,
        spellAttackBonus: 2,
        slots: {
            1: 2
        }
    }
};

export const defaultCampaignFormTypeMaster: CampaignFormTypeMaster = {
    name: "",
    playerCards: {},
    publicMaterial: [],
    characterFormSettings: {},
    rules: [],
    npcCards: {},
    scenario: ""
};

export const defaultCampaignFormTypePlayer: CampaignFormTypePlayer = {
    myPlayerCards: {},
    characterForm: {},
    publicMaterial: [],
    myNotices: ""
};