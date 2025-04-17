import Router from "express";

import { createOrganization } from "./createOrganization";
import { deleteOrganization } from "./deleteOrganization";
import { upload } from "../../modules/multer/fileService";
import { getOrganizationById } from "./getOrganizationById";
import { getOrganizations } from "./getOrganizations";
import { CheckInn } from "./CheckInn";

const router = Router();

router.post("/", upload.array("files"), createOrganization);
router.get("/", getOrganizations);
router.get("/:id", getOrganizationById);
router.delete("/:id", deleteOrganization);
router.post("/checkinn", CheckInn);

export default router;
