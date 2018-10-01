//@flow
import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {withState} from '@dump247/storybook-state';

import Counter from '../widgets/Counter.js';
import EndgameSelector from "../components/roverRuckus/EndgameSelector";
import AutoSelector from "../components/roverRuckus/AutoSelector";
import TeleopSelector from "../components/roverRuckus/TeleopSelector";
import PenaltySelector from "../components/referee/PenaltySelector";
import RandomizationResults from "../components/roverRuckus/RandomizationResults";
import RandomizationSelector from "../components/roverRuckus/RandomizationSelector";
import Config from "../components/panel/Config";
import TeamInfo from "../components/referee/TeamInfo";
import MatchScore from "../components/panel/MatchScore";
import {PenaltyScore, AutoScore, EndgameScore, TeleopScore} from "../data/RoverRuckusScore";
import {Match, Team} from "../data/Match";
import {GlobalPanelsConfig, PanelConfig} from "../data/Config";

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Widgets|Counter', module)
    .add('small', withState({value: 1}, (store) => (
        <Counter {...store.state} onChange={(v) => store.set({value: v})}/>
    )))
    .add('large', withState({value: 1}, (store) => (
        <Counter large {...store.state} onChange={(v) => store.set({value: v})}/>
    )));

storiesOf('Phase Selectors|Autonomous Selector', module)
    .add('stateful', () =>
        <AutoSelector state={new AutoScore()}/>
    );

storiesOf('Phase Selectors|Teleop Selector', module)
    .add('stateful', () =>
        <TeleopSelector state={new TeleopScore()}/>
    );

storiesOf('Phase Selectors|Endgame Selector', module)
    .add('stateful', () =>
        <EndgameSelector state={new EndgameScore()}/>
    );

storiesOf('Phase Selectors|Penalty Selector', module)
    .add('stateful', () =>
        <PenaltySelector state={new PenaltyScore()}/>
    );

storiesOf('Referee Panel|Team Info', module)
    .add('stateful', () =>
        <TeamInfo state={new Team()}/>
    );

storiesOf('Referee Panel|Randomization Results', module)
    .add('Die 1', () => <RandomizationResults number={1}/>)
    .add('Die 2', () => <RandomizationResults number={2}/>)
    .add('Die 3', () => <RandomizationResults number={3}/>)
    .add('Die 4', () => <RandomizationResults number={4}/>)
    .add('Die 5', () => <RandomizationResults number={5}/>)
    .add('Die 6', () => <RandomizationResults number={6}/>);

storiesOf('Referee Panel|Randomization Selector', module)
    .add('uninitialized', () => <RandomizationSelector onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <RandomizationSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Misc|Global Config', module)
    .add('stateful', () => (
        <Config globalConfig={new GlobalPanelsConfig()} panelConfig={new PanelConfig()}
                onChangeGlobal={(v) => store.set({globalConfig: v})}/>
    ));

const exampleMatch = {"id":1,"modifyDate":{"nano":401121000,"year":2018,"monthValue":6,"dayOfMonth":20,"hour":14,"minute":54,"second":38,"month":"june","dayOfWeek":"wednesday","dayOfYear":171,"chronology":{"id":"ISO","calendarType":"iso8601"}},"number":"Q-1","field":0,"revision":0,"random":0,"scoringSystemRaw":"1|1|1|17|1517155345494|1517155445914|1517155496661|1517155509170|1517155633117|1517156687680|1517156771998|1517157154768|1518401783056|1518402658100|1518402836626|1518403259435|1518403371947|1518409461951|1518570912685|1525814461216|1525814623770||5495|13496|0|5452|10630|0|0|0|0|false|false|false|0|0|0|false|false|false|0|0|0|0|0|0|1|1|2|0|2|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|13|4|3|1|0|0|1|1|1|0|0|0|0","redAlliance":[{"number":5495,"noShow":false,"yellowCard":false,"redCard":false,"participating":true},{"number":13496,"noShow":false,"yellowCard":false,"redCard":false,"participating":true}],"blueAlliance":[{"number":5452,"noShow":false,"yellowCard":false,"redCard":false,"participating":true},{"number":10630,"noShow":false,"yellowCard":false,"redCard":false,"participating":true}],"redScore":{"submitted":false,"autoSubmitted":true,"finalized":false,"auto":{"r1Pos":null,"r2Pos":null,"jewel1Remaining":null,"jewel2Remaining":null,"cryptobox1State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox2State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox3State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]]},"teleop":{"cryptobox1State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox2State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox3State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]]},"endgame":{"r1Pos":null,"r2Pos":null,"relic1State":{"position":null,"orientation":null},"relic2State":{"position":null,"orientation":null},"relic3State":{"position":null,"orientation":null}},"penalties":{"minor":0,"major":0}},"blueScore":{"submitted":false,"autoSubmitted":false,"finalized":false,"auto":{"r1Pos":null,"r2Pos":null,"jewel1Remaining":null,"jewel2Remaining":null,"cryptobox1State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox2State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox3State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]]},"teleop":{"cryptobox1State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox2State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]],"cryptobox3State":[["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"],["empty","empty","empty"]]},"endgame":{"r1Pos":null,"r2Pos":null,"relic1State":{"position":null,"orientation":null},"relic2State":{"position":null,"orientation":null},"relic3State":{"position":null,"orientation":null}},"penalties":{"minor":0,"major":0}}}
storiesOf('Panels|MatchScore', module)
  .add('stateful auto', () =>
    <MatchScore state={new Match().init(exampleMatch)} displayTeamInfo alliance="red"/>
  );