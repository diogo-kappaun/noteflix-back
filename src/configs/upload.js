import path from "path"
import Path from "./src/utils/Path.js"
import multer from "multer"

export const TMP_FOLDER = path.resolve(Path.dirname(import.meta.url), "tmp")
export const UPLOADS_FOLDER = path.resolve(Path.dirname(import.meta.url), "tmp", "uploads" )

export const MULTER = {
	storage: multer.diskStorage({
		destination: TMP_FOLDER,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString("hex")
			const fileName = `${fileHash}-${file.originalname}`

			return callback(null, fileName)
		}
	})
}