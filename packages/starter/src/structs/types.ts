export interface StarterDatabaseResponse {
	type: string;
	base: string;
	starters: StarterPayload[];
}

export interface GitStarterDatabaseResponse extends StarterDatabaseResponse {
	repo: string;
}

export interface StarterPayload {
	name: string;
	description: string;
	base: string;
	extras: ExtraPayload[];
}

export interface ExtraPayload {
	name: string;
	description: string;
	location: string;
}

// {
//   "name": "{{name}}",
//   "version": "0.0.0",
//   "main": "dist/index.js",
//   "scripts": {
//     "dev": "tsc-watch --onSuccess \"node .\"",
//     "build": "tsc",
//     "start": "node ."
//   },
//   "scripts:with-playground": {
//     "test": "playground test"
//   },
//   "dependencies": {
//     "@sapphire/framework": "^3.0.0",
//     "@sapphire/decorators": "^4.3.8",
//     "@sapphire/plugin-logger": "^2.2.3",
//     "discord.js": "^13.10.2",
//     "dotenv": "^16.0.1"
//   },
//   "devDependencies": {
//     "@types/node": "^18.7.8",
//     "tsc-watch": "^5.0.3",
//     "typescript": "^4.7.4"
//   },
//   "devDependencies:with-playground": {
//     "@disploy/playground": "^1.0.0"
//   },
//   "tsconfig": {
//     "compilerOptions": {
//       "experimentalDecorators": true,
//       "module": "CommonJS",
//       "moduleResolution": "node",
//       "target": "ESNext",
//       "outDir": "dist",
//       "esModuleInterop": true,
//       "strict": true
//     }
//   }
// }

export interface PackageStarterJson {
	// Base
	name: string;
	version: string;
	main: string;
	scripts: Record<string, string>;
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	tsconfig: Record<string, unknown>;
}
