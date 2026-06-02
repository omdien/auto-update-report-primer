import * as reportRepository from "../repositories/primer-repository.js";

export const getExportRincianService = async (filters) => {
    // 1. Tarik data secara paralel (lebih cepat daripada satu-satu)
    const [rows, propinsiList] = await Promise.all([
        reportRepository.fetchAllReportPrimerData(filters),
        reportRepository.fetchAllPropinsi()
    ]);

    // 2. "Pivot" data propinsi ke dalam Map untuk pencarian instan
    // Hasilnya akan seperti: { "11": "ACEH", "35": "JAWA TIMUR", ... }
    const propinsiMap = propinsiList.reduce((acc, curr) => {
        acc[curr.KODE_PROPINSI] = curr.URAIAN_PROPINSI;
        return acc;
    }, {});

    // 3. Mapping data akhir
    return rows.map(row => {
        const item = row.get({ plain: true });
        const fileData = item.tb_pbumku_laporan_header?.tb_pbumku_laporan_file;

        // Ambil 2 digit pertama kd_daerah
        const kodePrefix = item.kd_daerah ? item.kd_daerah.substring(0, 2) : "";

        return {
            idchecklist: item.idchecklist,
            tgl_izin: item.tgl_izin,
            id_izin: item.id_izin,
            jenis_izin: item.jenis_izin,
            kd_izin: item.kd_izin,
            ur_izin_singkat: item.ref_perizinan?.ur_izin_singkat || "-",
            kd_daerah: item.kd_daerah,
            nama_izin: item.nama_izin,
            no_izin: item.no_izin,
            nib: item.nib,
            tgl_permohonan: item.tgl_permohonan,
            status_checklist: item.status_checklist,
            sts_aktif: item.sts_aktif,

            // Data Lampiran (Komoditas)
            komoditas: item.tr_pbumku_laporan_lampiran?.komoditas || "-",
            no_referensi: item.tr_pbumku_laporan_lampiran?.nomor_referensi_teknis || "-",

            // Ambil dari Map hasil pivot
            provinsi: propinsiMap[kodePrefix] || "Unknown",

            // Data Proyek
            kbli: item.v_oss_proyek?.kbli || "-",
            uraian_usaha: item.v_oss_proyek?.uraian_usaha || "-",

            // Data Perseroan (v_oss_header)
            npwp_perseroan: item.v_oss_header?.npwp_perseroan || "-",
            nama_perseroan: item.v_oss_header?.nama_perseroan || "-",
            alamat_perseroan: item.v_oss_header?.alamat_perseroan || "-",
            rt_rw_perseroan: item.v_oss_header?.rt_rw_perseroan || "-",
            kelurahan_perseroan: item.v_oss_header?.kelurahan_perseroan || "-",
            perseroan_daerah_id: item.v_oss_header?.perseroan_daerah_id || "-",
            kode_pos_perseroan: item.v_oss_header?.kode_pos_perseroan || "-",
            nomor_telpon_perseroan: item.v_oss_header?.nomor_telpon_perseroan || "-",
            email_perusahaan: item.v_oss_header?.email_perusahaan || "-",

            // Hasil Penilaian (Sesuai Debug Log Anda)
            total_sesuai: fileData?.total_sesuai ?? "0",
            total_minor: fileData?.total_minor ?? "0",
            total_mayor: fileData?.total_mayor ?? "0",
            total_kritis: fileData?.total_kritis ?? "0",
            total_hasil: fileData?.total_hasil ?? "-",
            keterangan: fileData?.keterangan || "-"
        };
    });
};

/**
 * Service untuk sinkronisasi data ke tabel tr_laporan_primer_export.
 * Hanya insert data yang idchecklist-nya belum ada di tabel tujuan.
 * 
 * @param {Object} filters - { tgl_awal, tgl_akhir }
 * @returns {Object} { total_fetched, total_skipped, total_inserted }
 */
