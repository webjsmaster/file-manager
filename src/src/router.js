import { EOL } from "os";
import { add, cat,  cd, compressDecompress, copyAndRemove, hash, ls, os, remove, rename, up } from "./services/index.js";
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
                await cat(args);
                break;
            };
            case "add": {
                await add(args);
                break;
            };
            case "rn": {
                await rename(args);
                break;
            };
            case "cp": {
                await copyAndRemove({args});
                break;
            };
            case "mv": {
                await copyAndRemove({args, del: true});
                break;
            };
            case "rm": {
                await remove(args);
                break;
            };
            case "hash": {
                await hash(args);
                break;
            };
            case "compress": {
                await compressDecompress({args});
                break;
            };
            case "decompress": {
                await compressDecompress({args, decompress: true});
                break;
            };
            case "os": {
                await os(args);
                break;
            }
            case ".exit": {
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