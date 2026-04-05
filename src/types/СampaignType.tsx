import { type HeroCardType } from "./HeroCardType";

export type CampaignFormTypeMaster = {
    name: string;
    playerCards: Record<string, HeroCardType>;
    publicMaterial: string[];
    characterFormSettings: any;
    rules: string[];
    npcCards: Record<string, HeroCardType>;
    scenario: string;
};

export type CampaignFormTypePlayer = {
    myPlayerCards: Record<string, HeroCardType>;
    characterForm: any;
    publicMaterial: string[];
    myNotices: string;
    rules: string[];
};
