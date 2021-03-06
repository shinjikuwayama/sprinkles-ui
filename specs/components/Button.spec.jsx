/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Button from '../../src/components/Button';

describe('Button', function () {
  this.header(`
  ## Button
  `); // Markdown.

  before(() => {
    const handleClick = () => {
      this.props({
        working: true,
      });
    };
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <Button
        enabled={true}
        onClick={handleClick.bind(this)}
      />
    );
  });

  it('Set Working Indicator', () => this.props({ working: true }));
  it('Clear Working Indicator', () => this.props({ working: false }));
  it('Enable Button', () => this.props({ enabled: true }));
  it('Disable Button', () => this.props({ enabled: false }));
  it('Danger Button', () => this.props({ type: 'danger' }));
  it('Warning Button', () => this.props({ type: 'warning' }));
  it('Success Button', () => this.props({ type: 'success' }));
  it('Info Button', () => this.props({ type: 'info' }));
  it('Primary Button', () => this.props({ type: 'primary' }));
  it('Secondary (Default) Button', () => this.props({ type: 'secondary' }));
  it('Updates Button Text', () => this.props({ text: loremIpsum() }));
  it('Resets Button Text', () => this.props({ text: undefined }));
  it('Group Position: Left', () => this.props({ groupPosition: 'left' }));
  it('Group Position: Center', () => this.props({ groupPosition: 'center' }));
  it('Group Position: Right', () => this.props({ groupPosition: 'right' }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Button

  An Button Element

  #### API

  - **children** *React.PropTypes.node* (optional) overides text, render children of any kind inside the button
  - **text** *React.PropTypes.string* (optional) text value
  - **working** *React.PropTypes.bool* (optional) disable button and show it's working
  - **enabled** *React.PropTypes.bool* (optional) enable or disable the button, default is true

  `);
});
