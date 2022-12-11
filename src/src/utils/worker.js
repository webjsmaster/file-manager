import { parentPort, workerData } from 'worker_threads';
import fs from "fs/promises";

const worker = async () => {
    const stat = await fs.lstat(workerData);
    const type = stat.isFile() === true ? 'file' : 'directory' 
    parentPort.postMessage({Name: workerData, Type: type})
}
worker();