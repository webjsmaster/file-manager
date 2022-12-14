import path from 'path';

export function transformArgsAdd (args) {
    const trim  = args.join(' ').trim();

    if (args.toString().startsWith("'")) {
        return path.resolve(trim.split("'")[1]);
    } else {
        return path.resolve(trim.toString().trim());
    }
}