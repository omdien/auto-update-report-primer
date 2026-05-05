// ./src/tests/integration/primer-service.int.test.js

import { getExportRincianService } from "../../services/primer-service.js";

describe("Primer Service Integration Test (Database Asli)", () => {
    
    test("Harus berhasil menarik data nyata dari Database", async () => {
        // Gunakan filter yang sekiranya ada datanya di DB Anda
        const filters = { 
            tgl_awal: '2026-01-01', 
            tgl_akhir: '2026-12-31' 
        };

        try {
            const result = await getExportRincianService(filters);

            // Cek apakah hasilnya array (berarti koneksi DB sukses)
            expect(Array.isArray(result)).toBe(true);

            if (result.length > 0) {
                console.log(`Berhasil menarik ${result.length} data asli.`);
                // Pastikan struktur datanya sesuai mapping
                expect(result[0]).toHaveProperty('idchecklist');
                expect(result[0]).toHaveProperty('total_hasil');
            } else {
                console.log("Koneksi sukses, tapi memang tidak ada data untuk filter ini.");
            }
        } catch (error) {
            // Jika error koneksi DB, test ini akan otomatis gagal
            throw new Error(`Koneksi Database Gagal: ${error.message}`);
        }
    });
});