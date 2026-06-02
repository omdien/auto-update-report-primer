import express from "express";
import * as primerController from "../controllers/primer-controller.js";

const router = express.Router();

router.get("/primer-rincian", primerController.getExportRincian);
// ... import controller
router.get("/download-excel-rincian", primerController.exportExcelRincian);

router.post('/sync-export', primerController.syncExportRincian);   // trigger manual
// atau GET jika lebih mudah di-test via browser:
router.get('/sync-export', primerController.syncExportRincian);

export default router;