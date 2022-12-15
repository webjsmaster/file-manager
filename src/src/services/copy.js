import { errorMessage, OPERATION_ERROR } from "../utils/const.js";
import { transformArgsAdd } from "../utils/transformArgs.js";
import { pipeline, finished } from 'stream';
import { createReadStream, createWriteStream, stat, open, access } from "fs";

import path from "path";


export async function copy(args) {
	return new Promise((resolve) => {
		const dir = transformArgsAdd(args);

        if(!dir || !dir.one_file){
            resolve(console.error(OPERATION_ERROR));
        }

		open(dir.one_file, 'r', function (err) {
			if (!err) {
				access(dir.two_file, function (err) {
					if (!err) {
						stat(path.resolve(dir.two_file, dir.arg_one), function (err) {
							if (err) {
								const readStream = createReadStream(dir.one_file);
								const writeStream = createWriteStream(path.resolve(dir.two_file, dir.arg_one));
								readStream.pipe(writeStream);
							
								readStream.on("data", () => {
									resolve(console.log(`File copied ${dir.two_file}`));
								});	
							} else {
								resolve(errorMessage('The file already exists in the destination folder'));
							}
						})
					} else {
						resolve(errorMessage('Destination folder not find'))
					}
				})
			} else {
				resolve(errorMessage('File not find'))
			}
		})


	});
}
