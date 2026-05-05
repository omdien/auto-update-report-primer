import express from 'express';
import xprPrimerRoutes from "./routes/primer-routes.js";

const app = express();

app.use(express.json());

app.get("/test-koneksi", (req, res) => res.send("Pintu Utama Terbuka!"));

app.use("/api/export", xprPrimerRoutes); 

export default app;