export const syncExportRincianService = async (filters) => {
    // 1. Tarik data sumber + propinsi + existing IDs secara paralel
    const [rows, propinsiList, existingIds] = await Promise.all([
        reportRepository.fetchAllReportPrimerData(filters),
        reportRepository.fetchAllPropinsi(),
        reportRepository.fetchExistingIdChecklist()
    ]);

    // 2. Pivot propinsi map
    const propinsiMap = propinsiList.reduce((acc, curr) => {
        acc[curr.KODE_PROPINSI] = curr.URAIAN_PROPINSI;
        return acc;
    }, {});

    // 3. Map & filter — hanya data yang belum ada
    const newRows = [];
    const skippedIds = [];

    for (const row of rows) {
        const item = row.get({ plain: true });

        // Skip jika idchecklist sudah ada
        if (existingIds.has(item.idchecklist)) {
            skippedIds.push(item.idchecklist);
            continue;
        }

        const fileData = item.tb_pbumku_laporan_header?.tb_pbumku_laporan_file;
        const kodePrefix = item.kd_daerah ? item.kd_daerah.substring(0, 2) : "";

        newRows.push({
            idchecklist: item.idchecklist,
            tgl_izin: item.tgl_izin,
            id_izin: item.id_izin,
            jenis_izin: item.jenis_izin,
            kd_izin: item.kd_izin,
            ur_izin_singkat: item.ref_perizinan?.ur_izin_singkat || "-",
            kd_daerah: item.kd_daerah,
            nama_izin: item.nama_izin,
            no_izin: item.no_izin,
            nib: item.nib,
            tgl_permohonan: item.tgl_permohonan,
            status_checklist: item.status_checklist,
            sts_aktif: item.sts_aktif,
            komoditas: item.tr_pbumku_laporan_lampiran?.komoditas || "-",
            no_referensi: item.tr_pbumku_laporan_lampiran?.nomor_referensi_teknis || "-",
            uraian_propinsi: propinsiMap[kodePrefix] || "Unknown", // ⚠️ field di tabel: uraian_propinsi (bukan provinsi)
            kbli: item.v_oss_proyek?.kbli || "-",
            uraian_usaha: item.v_oss_proyek?.uraian_usaha || "-",
            npwp_perseroan: item.v_oss_header?.npwp_perseroan || "-",
            nama_perseroan: item.v_oss_header?.nama_perseroan || "-",
            alamat_perseroan: item.v_oss_header?.alamat_perseroan || "-",
            rt_rw_perseroan: item.v_oss_header?.rt_rw_perseroan || "-",
            kelurahan_perseroan: item.v_oss_header?.kelurahan_perseroan || "-",
            perseroan_daerah_id: item.v_oss_header?.perseroan_daerah_id || "-",
            kode_pos_perseroan: item.v_oss_header?.kode_pos_perseroan || "-",
            nomor_telpon_perseroan: item.v_oss_header?.nomor_telpon_perseroan || "-",
            email_perusahaan: item.v_oss_header?.email_perusahaan || "-",
            total_sesuai: fileData?.total_sesuai ?? "0",
            total_minor: fileData?.total_minor ?? "0",
            total_mayor: fileData?.total_mayor ?? "0",
            total_kritis: fileData?.total_kritis ?? "0",
            total_hasil: fileData?.total_hasil ?? "-",
            keterangan: fileData?.keterangan || "-",
            sumber_data: "SISTEM",
            // tgl_tarik_data otomatis terisi current_timestamp dari DB
        });
    }

    // 4. Bulk insert data baru
    const { inserted } = await reportRepository.bulkInsertExportData(newRows);

    return {
        total_fetched: rows.length,
        total_skipped: skippedIds.length,
        total_inserted: inserted
    };
};

/**
 * POST /api/primer/sync-export
 * Trigger manual sinkronisasi data ke tr_laporan_primer_export
 * Query: ?tgl_awal=2026-01-01&tgl_akhir=2026-04-17
 */
export const syncExportRincian = async (req, res) => {
    try {
        const { tgl_awal, tgl_akhir } = req.query;

        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir wajib diisi."
            });
        }

        console.log(`[SYNC] Mulai sinkronisasi: ${tgl_awal} s/d ${tgl_akhir}`);

        const result = await primerService.syncExportRincianService({ tgl_awal, tgl_akhir });

        console.log(`[SYNC] Selesai:`, result);

        return res.status(200).json({
            status: "success",
            message: "Sinkronisasi data berhasil.",
            ...result
        });

    } catch (error) {
        console.error("[SYNC] Error:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat sinkronisasi data."
        });
    }
};