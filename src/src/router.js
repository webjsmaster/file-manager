import { EOL, platform } from "os";
import { cat } from "./services/cat.js";
import { cd } from "./services/cd.js";
import { ls } from "./services/ls.js";
import { up } from "./services/up.js";



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
                await cat(args, rl);
                break;
            }
            case "em": {
                console.log('__dirname');
                break;
            };

            case "close": {
                
                //console.log(`Thank you for using File Manager, ${homedir}!`);
                rl.close()
                break;
            };
            default: {
                console.log("Incorrect message!!!!");
                break;
            };
        }
        console.log(`You are currently in ${process.cwd()}`);
        rl.setPrompt(`\x1b[32m ${process.cwd()}>-----\x1b[0m`);
        rl.prompt();
    })
}