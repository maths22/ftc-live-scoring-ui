import type {EndgamePosition} from "../components/relicRecovery/EndgameRobotSelector";
import type {RelicState} from "../components/relicRecovery/RelicSelector";
import type {CryptoboxState} from "../components/relicRecovery/CryptoboxSelector";
import type {AutoPosition} from "../components/relicRecovery/AutoRobotSelector";
import type {Color} from "../components/relicRecovery/AutoJewelSelector";
import {observable} from "mobx";

export class RRAutoScore {
  @observable r1Pos: ?AutoPosition = null;
  @observable r2Pos: ?AutoPosition = null;
  @observable jewel1Remaining: ?Color = null;
  @observable jewel2Remaining: ?Color = null;
  @observable cryptobox1State: ?CryptoboxState = null;
  @observable cryptobox2State: ?CryptoboxState = null;
  @observable cryptobox3State: ?CryptoboxState = null;


  init({ r1Pos, r2Pos, jewel1Remaining, jewel2Remaining, cryptobox1State, cryptobox2State, cryptobox3State }) {
    this.r1Pos = r1Pos;
    this.r2Pos = r2Pos;
    this.jewel1Remaining = jewel1Remaining;
    this.jewel2Remaining = jewel2Remaining;
    this.cryptobox1State = cryptobox1State;
    this.cryptobox2State = cryptobox2State;
    this.cryptobox3State = cryptobox3State;

    return this;
  }
}

export class RREndgameScore {
  @observable r1Pos: ?EndgamePosition = null;
  @observable r2Pos: ?EndgamePosition = null;
  @observable relic1State: RelicState = {position: null, orientation: null};
  @observable relic2State: RelicState = {position: null, orientation: null};
  @observable relic3State: RelicState = {position: null, orientation: null};


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


  init({ submitted, autoSubmitted, finalized, auto, teleop, endgame, penalties } ) {
    this.submitted = submitted;
    this.autoSubmitted = autoSubmitted;
    this.finalized = finalized;
    this.auto = new RRAutoScore().init(auto);
    this.teleop = new RRTeleopScore().init(teleop);
    this.endgame = new RREndgameScore().init(endgame);
    this.penalties = new PenaltyScore().init(penalties);

    return this;
  }
}