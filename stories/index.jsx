import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Resizeable from '../src/Resizeable';

const stories = storiesOf('Resizeable', module);

stories.addDecorator(withKnobs);

stories.add('test', () => (
  <Resizeable isSyncUpdate={boolean('isSyncUpdate', false)}>
    <div style={{ background: 'grey' }}>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
    </div>
  </Resizeable>
));
