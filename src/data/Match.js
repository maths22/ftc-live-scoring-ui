//@flow

import {observable} from "mobx";
import {Score} from "./RoverRuckusScore";

import type {IObservableArray} from 'mobx';

import Api from '../api';

const api = new Api();

const _match = Symbol('match');
const _allianceColor = Symbol('allianceColor');
const _alliance = Symbol('alliance');

export class Team {
  @observable number: number;
  @observable noShow: boolean;
  @observable yellowCard: boolean;
  @observable redCard: boolean;
  @observable participating: boolean;

  constructor(match, allianceColor, alliance) {
    this[_match] = match;
    this[_allianceColor] = allianceColor;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveAlliance(this[_match], this[_allianceColor], this[_alliance]);
  }

  init({number, noShow, yellowCard, redCard, participating}) {
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
  @observable started: boolean;
  @observable number: string;
  @observable field: number;
  @observable redAlliance: Alliance = [];
  @observable blueAlliance: Alliance = [];
  @observable random: number;
  @observable redScore: Score;
  @observable blueScore: Score;


  init({number, started, field, redAlliance, blueAlliance, random, redScore, blueScore}) {
    this.number = number;
    this.started = started;
    this.field = field;
    this.redAlliance.replace(redAlliance.map((t) => new Team(number, "red", this.redAlliance).init(t)));
    this.blueAlliance.replace(blueAlliance.map((t) => new Team(number, "blue", this.blueAlliance).init(t)));
    this.random = random;
    this.redScore = new Score(number, "red").init(redScore);
    this.blueScore = new Score(number, "blue").init(blueScore);

    return this;
  }

  setField(field) {
    this.field = field;
    api.saveRandom(this.number, this.field, this.random);
  }

  setRandom(random) {
    this.random = random;
    api.saveRandom(this.number, this.field, this.random);
  }

  startMatch() {
    this.started = true;
    api.startMatch(this.number);
  };


}