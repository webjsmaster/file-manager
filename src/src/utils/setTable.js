import { Worker } from "worker_threads";
import { dirPath } from "./dirPath.js";



export async function setTable(files) {
	const workerFile = `${await dirPath(import.meta.url)}/worker.js`;

	const arrResult = await Promise.all(
		files.map((file) => {
			return new Promise((res) => {
				const worker = new Worker(workerFile, {
					workerData: file,
				});
				worker.on("message", (msg) => res(msg));
			});
		})
	);
	return arrResult;
}
