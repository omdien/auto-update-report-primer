import ExcelJS from 'exceljs';
import * as primerService from "../services/primer-service.js";

/**
 * Controller Endpoint: GET /api/primer/rincian
 * Mengambil data rincian laporan primer dalam format JSON murni berdasarkan rentang tanggal.
 */
export const getExportRincian = async (req, res) => {
    try {
        // 1. Ambil filter dari query string (contoh: ?tgl_awal=2026-01-01&tgl_akhir=2026-04-17)
        const { tgl_awal, tgl_akhir } = req.query;

        // Validasi wajib: Batalkan proses jika parameter rentang tanggal tidak lengkap dikirim oleh client
        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir harus diisi."
            });
        }

        const filters = { tgl_awal, tgl_akhir };

        // 2. Panggil Service terkait untuk menarik dan memproses data dari layer database/repository
        const data = await primerService.getExportRincianService(filters);

        // 3. Kirim kembali response sukses berformat JSON beserta total datanya
        return res.status(200).json({
            status: "success",
            message: "Data rincian laporan primer berhasil ditarik",
            total_data: data.length,
            data: data
        });

    } catch (error) {
        // 4. Tangkap dan log error sistem yang terjadi di layer bawah
        console.error("Error pada primer-controller (getExportRincian):", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server saat mengambil data."
        });
    }
};

/**
 * Controller Endpoint: GET /api/primer/export-excel
 * Mengunduh laporan rincian langsung dalam bentuk file dokumen Excel (.xlsx) menggunakan pustaka ExcelJS.
 */
