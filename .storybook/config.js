import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";

setOptions({
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
});

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
