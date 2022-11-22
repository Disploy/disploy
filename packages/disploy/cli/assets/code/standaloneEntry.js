import { App } from 'disploy';
import { Commands } from './commands';
import { Handlers } from './handlers';

const app = new App();

export default { app, commands: Commands, handlers: Handlers };