export const exportExcelRincian = async (req, res) => {
    try {
        const { tgl_awal, tgl_akhir } = req.query;

        // Validasi parameter wajib tanggal awal dan akhir
        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir wajib diisi."
            });
        }

        const filters = { tgl_awal, tgl_akhir };
        // Tarik data matang dari service
        const data = await primerService.getExportRincianService(filters);

        // Inisialisasi Workbook dan Worksheet baru via ExcelJS
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Laporan Rincian');

        // 1. Definisi Struktur Kolom (Header, Key penanda data, serta lebar kolom / width)
        worksheet.columns = [
            { header: 'ID Checklist', key: 'idchecklist', width: 12 },
            { header: 'Tgl Izin', key: 'tgl_izin', width: 12 },
            { header: 'ID Izin', key: 'id_izin', width: 15 },
            { header: 'Jenis Izin', key: 'jenis_izin', width: 10 },
            { header: 'Kd Izin', key: 'kd_izin', width: 15 },
            { header: 'Uraian Izin', key: 'ur_izin_singkat', width: 20 },
            { header: 'Kd Daerah', key: 'kd_daerah', width: 12 },
            { header: 'Nama Izin', key: 'nama_izin', width: 30 },
            { header: 'No Izin', key: 'no_izin', width: 25 },
            { header: 'NIB', key: 'nib', width: 15 },
            { header: 'Tgl Permohonan', key: 'tgl_permohonan', width: 15 },
            { header: 'Status Checklist', key: 'status_checklist', width: 15 },
            { header: 'Sts Aktif', key: 'sts_aktif', width: 10 },
            { header: 'Komoditas', key: 'komoditas', width: 20 },
            { header: 'No Ref Teknis', key: 'no_referensi', width: 20 },
            { header: 'Provinsi', key: 'provinsi', width: 20 },
            { header: 'KBLI', key: 'kbli', width: 10 },
            { header: 'Uraian Usaha', key: 'uraian_usaha', width: 30 },
            { header: 'NPWP Perseroan', key: 'npwp_perseroan', width: 20 },
            { header: 'Nama Perseroan', key: 'nama_perseroan', width: 30 },
            { header: 'Alamat Perseroan', key: 'alamat_perseroan', width: 40 },
            { header: 'RT/RW', key: 'rt_rw_perseroan', width: 10 },
            { header: 'Kelurahan', key: 'kelurahan_perseroan', width: 20 },
            { header: 'ID Daerah Perseroan', key: 'perseroan_daerah_id', width: 18 },
            { header: 'Kode Pos', key: 'kode_pos_perseroan', width: 10 },
            { header: 'Telp Perseroan', key: 'nomor_telpon_perseroan', width: 15 },
            { header: 'Email Perusahaan', key: 'email_perusahaan', width: 25 },
            { header: 'Sesuai', key: 'total_sesuai', width: 8 },
            { header: 'Minor', key: 'total_minor', width: 8 },
            { header: 'Mayor', key: 'total_mayor', width: 8 },
            { header: 'Kritis', key: 'total_kritis', width: 8 },
            { header: 'Total Hasil', key: 'total_hasil', width: 12 },
            { header: 'Keterangan', key: 'keterangan', width: 25 },
        ];

        // 2. Looping data array objek untuk dimasukkan sebagai baris baru ke dalam worksheet
        data.forEach((item) => {
            worksheet.addRow({
                idchecklist: item.idchecklist,
                tgl_izin: item.tgl_izin,
                id_izin: item.id_izin,
                jenis_izin: item.jenis_izin,
                kd_izin: item.kd_izin,
                ur_izin_singkat: item.ur_izin_singkat,
                kd_daerah: item.kd_daerah,
                nama_izin: item.nama_izin,
                no_izin: item.no_izin,
                nib: item.nib,
                tgl_permohonan: item.tgl_permohonan,
                status_checklist: item.status_checklist,
                sts_aktif: item.sts_aktif,
                komoditas: item.komoditas,
                no_referensi: item.no_referensi,
                provinsi: item.provinsi,
                kbli: item.kbli,
                uraian_usaha: item.uraian_usaha,
                npwp_perseroan: item.npwp_perseroan,
                nama_perseroan: item.nama_perseroan,
                alamat_perseroan: item.alamat_perseroan,
                rt_rw_perseroan: item.rt_rw_perseroan,
                kelurahan_perseroan: item.kelurahan_perseroan,
                perseroan_daerah_id: item.perseroan_daerah_id,
                kode_pos_perseroan: item.kode_pos_perseroan,
                nomor_telpon_perseroan: item.nomor_telpon_perseroan,
                email_perusahaan: item.email_perusahaan,
                total_sesuai: item.total_sesuai,
                total_minor: item.total_minor,
                total_mayor: item.total_mayor,
                total_kritis: item.total_kritis,
                total_hasil: item.total_hasil,
                keterangan: item.keterangan
            });
        });

        // 3. Kustomisasi Styling Baris Header (Baris Pertama)
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // Teks putih tebal
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1F4E78' } // Warna latar belakang biru gelap profesional
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }; // Posisi teks di tengah

        // 4. Konfigurasi Header HTTP Response untuk pengunduhan file Excel
        const fileName = `Export_Rincian_${tgl_awal}_${tgl_akhir}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        // Tulis workbook langsung ke objek response HTTP (stream) dan akhiri koneksi
        await workbook.xlsx.write(res);
        res.status(200).end();

    } catch (error) {
        console.error("Error Export Excel:", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * Controller Endpoint: POST /api/primer/sync-export
 * Trigger manual untuk menjalankan proses sinkronisasi data ke tabel tujuan (`tr_laporan_primer_export`).
 * Membutuhkan query parameter `tgl_awal` dan `tgl_akhir`.
 */
export const syncExportRincian = async (req, res) => {
    try {
        const { tgl_awal, tgl_akhir } = req.query;

        // Validasi parameter tanggal wajib untuk proses sinkronisasi
        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir wajib diisi."
            });
        }

        console.log(`[SYNC] Mulai sinkronisasi rentang waktu: ${tgl_awal} s/d ${tgl_akhir}`);

        // Panggil service sinkronisasi utama
        const result = await primerService.syncExportRincianService({ tgl_awal, tgl_akhir });

        console.log(`[SYNC] Selesai dengan laporan statistik:`, result);

        return res.status(200).json({
            status: "success",
            message: "Sinkronisasi data berhasil.",
            ...result
        });

    } catch (error) {
        console.error("[SYNC] Error sistem terjadi:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat sinkronisasi data."
        });
    }
};