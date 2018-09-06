import type {EndgamePosition} from "../components/relicRecovery/EndgameRobotSelector";
import type {RelicState} from "../components/relicRecovery/RelicSelector";
import type {CryptoboxState} from "../components/relicRecovery/CryptoboxSelector";
import type {AutoPosition} from "../components/relicRecovery/AutoRobotSelector";
import type {Color} from "../components/relicRecovery/AutoJewelSelector";
import {observable} from "mobx";
import Api from "../api";

const api = new Api();

const _match = Symbol('match');
const _alliance = Symbol('alliance');

export class RRAutoScore {
  @observable r1Pos: ?AutoPosition = null;
  @observable r2Pos: ?AutoPosition = null;
  @observable jewel1Remaining: ?Color = null;
  @observable jewel2Remaining: ?Color = null;
  @observable cryptobox1State: ?CryptoboxState = null;
  @observable cryptobox2State: ?CryptoboxState = null;
  @observable cryptobox3State: ?CryptoboxState = null;
  @observable cryptobox1Key: ?boolean = null;
  @observable cryptobox2Key: ?boolean = null;
  @observable cryptobox3Key: ?boolean = null;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveAuto(this[_match], this[_alliance], this);
  }

  init({ r1Pos, r2Pos, jewel1Remaining, jewel2Remaining, cryptobox1State, cryptobox2State, cryptobox3State,
         cryptobox1Key, cryptobox2Key, cryptobox3Key}) {
    this.r1Pos = r1Pos;
    this.r2Pos = r2Pos;
    this.jewel1Remaining = jewel1Remaining;
    this.jewel2Remaining = jewel2Remaining;
    this.cryptobox1State = cryptobox1State;
    this.cryptobox2State = cryptobox2State;
    this.cryptobox3State = cryptobox3State;
    this.cryptobox1Key = cryptobox1Key;
    this.cryptobox2Key = cryptobox2Key;
    this.cryptobox3Key = cryptobox3Key;

    return this;
  }
}

export class RREndgameScore {
  @observable r1Pos: ?EndgamePosition = null;
  @observable r2Pos: ?EndgamePosition = null;
  @observable relic1State: RelicState = {position: null, orientation: null};
  @observable relic2State: RelicState = {position: null, orientation: null};
  @observable relic3State: RelicState = {position: null, orientation: null};

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveEndgame(this[_match], this[_alliance], this);
  }

  init({ r1Pos, r2Pos, relic1State, relic2State, relic3State }) {
    this.r1Pos = r1Pos;
    this.r2Pos = r2Pos;
    this.relic1State = relic1State;
    this.relic2State = relic2State;
    this.relic3State = relic3State;

    return this;
  }
}

export class RRTeleopScore {
  @observable cryptobox1State: ?CryptoboxState = null;
  @observable cryptobox2State: ?CryptoboxState = null;
  @observable cryptobox3State: ?CryptoboxState = null;

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  set(key, value) {
    this[key] = value;
    api.saveTeleop(this[_match], this[_alliance], this);
  }

  init({ cryptobox1State, cryptobox2State, cryptobox3State}) {
    this.cryptobox1State = cryptobox1State;
    this.cryptobox2State = cryptobox2State;
    this.cryptobox3State = cryptobox3State;

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

export class RRScore {
  @observable submitted: boolean = false;
  @observable autoSubmitted: boolean = false;
  @observable finalized: boolean = false;
  @observable auto: RRAutoScore = new RRAutoScore();
  @observable teleop: RRTeleopScore = new RRTeleopScore();
  @observable endgame: RREndgameScore = new RREndgameScore();
  @observable penalties: PenaltyScore = new PenaltyScore();

  constructor(match, alliance) {
    this[_match] = match;
    this[_alliance] = alliance;
  }

  init({ submitted, autoSubmitted, finalized, auto, teleop, endgame, penalties } ) {
    this.submitted = submitted;
    this.autoSubmitted = autoSubmitted;
    this.finalized = finalized;
    this.auto = new RRAutoScore(this[_match], this[_alliance]).init(auto);
    this.teleop = new RRTeleopScore(this[_match], this[_alliance]).init(teleop);
    this.endgame = new RREndgameScore(this[_match], this[_alliance]).init(endgame);
    this.penalties = new PenaltyScore(this[_match], this[_alliance]).init(penalties);

    return this;
  }
}