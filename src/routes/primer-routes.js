import express from "express";
import * as primerController from "../controllers/primer-controller.js";

const router = express.Router();

router.get("/primer-rincian", primerController.getExportRincian);
// ... import controller
router.get("/download-excel-rincian", primerController.exportExcelRincian);

export default router;