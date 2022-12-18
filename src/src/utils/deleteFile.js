import { unlink } from "fs/promises";

export async function deleteFile (file) {
    unlink(file)
}