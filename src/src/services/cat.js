import { createReadStream } from 'fs';
import { EOL} from 'os'
import { OPERATION_ERROR } from '../utils/const.js';


export async function cat (file, rl) {

    try {
        const pathFile = process.cwd() + '/' + file;
        const readStream = await createReadStream(pathFile);

        readStream.on('data', (chunk) => {
            console.log(EOL);
            process.stdout.write(chunk)
        });

        readStream.on('end', () => {
            rl.prompt();
        })

        readStream.on('error', () => {
            console.error(EOL, OPERATION_ERROR);
            rl.prompt();
        })

    } catch (error) {
        console.log('error', OPERATION_ERROR);
    }


    



}