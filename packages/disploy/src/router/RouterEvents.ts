export const RouterEvents = {
	/**
	 * Emitted when a route run is finished.
	 * @tip Serverless functions will end the process after this event is emitted.
	 */
	FinishedRun(randId: string) {
		return `${randId}-finish`;
	},
	/**
	 * Emitted when a route run should respond.
	 * @tip Use this when you want to respond to a route run.
	 */
	Respond(interactionId: string) {
		return `${interactionId}-respond`;
	},
};
