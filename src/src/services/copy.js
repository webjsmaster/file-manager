import { errorMessage, OPERATION_ERROR } from "../utils/const.js";
import { transformArgsAdd } from "../utils/transformArgs.js";
import { pipeline, finished } from "stream";
import { createReadStream, createWriteStream, stat, open, access } from "fs";

import path from "path";

export async function copy(args) {
	const dir = transformArgsAdd(args);

	return await Promise.all([
		new Promise((res, rej) => {
			open(dir.one_file, "r", function (err) {
				if (!err) {
					res('open');
				} else {
					rej("File not find");
				}
			});
		}).catch((res) => errorMessage(res)),
		new Promise((res, rej) => {
			access(dir.two_file, function (err) {
				if (!err) {
					res('access');
				} else {
					rej("Destination folder not find");
				}
			});
		}).catch((res) => errorMessage(res)),
		new Promise((res, rej) => {
			stat(path.resolve(dir.two_file, dir.arg_one), function (err) {
				if (err) {
					res('stat');
				} else {
					rej("The file already exists in the destination folder");
				}
			});
		}).catch((res) => errorMessage(res)),
	]).then((result) => {
		if (result.filter(res => res !== undefined).length === result.length){
			const readStream = createReadStream(dir.one_file);
			const writeStream = createWriteStream(path.resolve(dir.two_file, dir.arg_one));
			readStream.pipe(writeStream);

			readStream.on("data", () => {
				console.log(`File copied ${dir.two_file}`);
			});
		}
	})
}
