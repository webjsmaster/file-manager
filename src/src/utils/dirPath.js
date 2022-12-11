import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const dirPath = async (url) => {
    return dirname(fileURLToPath(url));
}