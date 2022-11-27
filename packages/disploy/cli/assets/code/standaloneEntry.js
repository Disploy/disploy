import { App } from 'disploy';
import { Commands } from './Commands';
import { Handlers } from './Handlers';

const app = new App();

export default { app, commands: Commands, handlers: Handlers };
