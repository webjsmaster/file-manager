import path from 'path';
import { writeFile } from "fs/promises"

export async function add (pathToDirectory) {
    const dir = path.isAbsolute(pathToDirectory)
    ? pathToDirectory
    : path.join(process.cwd(), pathToDirectory);


    try {
        await writeFile(dir, '', { flag: 'wx'});
        console.log('File created');
    } catch (err) {
        console.log('File already exists');
    }

}