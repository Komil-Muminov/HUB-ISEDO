import Router from "express";

import { createWorkingHours } from "./createWorkingHours";
import { upload } from "../../modules/multer/fileService";
import { getWorkingHours } from "./getWorkingHours";
import { getWorkingHoursById } from "./getWorkingHoursById";
import { updateWorkingHoursById } from "./updateWorkingHoursById";

const router = Router();

router.post("/", upload.array("files"), createWorkingHours);
router.get("/", getWorkingHours);
router.get("/:id", getWorkingHoursById);
router.put("/:id", updateWorkingHoursById);

export default router;
