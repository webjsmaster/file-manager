import { rejects } from "assert";
import { Worker } from "worker_threads";
import { dirPath } from "./dirPath.js";



export async function setTable(files) {
	const workerFile = `${await dirPath(import.meta.url)}/workerForSetTable.js`;

	const arrResult = await Promise.all(
		files.map((file) => {
			return new Promise((res, rej) => {
				const worker = new Worker(workerFile, {
					workerData: file,
				});
				worker.on('message', (msg) => res(msg));
				worker.on('error', (msg) => rej(msg));
			});
		})
	);
	return arrResult;
}
