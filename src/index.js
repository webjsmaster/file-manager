import Emitter from "events";
import { createInterface } from "readline";
import { EOL, homedir, platform } from "os";
import { exit, exitProcess } from "./src/utils/exitProcess.js";
import { router } from "./src/router.js";

export const emitter = new Emitter();

const args = Object.fromEntries(
	process.argv.slice(2).map((arg) => {
		const [key, value] = arg.split("=");
		return [key, value];
	})
);

process.chdir(homedir());

const username = args["--username"] ? `\x1b[35m ${args["--username"]} \x1b[0m` : "\x1b[31m stranger \x1b[0m";

console.log(`\x1b[33m Welcome to the File Manager, ${username}! \x1b[0m`, EOL);

let rl = createInterface(process.stdin, process.stdout);
rl.setPrompt(`\x1b[32m ${process.cwd()}>\x1b[0m`);
rl.prompt();

router(rl);

rl.on("SIGINT", () => rl.close());

rl.on("close", function () {
	exit(username);
});

exitProcess({ rl, username });
