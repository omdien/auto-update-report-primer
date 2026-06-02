import ExcelJS from 'exceljs';
import * as primerService from "../services/primer-service.js";

export const getExportRincian = async (req, res) => {
    try {
        // 1. Ambil filter dari query string (misal: ?tgl_awal=2026-01-01&tgl_akhir=2026-04-17)
        const { tgl_awal, tgl_akhir } = req.query;

        // Validasi sederhana jika tanggal tidak dikirim
        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir harus diisi."
            });
        }

        const filters = { tgl_awal, tgl_akhir };

        // 2. Panggil Service yang sudah kita tes tadi
        const data = await primerService.getExportRincianService(filters);

        // 3. Kirim response sukses
        return res.status(200).json({
            status: "success",
            message: "Data rincian laporan primer berhasil ditarik",
            total_data: data.length,
            data: data
        });

    } catch (error) {
        // 4. Handling jika terjadi error
        console.error("Error pada primer-controller:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server saat mengambil data."
        });
    }
};

export const exportExcelRincian = async (req, res) => {
    try {
        const { tgl_awal, tgl_akhir } = req.query;

        if (!tgl_awal || !tgl_akhir) {
            return res.status(400).json({
                status: "fail",
                message: "Parameter tgl_awal dan tgl_akhir wajib diisi."
            });
        }

        const filters = { tgl_awal, tgl_akhir };
        const data = await primerService.getExportRincianService(filters);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Laporan Rincian');

        // 1. Definisi Kolom Sesuai Urutan Gambar Referensi
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

        // 2. Mapping Data ke Row
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

        // 3. Styling Header
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1F4E78' } // Warna biru gelap seperti gambar
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

        // 4. Response Settings
        const fileName = `Export_Rincian_${tgl_awal}_${tgl_akhir}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        await workbook.xlsx.write(res);
        res.status(200).end();

    } catch (error) {
        console.error("Error Export Excel:", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
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