import { parentPort, workerData } from 'worker_threads';
import fs from "fs/promises";

const worker = async () => {
    try {
        const stat = await fs.lstat(workerData);
        const type = stat.isFile() === true ? 'file' : stat.isDirectory() === true ? 'directory' : 'error'
        parentPort.postMessage({Name: workerData, Type: type})
    } catch (error) {
        parentPort.postMessage({Name: workerData, Type: 'undefined'})
    }

}
worker();