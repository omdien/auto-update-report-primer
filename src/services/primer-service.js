import * as reportRepository from "../repositories/primer-repository.js";

/**
 * Service untuk mengambil, memproses, dan memformat data laporan rincian primer 
 * untuk keperluan export/tampilan.
 * 
 * @param {Object} filters - Objek filter tanggal dan parameter pencarian lainnya.
 */
export const getExportRincianService = async (filters) => {
    // 1. Tarik data dari database secara paralel (jauh lebih efisien & cepat dibanding berurutan)
    // - rows: Data transaksi utama beserta relasinya
    // - propinsiList: Data referensi seluruh provinsi
    const [rows, propinsiList] = await Promise.all([
        reportRepository.fetchAllReportPrimerData(filters),
        reportRepository.fetchAllPropinsi()
    ]);

    // 2. "Pivot" data propinsi ke dalam struktur Map/Object JavaScript untuk pencarian instan O(1)
    // Hasilnya akan berformat key-value: { "11": "ACEH", "35": "JAWA TIMUR", ... }
    const propinsiMap = propinsiList.reduce((acc, curr) => {
        acc[curr.KODE_PROPINSI] = curr.URAIAN_PROPINSI;
        return acc;
    }, {});

    // 3. Mapping data mentah Sequelize menjadi format objek yang bersih dan siap saji
    return rows.map(row => {
        // Ekstrak plain object dari instance model Sequelize
        const item = row.get({ plain: true });
        // Ambil data file secara aman dari relasi bertingkat (nested include)
        const fileData = item.tb_pbumku_laporan_header?.tb_pbumku_laporan_file;

        // Ambil 2 digit pertama dari kode daerah untuk dicocokkan dengan kode provinsi
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

            // Data Lampiran (Komoditas & Nomor Referensi Teknis)
            komoditas: item.tr_pbumku_laporan_lampiran?.komoditas || "-",
            no_referensi: item.tr_pbumku_laporan_lampiran?.nomor_referensi_teknis || "-",

            // Pencarian nama provinsi secara instan dari Map hasil pivot berdasarkan 2 digit prefix daerah
            provinsi: propinsiMap[kodePrefix] || "Unknown",

            // Data Proyek (KBLI & Uraian Usaha)
            kbli: item.v_oss_proyek?.kbli || "-",
            uraian_usaha: item.v_oss_proyek?.uraian_usaha || "-",

            // Data Informasi Perseroan / Badan Usaha (v_oss_header)
            npwp_perseroan: item.v_oss_header?.npwp_perseroan || "-",
            nama_perseroan: item.v_oss_header?.nama_perseroan || "-",
            alamat_perseroan: item.v_oss_header?.alamat_perseroan || "-",
            rt_rw_perseroan: item.v_oss_header?.rt_rw_perseroan || "-",
            kelurahan_perseroan: item.v_oss_header?.kelurahan_perseroan || "-",
            perseroan_daerah_id: item.v_oss_header?.perseroan_daerah_id || "-",
            kode_pos_perseroan: item.v_oss_header?.kode_pos_perseroan || "-",
            nomor_telpon_perseroan: item.v_oss_header?.nomor_telpon_perseroan || "-",
            email_perusahaan: item.v_oss_header?.email_perusahaan || "-",

            // Hasil Penilaian / Rekapitulasi Audit (Gunakan fallback default aman jika bernilai null/undefined)
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
 * Service untuk melakukan sinkronisasi data secara otomatis/manual ke tabel tujuan (tr_laporan_primer_export).
 * Proses ini mengandalkan fitur database (`ignoreDuplicates: true`) untuk menangani data duplikat secara efisien.
 * 
 * @param {Object} filters - Objek rentang tanggal { tgl_awal, tgl_akhir }
 * @returns {Object} Statistik hasil sinkronisasi { total_fetched, total_skipped, total_inserted }
 */
export const syncExportRincianService = async (filters) => {
    // 1. Tarik data sumber dan data master propinsi secara paralel
    const [rows, propinsiList] = await Promise.all([
        reportRepository.fetchAllReportPrimerData(filters),
        reportRepository.fetchAllPropinsi()
    ]);

    // 2. Buat ulang mapping lookup propinsi
    const propinsiMap = propinsiList.reduce((acc, curr) => {
        acc[curr.KODE_PROPINSI] = curr.URAIAN_PROPINSI;
        return acc;
    }, {});

    // 3. Mapping struktur data baris agar kompatibel penuh dengan kolom tabel `tr_laporan_primer_export`
    const mappedRows = rows.map(row => {
        const item = row.get({ plain: true });
        const fileData = item.tb_pbumku_laporan_header?.tb_pbumku_laporan_file;
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
            komoditas: item.tr_pbumku_laporan_lampiran?.komoditas || "-",
            no_referensi: item.tr_pbumku_laporan_lampiran?.nomor_referensi_teknis || "-",
            uraian_propinsi: propinsiMap[kodePrefix] || "Unknown",
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
            sumber_data: "SISTEM", // Penanda sumber data masuk
        };
    });

    // 4. Kirim data ke repository untuk eksekusi bulk insert (mengabaikan ID yang sudah ada di tabel)
    const { inserted, skipped } = await reportRepository.bulkInsertExportData(mappedRows);

    return {
        total_fetched: rows.length,
        total_skipped: skipped,
        total_inserted: inserted
    };
};

/**
 * Controller Endpoint: POST /api/primer/sync-export
 * Berfungsi sebagai gerbang HTTP untuk memicu proses sinkronisasi data laporan primer secara manual.
 * Memerlukan parameter query `tgl_awal` dan `tgl_akhir`.
 */
export const syncExportRincian = async (req, res) => {
    try {
        const { tgl_awal, tgl_akhir } = req.query;

        // Validasi keberadaan parameter tanggal wajib
        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir wajib diisi."
            });
        }

        console.log(`[SYNC] Mulai sinkronisasi rentang waktu: ${tgl_awal} s/d ${tgl_akhir}`);

        // Panggil service sinkronisasi utama
        const result = await syncExportRincianService({ tgl_awal, tgl_akhir });

        console.log(`[SYNC] Proses selesai dengan hasil:`, result);

        return res.status(200).json({
            status: "success",
            message: "Sinkronisasi data berhasil.",
            ...result
        });

    } catch (error) {
        console.error("[SYNC] Terjadi kesalahan sistem:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat sinkronisasi data."
        });
    }
};