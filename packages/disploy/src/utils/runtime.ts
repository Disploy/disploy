const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export const RuntimeConstants = {
	isNode,
};
