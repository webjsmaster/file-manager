import path from "path";

export function transformArgsAdd(args) {
	if (args.toString().startsWith("'")) {
		const arrArgs = args.join(" ").trim().split("'");
		

		console.log(arrArgs);

		if (arrArgs.length === 3) {
			return path.resolve(arrArgs[1]);
		} else if (arrArgs.length === 5) {
			return {
				one_file: path.resolve(arrArgs[1].trim()),
				two_file: path.resolve(arrArgs[3].trim()),
			};
		}
	} else {
		return path.resolve(args.join(" ").trim().toString());
	}
}
