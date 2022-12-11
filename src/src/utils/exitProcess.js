import { platform , EOL } from 'os'

export function exit (username) {
    console.log(EOL, `\x1b[33mThank you for using File Manager, ${username},\x1b[33m goodbye! 📢 \x1b[0m`);
    process.exit(0);
}

export const exitProcess = ({rl, username}) => {
    if (platform() === 'linux') {
        rl.on('SIGTSTP', function () {
            exit(username);
        })
    } else if (platform() === 'win32') {
        rl.on('SIGINT', function () {
            exit(username);
        })
    } else {
        console.log('📢 SORRY!!! ERROR EVENT!!!');
    }
}

