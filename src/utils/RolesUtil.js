//@flow

import type {PanelRole, PanelsConfig} from "../data/Config";

export default {
    toDisplay(role : PanelRole) : string {
        switch(role) {
            case "red":
                return "Red Scorekeeper";
            case "blue":
                return "Blue Scorekeeper";
            case "ref":
                return "Referee";
            default:
                return "";
        }
    },
    canChangeMatch(role : PanelRole, config : PanelsConfig) : boolean {
        if(config.tabletCount === 1) return true;
        if(config.tabletCount === 2 && role === 'red') return true;
        if(config.tabletCount === 3 && role === 'ref') return true;
        return false;
    }


}