//@flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { withState } from '@dump247/storybook-state';

import Counter from '../widgets/Counter.js';
import AutoRobotSelector from '../components/relicRecovery/AutoRobotSelector.js';
import EndgameRobotSelector from '../components/relicRecovery/EndgameRobotSelector.js';
import AutoJewelSelector from '../components/relicRecovery/AutoJewelSelector.js';
import RelicSelector from '../components/relicRecovery/RelicSelector.js';
import EndgameSelector from "../components/relicRecovery/EndgameSelector";
import CryptoboxSelector from "../components/relicRecovery/CryptoboxSelector";
import AutoSelector from "../components/relicRecovery/AutoSelector";
import TeleopSelector from "../components/relicRecovery/TeleopSelector";
import PenaltySelector from "../components/referee/PenaltySelector";
import RandomizationResults from "../components/relicRecovery/RandomizationResults";
import RandomizationSelector from "../components/relicRecovery/RandomizationSelector";
import GlobalConfig from "../components/panel/GlobalConfig";

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Widgets|Counter', module)
  .add('with text', withState({value: 1}, (store) => (
      <Counter {...store.state} onChange={(v) => store.set({value: v})}/>
  )));
  // .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Game Element Selectors|Auto Robot Selector', module)
    .add('uninitialized', () => <AutoRobotSelector onChange={action('changed')}/>)
    .add('not safe', () => <AutoRobotSelector position="notsafe" onChange={action('changed')}/>)
    .add('safe', () => <AutoRobotSelector position="safe" onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <AutoRobotSelector {...store.state} onChange={(v) => store.set({position: v})}/>
    )));

storiesOf('Game Element Selectors|Endgame Robot Selector', module)
    .add('uninitialized', () => <EndgameRobotSelector onChange={action('changed')}/>)
    .add('not balanced', () => <EndgameRobotSelector position="unbalanced" onChange={action('changed')}/>)
    .add('balanced', () => <EndgameRobotSelector position="balanced" onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <EndgameRobotSelector {...store.state} onChange={(v) => store.set({position: v})}/>
    )));


storiesOf('Game Element Selectors|Auto Jewel Selector', module)
    .add('uninitialized', () => <AutoJewelSelector onChange={action('changed')}/>)
    .add('red', () => <AutoJewelSelector color="red" onChange={action('changed')}/>)
    .add('blue', () => <AutoJewelSelector color="blue" onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <AutoJewelSelector {...store.state} onChange={(v) => store.set({color: v})}/>
    )));

storiesOf('Game Element Selectors|Relic Selector', module)
    .add('uninitialized', () => <RelicSelector onChange={action('changed')}/>)
    .add('none', () => <RelicSelector state={{position: "none", orientation: "na"}} onChange={action('changed')}/>)
    .add('z1 unselected', () => <RelicSelector state={{position: "zone1", orientation: null}} onChange={action('changed')}/>)
    .add('z1 upright', () => <RelicSelector state={{position: "zone1", orientation: "upright"}} onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <RelicSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

const emptyRow = ['empty', 'empty', 'empty'];
const randomCryptobox = [
    ['empty', 'empty', 'brown'],
    ['brown', 'empty', 'gray'],
    ['empty', 'gray', 'empty'],
    emptyRow,
];
const cipherCryptobox = [
    ['brown', 'gray', 'brown'],
    ['gray', 'brown', 'gray'],
    ['brown', 'gray', 'brown'],
    ['gray', 'brown', 'gray'],
];
const partialCryptobox = [
    ['empty', 'empty', 'brown'],
    ['brown', 'empty', 'gray'],
    ['gray', 'gray', 'brown'],
    ['gray', 'brown', 'brown'],
];


storiesOf('Game Element Selectors|Cryptobox Selector', module)
    .add('uninitialized', () => <CryptoboxSelector onChange={action('changed')}/>)
    .add('misc colors', () => <CryptoboxSelector
        state={randomCryptobox}
        onChange={action('changed')}/>)
    .add('cipher', () => <CryptoboxSelector
        state={cipherCryptobox}
        onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <CryptoboxSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Phase Selectors|Autonomous Selector', module)
    .add('uninitialized', () => <AutoSelector onChange={action('changed')}/>)
    .add('initialized', () => <AutoSelector
        state={{
            r1Pos: "safe",
            r2Pos: null,
            jewel1Remaining: "both",
            jewel2Remaining: "red",
            cryptobox1State: [
                emptyRow, emptyRow, emptyRow,
                ['empty', 'brown', 'empty'],
            ],
            cryptobox2State: [
                emptyRow, emptyRow, emptyRow,
                ['gray', 'empty', 'empty'],
            ]
        }}
        onChange={action('changed')}
    />)
    .add('stateful', withState({}, (store) => (
        <AutoSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Phase Selectors|Teleop Selector', module)
    .add('uninitialized', () => <TeleopSelector onChange={action('changed')}/>)
    .add('initialized', () => <TeleopSelector
        state={{
            cryptobox1State: partialCryptobox,
            cryptobox2State: cipherCryptobox
        }}
        onChange={action('changed')}
    />)
    .add('stateful', withState({}, (store) => (
        <TeleopSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Phase Selectors|Endgame Selector', module)
    .add('uninitialized', () => <EndgameSelector onChange={action('changed')}/>)
    .add('initialized', () => <EndgameSelector
        state={{
            relic1State: {position: "zone2", orientation: "upright"},
            relic2State: {position: "none", orientation: "na"},
            r1Pos: "unbalanced",
            r2Pos: null
        }}
        onChange={action('changed')}
    />)
    .add('stateful', withState({}, (store) => (
        <EndgameSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Phase Selectors|Penalty Selector', module)
    .add('uninitialized', () => <PenaltySelector onChange={action('changed')}/>)
    .add('initialized', () => <PenaltySelector
        state={{
            minorPenalties: 2,
            majorPenalties: 1,
        }}
        onChange={action('changed')}
    />)
    .add('stateful', withState({}, (store) => (
        <PenaltySelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Referee Panel|Randomization Results', module)
    .add('Die 1', () => <RandomizationResults number={1} />)
    .add('Die 2', () => <RandomizationResults number={2} />)
    .add('Die 3', () => <RandomizationResults number={3} />)
    .add('Die 4', () => <RandomizationResults number={4} />)
    .add('Die 5', () => <RandomizationResults number={5} />)
    .add('Die 6', () => <RandomizationResults number={6} />);

storiesOf('Referee Panel|Randomization Selector', module)
    .add('uninitialized', () => <RandomizationSelector onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <RandomizationSelector {...store.state} onChange={(v) => store.set({state: v})}/>
    )));

storiesOf('Misc|Global Config', module)
    .add('uninitialized', () => <GlobalConfig onChange={action('changed')}/>)
    .add('stateful', withState({}, (store) => (
        <GlobalConfig {...store.state} onChange={(v) => store.set({config: v})}/>
    )));