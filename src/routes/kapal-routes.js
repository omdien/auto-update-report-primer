import express from "express";

import * as kapalController from "../controllers/kapal-controller.js";

const router = express.Router();

// Endpoint untuk preview data
router.get("/rincian-kapal", kapalController.getRincianKapal);

// Endpoint untuk download excel
router.get("/export-kapal", kapalController.exportSertifikatKapalToExcel);

export default router;
