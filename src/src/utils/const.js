export const OPERATION_ERROR = '\x1b[31mOperation failed\x1b[0m';
export const INVALID_ERROR = '\x1b[33mInvalid input\x1b[0m';

export function errorMessage (message) {
    if (!message) {
        console.error(`\x1b[31mError: ${OPERATION_ERROR}\x1b[0m`);
    } else {
        console.error(`\x1b[31mError: ${message}\x1b[0m`);
    }
}