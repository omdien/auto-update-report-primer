import express from 'express';
import xprPrimerRoutes from "./routes/primer-routes.js";
import kapalRoutes from "./routes/kapal-routes.js";

const app = express();

app.use(express.json());

app.get("/test-koneksi", (req, res) => res.send("Pintu Utama Terbuka!"));

app.use("/api/primer", xprPrimerRoutes); 
app.use("/api/kapal", kapalRoutes);

export default app;