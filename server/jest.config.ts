import { Config } from "@jest/types"
import { pathsToModuleNameMapper } from "ts-jest/utils"
import { compilerOptions } from "./tsconfig.json"

const config: Config.InitialOptions = {
	rootDir: "./",
	testRegex: ".*\\.spec\\.tsx?$",
	collectCoverageFrom: ["**/*.tsx?"],
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	coverageDirectory: "<rootDir>/coverage",
	moduleFileExtensions: ["ts", "tsx", "js", "node"],
	slowTestThreshold: 10,
	verbose: true,
	displayName: {
		name: "     Jest Bank System     ",
		color: "magenta",
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
}

export default config
