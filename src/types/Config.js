//@flow

export type PanelRole = "red" | "blue" | "ref" | null;
export type PanelField = 1 | 2 | null;

export type PanelsConfig = {
    fieldCount?: 1 | 2 | 3,
    tabletCount?: 1 | 2 | 3,
}