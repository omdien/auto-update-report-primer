// src/scheduler/primer-scheduler.js

import cron from 'node-cron';
import * as primerService from '../services/primer-service.js';

/**
 * Hitung rentang tanggal: 90 hari ke belakang s/d hari ini
 * Anda bisa sesuaikan rentang ini sesuai kebutuhan bisnis
 */
const getDefaultFilters = () => {
    const today = new Date();
    const pastDate = new Date();
    
    // Tarik mundur 90 hari (3 bulan) ke belakang dari hari ini
    pastDate.setDate(today.getDate() - 90); 

    const fmt = (d) => d.toISOString().split('T')[0]; // format YYYY-MM-DD

    return {
        tgl_awal: fmt(pastDate),
        tgl_akhir: fmt(today)
    };
};

/**
 * Jalankan sinkronisasi — bisa dipanggil oleh cron maupun manual
 */
export const runSync = async () => {
    const filters = getDefaultFilters();
    console.log(`[SCHEDULER] Memulai sync otomatis: ${filters.tgl_awal} s/d ${filters.tgl_akhir}`);

    try {
        const result = await primerService.syncExportRincianService(filters);
        console.log(`[SCHEDULER] Sync selesai:`, result);
    } catch (error) {
        console.error(`[SCHEDULER] Sync gagal:`, error.message);
    }
};

/**
 * Daftarkan cron job — setiap hari jam 00:00 (tengah malam)
 * Format: detik(opsional) menit jam hari bulan hari-minggu
 */
export const registerPrimerScheduler = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log(`[SCHEDULER] Cron triggered: ${new Date().toISOString()}`);
        await runSync();
    }, {
        timezone: "Asia/Jakarta" // ✅ Pastikan timezone WIB
    });

    console.log('[SCHEDULER] Primer export scheduler terdaftar — akan berjalan setiap jam 00:00 WIB');
};