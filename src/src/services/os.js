import { errorMessage } from "../utils/const.js";
import { cpus, EOL, userInfo } from 'os'

export async function os(args) {
    try {
        const { username, homedir } = userInfo()

        const cpusInfo = cpus().map(({ model, speed }) => {
            return { model, speed: `${speed / 1000}GHz`}
        })

        const info = {
            '--EOL': JSON.stringify(EOL),
            '--cpus': cpusInfo,
            '--homedir': homedir,
            '--username': username,
            '--architecture': process.arch,
        }
        
        if (!info[args]) throw new Error('No such parameter')
    
        console.table(info[args]);
    } catch (error) {
        errorMessage(error.message);
    }
}