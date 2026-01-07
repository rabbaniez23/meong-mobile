import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import util from "util";
import { MultipartFile } from "@fastify/multipart";
import { v4 as uuidv4 } from "uuid";

const pump = util.promisify(pipeline);

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const saveFile = async (file: MultipartFile): Promise<string> => {
  const fileExtension = path.extname(file.filename);
  const fileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  await pump(file.file, fs.createWriteStream(filePath));

  // Return relative path or full URL depending on need.
  // Returning relative path to be served by static file server.
  return `/uploads/${fileName}`;
};
