//@flow

import {observable} from "mobx";
import Api from "../api";

export type PanelRole = "red" | "blue" | "ref" | null;
export type PanelField = 1 | 2 | 3 | 0;

const api = new Api();

export class PanelConfig {
    @observable role: PanelRole = null;
    @observable field: PanelField = 0;

    constructor () {
        this.role = window.localStorage.getItem("role");
        this.field = parseInt(window.localStorage.getItem("field"));
    }

    setRole (newRole: PanelRole) {
        this.role = newRole;
        window.localStorage.setItem("role", newRole);
    }

    setField (newField: PanelField) {
        this.field = newField;
        window.localStorage.setItem("field", newField);
        //TODO update listener
    }
}

export class GlobalPanelsConfig {
  @observable fieldCount: 1 | 2 | 3 | null = null;
  @observable tabletCount: 1 | 2 | 3 | null = null;

  constructor () {
      api.getFieldConfig(0, (res) => {
          this.fieldCount = res["FIELD_COUNT"];
          this.tabletCount = res["DEVICE_COUNT"];
    })
  }

  setFieldCount (fieldCount: 1 | 2 | 3) {
    this.fieldCount = fieldCount;
    api.putGlobalConfig({"FIELD_COUNT": fieldCount});
  }

  setTabletCount (tabletCount: 1 | 2 | 3) {
    this.tabletCount = tabletCount;
    api.putGlobalConfig({"DEVICE_COUNT": tabletCount});
  }
}
