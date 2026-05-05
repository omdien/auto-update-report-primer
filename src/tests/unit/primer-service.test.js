import { jest } from '@jest/globals';

// 1. Mock harus dilakukan SEBELUM import service yang akan dites
jest.unstable_mockModule("../../repositories/primer-repository.js", () => ({
    fetchAllReportPrimerData: jest.fn(),
}));

// 2. Gunakan dynamic import agar mock di atas terpasang lebih dulu
const { getExportRincianService } = await import("../../services/primer-service.js");
const reportRepository = await import("../../repositories/primer-repository.js");

describe("Primer Service Integration Test", () => {
    
    test("Harus mengembalikan data dengan mapping dan default value yang benar", async () => {
        const mockRawData = [
            {
                idchecklist: "123",
                tgl_izin: "2026-04-17",
                komoditas: null, 
                total_sesuai: null
            }
        ];

        // Set nilai balik untuk mock
        reportRepository.fetchAllReportPrimerData.mockResolvedValue(mockRawData);

        const filters = { tgl_awal: '2026-01-01', tgl_akhir: '2026-04-17' };
        const result = await getExportRincianService(filters);

        expect(result[0].idchecklist).toBe("123");
        expect(result[0].komoditas).toBe("-");
        expect(result[0].total_sesuai).toBe("0");
    });
});