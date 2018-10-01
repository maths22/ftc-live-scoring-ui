// @flow


import {autorun, observable} from "mobx";


import type {IObservableArray} from 'mobx';
import {Match} from "./Match";
import Api from "../api";
import {client} from "@stomp/stompjs";
import {GlobalPanelsConfig, PanelConfig} from "./Config";


export class State {
  @observable matches: IObservableArray<string> = [];
  @observable currentMatch: ?Match = null;
  @observable globalConfig = new GlobalPanelsConfig();
  @observable panelConfig = new PanelConfig();

  api = new Api();

  constructor() {
    this.loadMatches();

    this.startWebsocket();
  }

  loadMatches() {
    this.api.getMatches((m) => this.matches.replace(m));
  }

  loadFieldConfig(field: number) {
    this.api.getFieldConfig(field, (res) => {
      if (res["CURRENT_MATCH"]) {
        this.api.getMatch(res["CURRENT_MATCH"], (m) => this.currentMatch = new Match().init(m));
      }
    })
  }

  loadMatch(id: string, field: number) {
    this.api.getMatch(id, (m) => {
      this.currentMatch = new Match().init(m);
      if (field) this.currentMatch.setField(field);
    });
  }

  selectMatch(field: number, id: string) {
    this.loadMatch(id, field);
    this.api.putFieldConfig(field, {"CURRENT_MATCH": id});
    //TODO set for field
  }

  startWebsocket() {
    if (this.client) this.client.disconnect();
    const loc = window.location;
    let new_uri;
    if (loc.protocol === "https:") {
      new_uri = "wss:";
    } else {
      new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += "/api/websocket/websocket";
    this.client = client(new_uri);
    this.client.debug = function (str) {
    };
    this.client.connect({}, () => {
      autorun(() => {
        if (this.configSub) this.configSub.unsubscribe();
        this.configSub = this.client.subscribe("/topic/config/" + this.panelConfig.field, (update) => {
          const res = JSON.parse(update.body);
          if (res.origin !== this.api.clientId) {
            this.globalConfig.processUpdates(res.updatedProps);
            if (res.updatedProps["CURRENT_MATCH"]) {
              this.loadMatch(res.updatedProps["CURRENT_MATCH"]);
            }
          }
        })
      });
      this.listSub = this.client.subscribe("/topic/matchList", (update) => {
        this.matches.replace(update.body['list']);
      });
      this.matchSub = this.client.subscribe("/topic/match", (update) => {
        const res = JSON.parse(update.body);
        if (res.origin !== this.api.clientId && res.match === this.currentMatch.number) {
          for (const change in res.globalChanges) {
            //TODO process changes in the alliance object
            this.currentMatch[change] = res.globalChanges[change]
          }
          for (const change in res.redScoreChanges) {
            if (this.currentMatch.redScore[change].init instanceof Function) {
              this.currentMatch.redScore[change].init(res.redScoreChanges[change])
            } else {
              this.currentMatch.redScore[change] = res.redScoreChanges[change]
            }
          }
          for (const change in res.blueScoreChanges) {
            if (this.currentMatch.blueScore[change].init instanceof Function) {
              this.currentMatch.blueScore[change].init(res.blueScoreChanges[change])
            } else {
              this.currentMatch.blueScore[change] = res.blueScoreChanges[change]
            }
          }
        }
      });
    }, (e) => console.log(e), (e) => console.log(e));
    client.reconnect_delay = 5000;

  }


}