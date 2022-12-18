import { errorMessage } from "../utils/const.js";
import { transformArgs } from "../utils/transformArgs.js";
import { createReadStream, createWriteStream } from "fs";

import { validationAndCheck } from "../utils/validationAndCheck.js";
import { deleteFile } from "../utils/deleteFile.js";
import path from "path";


export async function copyAndRemove({args, del}) {
	const dir = transformArgs(args);

	async function actionFile (file) {
		const readStream = createReadStream(dir.one_file);
		const writeStream = createWriteStream(path.resolve(dir.two_file, dir.arg_one));
		readStream.pipe(writeStream);

		readStream.on ('end', () => {
			if (del) {
				deleteFile(file);
			}
		})
	}

	let res = await validationAndCheck(dir.one_file, dir.two_file, path.resolve(dir.two_file, dir.arg_one));

	if (res === "open") {
		errorMessage("File not find");
	} else if (res === "access") {
		errorMessage("Destination folder not find");
	} else if (res?.dev) {
		errorMessage("The file already exists in the destination folder");
	} else  {
		await actionFile(dir.one_file);
		console.log(`File ${(del) ? 'moved' : 'copied'} ${dir.two_file}`);
	}
}
