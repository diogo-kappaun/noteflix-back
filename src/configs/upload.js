import path from "path"
import Path from "../utils/Path.js"
import multer from "multer"

const TMP_FOLDER = path.resolve(Path.dirname(import.meta.url), "tmp")
const UPLOADS_FOLDER = path.resolve(Path.dirname(import.meta.url), "tmp", "uploads" )

const MULTER = {
	storage: multer.diskStorage({
		destination: TMP_FOLDER,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString("hex")
			const fileName = `${fileHash}-${file.originalname}`

			return callback(null, fileName)
		}
	})
}

export default {
	TMP_FOLDER,
	UPLOADS_FOLDER,
	MULTER
}