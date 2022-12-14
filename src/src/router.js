import { EOL, platform } from "os";
import { add } from "./services/add.js";
import { cat } from "./services/cat.js";
import { cd } from "./services/cd.js";
import { ls } from "./services/ls.js";
import { up } from "./services/up.js";
import { INVALID_ERROR } from "./utils/const.js";



export const  router = async (rl) => {
    rl.on("line", async function (line) {
        let [command, ...args] = line.split(' ');

        switch (command) {
            case "cd": {
                cd(args);
                break;
            };    
            case "ls": {
                await ls();
                break;
            };
            case "up": {
                up();
                break;
            };
            case "cat": {
                await cat(args.toString());
                break;
            };
            case "add": {
                await add(args.toString());
                break;
            };

            case "close": {
                
                //console.log(`Thank you for using File Manager, ${homedir}!`);
                rl.close()
                break;
            };
            default: {
                console.log(INVALID_ERROR);
                break;
            };
        }
        console.log(`\x1b[36mYou are currently in ${process.cwd()}\x1b[0m`);
        rl.setPrompt(`\x1b[32m ${process.cwd()}>\x1b[0m`);
        rl.prompt();
    })
}