import { OPERATION_ERROR } from "../utils/const.js";
import { transformArgsAdd } from "../utils/transformArgs.js";
import { createReadStream, createWriteStream } from "fs";

import path from "path";


export async function copy(args) {
	return new Promise((resolve) => {
		const dir = transformArgsAdd(args);

        if(!dir || !dir.one_path){
            resolve(console.error(OPERATION_ERROR));
        }
        console.log('args', args);

        console.log(dir.two_file);

        // console.log('📢 [copy.js:14]', dir.two_path.toString().length);

        // console.log(dir.two_path.toString().slice(dir.two_path.toString().length - 5));

        // const dir_to = dir.two_path.slice (dir.three_path)

        // console.log(dir_to);

        // console.log('📢 [copy.js:22]', path.resolve());

		const readStream = createReadStream(dir.one_path);
		// const writeStream = createWriteStream(dir.two_path);



        console.log(readStream);


		// readStream.pipe(writeStream);

		// readStream.on("end", () => {
		// 	resolve(console.log(`File copied ${dir.two_path}`));
		// });

		// readStream.on("data", () => {
		// 	resolve(console.log("data"));
		// });

		// readStream.on("error", () => {
		// 	resolve(console.error(OPERATION_ERROR));
		// });

        // writeStream.on('error', () => {
        //     resolve(console.error(OPERATION_ERROR));
        // })

	});
}
