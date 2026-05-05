import { jest } from '@jest/globals';

// 1. Mocking Service-nya agar tidak benar-benar menjalankan logika database
jest.unstable_mockModule("../../services/primer-service.js", () => ({
    getExportRincianService: jest.fn(),
}));

// Import controller dan service secara dinamis (untuk ESM)
const { getExportRincian } = await import("../../controllers/primer-controller.js");
const primerService = await import("../../services/primer-service.js");

describe("Primer Controller Unit Test", () => {
    
    // Objek mock untuk Request dan Response Express
    let req, res;

    beforeEach(() => {
        req = { query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    test("Harus kembali status 400 jika tgl_awal atau tgl_akhir kosong", async () => {
        req.query = { tgl_awal: '2026-01-01' }; // tgl_akhir tidak ada

        await getExportRincian(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining("harus diisi") })
        );
    });

    test("Harus kembali status 200 dan data jika parameter lengkap", async () => {
        req.query = { tgl_awal: '2026-01-01', tgl_akhir: '2026-04-17' };
        
        // Tentukan aturan (Expect) data palsu dari service
        const mockData = [{ idchecklist: "ABC", komoditas: "Udang" }];
        primerService.getExportRincianService.mockResolvedValue(mockData);

        await getExportRincian(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ status: "success", total_data: 1 })
        );
    });
});