import Router from "express";

import { createDocument } from "./createDocument";
import { getDocuments } from "./getDocuments";
import { upload } from "../../modules/multer/fileService";
import { getDocumentById } from "./getDocumentById";
import { updateDocumentById } from "./updateDocumentById";

const router = Router();

router.post("/", upload.array("files"), createDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.put("/:id", updateDocumentById);

export default router;
