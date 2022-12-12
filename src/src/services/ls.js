import path from "path";
import fs from "fs/promises";
import { OPERATION_ERROR } from "../utils/const.js";
import { setTable } from "../utils/setTable.js";
import { filterSortTable } from "../utils/filterSortTable.js";


export async function ls() {
	try {
		const files = await fs.readdir(path.resolve(process.cwd()));
        let table = await setTable(files);

		const typeFile = filterSortTable(table, 'file');
		const typeUndefined = filterSortTable(table, 'undefined');
		const typeError = filterSortTable(table, 'error');
		const typeDirectory = filterSortTable(table, 'directory');
		
		let result = typeDirectory.concat(typeFile, typeUndefined, typeError)

		console.table(result);
	} catch (error) {
		console.error(OPERATION_ERROR);
	}
}
