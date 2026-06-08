// src/scheduler/kapal-scheduler.js

import cron from "node-cron";
import { getSertifikatKapalReport } from "../services/kapal-service.js";
import { bulkInsertCpibKapal } from "../repositories/kapal-repository.js";

/**
 * Mapping field: service output → model tb_cpib_kapal
 * Dipisah agar runKapalScheduler tetap bersih & mudah dibaca
 */
const mapToModelRow = (item) => ({
    no_cbib:            item.no_cbib,
    nama_kapal:         item.nama_kapal          || null,
    nib:                item.nib                 || null,
    alamat:             item.alamat              || null,
    gt:                 item.gt                  || null,
    tipe_kapal:         item.tipe_kapal          || null,
    tgl_permohonan:     item.tgl_permohonan      || null,
    tgl_spt:            item.tgl_spt             || null,
    tgl_awal_inspeksi:  item.tgl_awal_inspeksi   || null,
    tgl_akhir_inspeksi: item.tgl_akhir_inspeksi  || null,
    tgl_laporan:        item.tgl_laporan         || null,
    jenis_produk:       item.jenis_produk        || null,
    grade_scpib:        item.grade_scpib         || null,
    tgl_terbit:         item.tgl_terbit          || null,
    tgl_kadaluarsa:     item.tgl_kadaluarsa      || null,
    upt_inspeksi:       item.upt_inspeksi        || null,
    nama_pelabuhan:     item.nama_pelabuhan      || null,
    kode_provinsi:      item.kode_provinsi       || null,
    nama_provinsi:      item.nama_provinsi       || null,
    status_pemasok:     item.status_pemasok      || null,
    nama_pemilik:       item.nama_pemilik        || null,
    telepon:            item.telp_pemilik        || null, // service=telp_pemilik → model=telepon
    nahkoda_kapal:      item.nahkoda_kapal       || null,
    jumlah_abk:         item.jumlah_abk          || null,
    alat_tangkap:       item.alat_tangkap        || null,
    // daerah_tangkap → tidak ada di model, di-skip
    no_siup:            item.no_siup             || null,
    tgl_siup:           item.tgl_siup            || null,
    no_kbli:            item.no_kbli             || null,
    no_skpp_bkp_nk:     item.no_skkp_bkp_nk     || null, // service=no_skkp → model=no_skpp
    tgl_skpp_bkp_nk:    item.tgl_skkp_bkp_nk    || null, // service=tgl_skkp → model=tgl_skpp
    pj_pusat:           item.pj_pusat            || null,
});

/**
 * Fungsi utama: ambil data dari service, lalu insert ke tb_cpib_kapal
 * Duplikat di-skip otomatis berdasarkan UNIQUE constraint no_cbib
 */
export const runKapalScheduler = async () => {
    console.log(`[KAPAL SCHEDULER] ▶ Mulai: ${new Date().toISOString()}`);

    try {
        // 1. Ambil semua data (full sync, tanpa filter tanggal)
        const data = await getSertifikatKapalReport({});

        if (!data || data.length === 0) {
            console.warn("[KAPAL SCHEDULER] ⚠ Tidak ada data dari service.");
            return;
        }
        console.log(`[KAPAL SCHEDULER] ✔ Data diterima: ${data.length} record`);

        // 2. Map ke format model
        const rows = data.map(mapToModelRow);

        // 3. Filter: buang row dengan no_cbib kosong/null
        const validRows  = rows.filter(r => r.no_cbib?.trim());
        const invalidCount = rows.length - validRows.length;
        if (invalidCount > 0) {
            console.warn(`[KAPAL SCHEDULER] ⚠ ${invalidCount} record dilewati (no_cbib kosong/null)`);
        }

        // 4. Insert via repository — duplikat di-skip, log akurat
        const { inserted, skipped } = await bulkInsertCpibKapal(validRows);

        console.log(`[KAPAL SCHEDULER] ✅ Selesai.`);
        console.log(`   • Total dari service  : ${data.length}`);
        console.log(`   • Valid (no_cbib ada) : ${validRows.length}`);
        console.log(`   • Berhasil diinsert   : ${inserted}`);
        console.log(`   • Duplikat di-skip    : ${skipped}`);

    } catch (error) {
        console.error("[KAPAL SCHEDULER] ❌ Error:", error.message);
        console.error(error);
    }
};

/**
 * Mendaftarkan scheduler ke node-cron
 * Berjalan setiap hari jam 00:00:00 WIB
 */
export const initKapalScheduler = () => {
    cron.schedule("00 00 * * *", async () => {
        console.log("[KAPAL SCHEDULER] 🕛 Triggered oleh cron (00:00 WIB)");
        await runKapalScheduler();
    }, {
        timezone: "Asia/Jakarta"
    });

    console.log("[KAPAL SCHEDULER] ✔ Scheduler terdaftar — jalan tiap 00:00 WIB");
};