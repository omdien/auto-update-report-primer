import { getSertifikatKapalReport } from "../services/kapal-service.js";
import ExcelJS from "exceljs";

/**
 * Controller untuk mengambil data rincian sertifikat kapal
 * Biasanya digunakan untuk menampilkan data di datatable atau preview
 */
export const getRincianKapal = async (req, res) => {
    try {
        // 1. Ambil filter dari query params (misal: tgl_awal, tgl_akhir)
        const filters = {
            tgl_awal: req.query.tgl_awal,
            tgl_akhir: req.query.tgl_akhir,
            // Bapak bisa menambah filter lain di sini sesuai kebutuhan
        };

        // 2. Panggil Service
        const data = await getSertifikatKapalReport(filters);

        // 3. Validasi jika data kosong
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data sertifikat kapal tidak ditemukan untuk periode ini.",
                data: []
            });
        }

        // 4. Kirim Response sukses
        return res.status(200).json({
            success: true,
            message: "Data rincian kapal berhasil diambil",
            count: data.length,
            data: data
        });

    } catch (error) {
        // 5. Handle Error
        console.error("Error in getRincianKapal Controller:", error.message);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal server",
            error: error.message
        });
    }
};

/**
 * Controller untuk mengekspor data sertifikat kapal ke Excel
 * Biasanya digunakan untuk tombol "Export Excel" di frontend
 */
export const exportSertifikatKapalToExcel = async (req, res) => {
    try {
        const filters = {
            tgl_awal: req.query.tgl_awal,
            tgl_akhir: req.query.tgl_akhir
        };

        // 1. Ambil data dari service
        const data = await getSertifikatKapalReport(filters);

        // 2. Inisialisasi Workbook & Worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Laporan Sertifikat Kapal");

        // 3. Definisi Header Kolom
        worksheet.columns = [
            { header: "NO", key: "no", width: 5 },
            { header: "NO. SERTIFIKAT", key: "no_cbib", width: 25 },
            { header: "NAMA KAPAL", key: "nama_kapal", width: 25 },
            { header: "NIB", key: "nib", width: 20 },
            { header: "ALAMAT", key: "alamat", width: 30 },
            { header: "GT", key: "gt", width: 10 },
            { header: "TIPE KAPAL", key: "tipe_kapal", width: 20 },
            { header: "TGL PERMOHONAN", key: "tgl_permohonan", width: 15 },
            { header: "TGL SPT", key: "tgl_spt", width: 15 },
            { header: "TGL AWAL INSPEKSI", key: "tgl_awal_inspeksi", width: 15 },
            { header: "TGL AKHIR INSPEKSI", key: "tgl_akhir_inspeksi", width: 15 },
            { header: "TGL LAPORAN", key: "tgl_laporan", width: 15 },
            { header: "JENIS PRODUK", key: "jenis_produk", width: 30 },
            { header: "GRADE", key: "grade_scpib", width: 10 },
            { header: "TGL TERBIT", key: "tgl_terbit", width: 15 },
            { header: "TANGGAL KADALUARSA", key: "tgl_kadaluarsa", width: 15 },
            { header: "UPT INSPEKSI", key: "upt_inspeksi", width: 25 },
            { header: "NAMA PELABUHAN", key: "nama_pelabuhan", width: 25 },
            { header: "KODE PROVINSI", key: "kode_provinsi", width: 15 },
            { header: "PROVINSI", key: "nama_provinsi", width: 20 },
            { header: "STATUS PEMASOK", key: "status_pemasok", width: 20 },
            { header: "PEMILIK", key: "nama_pemilik", width: 25 },
            { header: "TELP PEMILIK", key: "telp_pemilik", width: 20 },
            { header: "NAHKODA", key: "nahkoda_kapal", width: 20 },
            { header: "JUMLAH ABK", key: "jumlah_abk", width: 15 },
            { header: "ALAT TANGKAP", key: "alat_tangkap", width: 20 },
            { header: "DAERAH TANGKAP", key: "daerah_tangkap", width: 25 },
            { header: "NO. SIUP", key: "no_siup", width: 20 },
            { header: "TGL SIUP", key: "tgl_siup", width: 15 },
            { header: "NO. KBLI", key: "no_kbli", width: 20 },
            { header: "NO. SKKP/BKP/NK", key: "no_skkp_bkp_nk", width: 25 },
            { header: "TGL SKKP/BKP/NK", key: "tgl_skkp_bkp_nk", width: 15 },
            { header: "PJ PUSAT", key: "pj_pusat", width: 25 },
        ];

        // 4. Styling Header (Biar Cantik)
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' }
        };

        // 5. Masukkan Data
        data.forEach((item, index) => {
            worksheet.addRow({
                no: index + 1,
                no_cbib: item.no_cbib,
                nama_kapal: item.nama_kapal,
                nib: item.nib,
                alamat: item.alamat,
                gt: item.gt,
                tipe_kapal: item.tipe_kapal,
                tgl_permohonan: item.tgl_permohonan,
                tgl_spt: item.tgl_spt,
                tgl_awal_inspeksi: item.tgl_awal_inspeksi,
                tgl_akhir_inspeksi: item.tgl_akhir_inspeksi,
                tgl_laporan: item.tgl_laporan,
                jenis_produk: item.jenis_produk,
                grade_scpib: item.grade_scpib,
                tgl_terbit: item.tgl_terbit,
                tgl_kadaluarsa: item.tgl_kadaluarsa,
                upt_inspeksi: item.upt_inspeksi,
                nama_pelabuhan: item.nama_pelabuhan,
                kode_provinsi: item.kode_provinsi,
                nama_provinsi: item.nama_provinsi,
                status_pemasok: item.status_pemasok,
                nama_pemilik: item.nama_pemilik,
                telp_pemilik: item.telp_pemilik,
                nahkoda_kapal: item.nahkoda_kapal,
                jumlah_abk: item.jumlah_abk,
                alat_tangkap: item.alat_tangkap,
                daerah_tangkap: item.daerah_tangkap,
                no_siup: item.no_siup,
                tgl_siup: item.tgl_siup,
                no_kbli: item.no_kbli,
                no_skkp_bkp_nk: item.no_skkp_bkp_nk,
                tgl_skkp_bkp_nk: item.tgl_skkp_bkp_nk,
                pj_pusat: item.pj_pusat
            });
        });

        // 6. Set Header Response agar browser mendownload file
        const fileName = `Laporan_Sertifikat_Kapal_${filters.tgl_awal}_to_${filters.tgl_akhir}.xlsx`;

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${fileName}`
        );

        // 7. Write ke stream response
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Error Export Excel:", error);
        res.status(500).json({ message: "Gagal export excel", error: error.message });
    }
};