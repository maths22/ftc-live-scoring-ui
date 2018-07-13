//@flow

import {autorun, observable, reaction, toJS} from "mobx";
import {RRScore} from "./RRScore";

import type {IObservableArray} from 'mobx';

import Api from '../api';

export class Team {
  @observable number: number;
  @observable noShow: boolean;
  @observable yellowCard: boolean;
  @observable redCard: boolean;
  @observable participating: boolean;

  init({ number, noShow, yellowCard, redCard, participating}) {
    this.number = number;
    this.noShow = noShow;
    this.yellowCard = yellowCard;
    this.redCard = redCard;
    this.participating = participating;

    return this;
  }
}

export type Alliance = IObservableArray<Team>

export class Match {
  @observable number: string;
  @observable field: number;
  @observable redAlliance: Alliance = [];
  @observable blueAlliance: Alliance = [];
  @observable random: number;
  @observable redScore: RRScore;
  @observable blueScore: RRScore;

  api = new Api();

  init ({ number, field, redAlliance, blueAlliance, random, redScore, blueScore}) {
    this.number = number;
    this.field = field;
    this.redAlliance.replace(redAlliance.map((t) => new Team().init(t)));
    this.blueAlliance.replace(blueAlliance.map((t) => new Team().init(t)));
    this.random = random;
    this.redScore = new RRScore().init(redScore);
    this.blueScore = new RRScore().init(blueScore);

    reaction(
      () => ({id: this.number, field: this.field, random: this.random}),
      (data) => (this.api.saveRandom(data.id, data.field, data.number))
    );

    reaction(
      () => ({id: this.number, alliance: toJS(this.redAlliance), penalties: toJS(this.redScore.penalties)}),
      (data) => (this.api.savePenalties(data.id, "red", data.penalties, data.alliance))
    );

    reaction(
      () => ({id: this.number, alliance: toJS(this.blueAlliance), penalties: toJS(this.blueScore.penalties)}),
      (data) => (this.api.savePenalties(data.id, "blue", data.penalties, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.redScore.auto)}),
      (data) => (this.api.saveAuto(data.id, "red", data.data, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.blueScore.auto)}),
      (data) => (this.api.saveAuto(data.id, "blue", data.data, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.redScore.teleop)}),
      (data) => (this.api.saveTeleop(data.id, "red", data.data, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.blueScore.teleop)}),
      (data) => (this.api.saveTeleop(data.id, "blue", data.data, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.redScore.endgame)}),
      (data) => (this.api.saveEndgame(data.id, "red", data.data, data.alliance))
    );

    reaction(
      () => ({id: this.number, data: toJS(this.blueScore.endgame)}),
      (data) => (this.api.saveEndgame(data.id, "blue", data.data, data.alliance))
    );

    return this;
  }


}