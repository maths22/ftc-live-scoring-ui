import {observable} from "mobx";
import Api from "../api";

const api = new Api();

const _match = Symbol('match');
const _alliance = Symbol('alliance');

export type DepotsClaimed = ['zero', 'one', 'two']
export type LandedState = ['not_landed', 'landed']
export type ParkedState = ['not_parked', 'parked']
export type MineralsState = ['not_sampled', 'sampled']

export class AutoScore {
  @observable robot1Landed: ?LandedState = null;
  @observable robot2Landed: ?LandedState = null;
  @observable depotsClaimed: ?DepotsClaimed = null;
  @observable robot1Parked: ?ParkedState = null;
  @observable robot2Parked: ?ParkedState = null;
  @observable field1Sampled: ?MineralsState = null;
  @observable field2Sampled: ?MineralsState = null;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveAuto(this[_match], this[_alliance], this);
  }

  init({ robot1Landed, robot2Landed, depotsClaimed, robot1Parked, robot2Parked, field1Sampled, field2Sampled }) {
    this.robot1Landed = robot1Landed;
    this.robot2Landed = robot2Landed;
    this.depotsClaimed = depotsClaimed;
    this.robot1Parked = robot1Parked;
    this.robot2Parked = robot2Parked;
    this.field1Sampled = field1Sampled;
    this.field2Sampled = field2Sampled;

    return this;
  }
}

export type RobotEndgamePos = ['none', 'latched', 'parked', 'parked_completely']

export class EndgameScore {
  @observable robot1Position: ?RobotEndgamePos = null;
  @observable robot2Position: ?RobotEndgamePos = null;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveEndgame(this[_match], this[_alliance], this);
  }

  init({ robot1Position, robot2Position }) {
    this.robot1Position = robot1Position;
    this.robot2Position = robot2Position;

    return this;
  }
}

export class TeleopScore {
  @observable depotMinerals: number = 0;
  @observable goldCargo: number = 0;
  @observable silverCargo: number = 0;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveTeleop(this[_match], this[_alliance], this);
  }

  init({ depotMinerals, goldCargo, silverCargo}) {
    this.depotMinerals = depotMinerals;
    this.goldCargo = goldCargo;
    this.silverCargo = silverCargo;

    return this;
  }
}

export class PenaltyScore {
  @observable minor: number = 0;
  @observable major: number = 0;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.savePenalties(this[_match], this[_alliance], this);
  }

  init({ minor, major }) {
    this.minor = minor;
    this.major = major;

    return this;
  }
}

export class Score {
  @observable submitted: boolean = false;
  @observable autoSubmitted: boolean = false;
  @observable finalized: boolean = false;
  @observable auto: AutoScore = new AutoScore();
  @observable teleop: TeleopScore = new TeleopScore();
  @observable endgame: EndgameScore = new EndgameScore();
  @observable penalties: PenaltyScore = new PenaltyScore();

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  init({ submitted, autoSubmitted, finalized, auto, teleop, endgame, penalties } ) {
    this.submitted = submitted;
    this.autoSubmitted = autoSubmitted;
    this.finalized = finalized;
    this.auto = new AutoScore(this[_match], this[_alliance]).init(auto);
    this.teleop = new TeleopScore(this[_match], this[_alliance]).init(teleop);
    this.endgame = new EndgameScore(this[_match], this[_alliance]).init(endgame);
    this.penalties = new PenaltyScore(this[_match], this[_alliance]).init(penalties);

    return this;
  }
}