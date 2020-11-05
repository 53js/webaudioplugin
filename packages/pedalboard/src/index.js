import React from 'react';
import ReactDOM from 'react-dom';
import { WebAudioModule } from 'sdk';

import Pedalboard from './components/Pedalboard';
import PedalboardAudioNode from './audio/PedalboardAudioNode';

export default class PedalboardPlugin extends WebAudioModule {
	static descriptor = {
		name: 'Pedalboard',
		vendor: 'WebAudioModule',
	};

	// The plugin redefines the async method createAudionode()
	// that must return an <Audionode>
	// It also listen to plugin state change event to update the audionode internal state

	async createAudioNode(initialState) {
		const pedalboardAudioNode = new PedalboardAudioNode(this.audioContext);

		const paramsConfig = {
		};
		const internalParamsConfig = {
		};
		const paramsMapping = {
		};
		
		if (initialState) pedalboardAudioNode.setState(initialState);		
		return pedalboardAudioNode;
	}

	// eslint-disable-next-line class-methods-use-this
	createGui() {		
		const root = document.createElement('div');
		ReactDOM.render(<Pedalboard audioNode={this.audioNode}/>, root);
		return root;
	}
}