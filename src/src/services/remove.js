import { errorMessage } from "../utils/const.js";
import { transformArgs } from "../utils/transformArgs.js";
import { readFile } from "fs/promises"
import { deleteFile } from "../utils/deleteFile.js";


export async function remove(args) {
	if (!args.toString().trim().length) {
		return errorMessage();
	}

	const dir = transformArgs(args);

    try {
        await readFile(dir);
        await deleteFile(dir);
        console.info("File delete")
    } catch (error) {
        errorMessage('File not find')
    } 
}
