import { errorMessage, transformArgs } from "../utils/index.js";
import { createReadStream, createWriteStream, statSync } from "fs";
import { createBrotliCompress, createBrotliDecompress, constants } from "zlib";
import { readFile } from "fs/promises";
import { promisify } from "util";
import { pipeline } from "stream";

export async function compressDecompress({args, decompress}) {
	const dir = transformArgs(args);
	const zipName = dir + ".gz";
	const unZipName = dir.split(".").slice(0, -1).join(".");

	if (!args.toString().trim().length) {
		return errorMessage();
	}

	const pipe = promisify(pipeline);

	async function do_gzip(input, output) {
		const zip = decompress
			? createBrotliDecompress()
			: createBrotliCompress({
					chunkSize: 32 * 1024,
					params: {
						[constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
						[constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
						[constants.BROTLI_PARAM_SIZE_HINT]: statSync(dir).size,
					},
			  });

		const source = createReadStream(input);
		const destination = createWriteStream(output);
		await pipe(source, zip, destination);
	}

	try {
		await readFile(dir);
		await do_gzip(dir, decompress ? unZipName : zipName);
		console.log(`${decompress ? "Decompress" : "Compress"} operation success!`);
	} catch (error) {
		errorMessage('File not find');
	}
}
