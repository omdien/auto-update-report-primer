import Sequelize from "sequelize";
import Tr_oss_checklist from "../models/mutu/tr_oss_checklist.js";
import V_oss_header from "../models/mutu/v_oss_header.js";
import Tr_pbumku_laporan_header from "../models/mutu/tr_pbumku_laporan_header.js";
import Tr_pbumku_laporan_file from "../models/mutu/tr_pbumku_laporan_file.js";
import Tr_pbumku_laporan_lampiran from "../models/mutu/tr_pbumku_laporan_lampiran.js";
import Tr_oss_proyek from "../models/mutu/tr_oss_proyek.js";
import Tb_propinsi from "../models/hc/tb_propinsi.js";
import Tb_perizinan from "../models/mutu/tb_perizinan.js";

import TrLaporanPrimerExport from "../models/report/tr_laporan_primer_export.js";

export const fetchAllReportPrimerData = async (filters) => {
    const Op = Sequelize.Op;
    const whereConditions = {
        [Op.and]: [
            { sts_aktif: "1" },
            { kd_izin: { [Op.ne]: '032000000023' } },
            { tgl_izin: { [Op.between]: [filters.tgl_awal, filters.tgl_akhir] } }
        ]
    };

    if (filters.status_checklist) whereConditions[Op.and].push({ status_checklist: filters.status_checklist });
    if (filters.kd_izin) whereConditions[Op.and].push({ kd_izin: filters.kd_izin });
    if (filters.kd_daerah_prefix) {
        whereConditions[Op.and].push({ kd_daerah: { [Op.like]: `${filters.kd_daerah_prefix}%` } });
    }

    return await Tr_oss_checklist.findAll({
        where: whereConditions,
        attributes: [
            "idchecklist", "tgl_izin", "id_izin", "jenis_izin", "kd_izin", "kd_daerah",
            "nama_izin", "no_izin", "nib", "tgl_permohonan", "status_checklist", "sts_aktif", "id_proyek"
        ],
        include: [
            {
                model: Tb_perizinan,
                as: 'ref_perizinan',
                attributes: ["ur_izin_singkat"], // Hanya ambil kolom yang dibutuhkan
                required: false // Agar data checklist tetap muncul meskipun ref_perizinan kosong
            },
            { model: V_oss_header, as: 'v_oss_header', required: false },
            { model: Tr_oss_proyek, as: 'v_oss_proyek', attributes: ["kbli", "uraian_usaha"], required: false },
            { model: Tr_pbumku_laporan_lampiran, as: 'tr_pbumku_laporan_lampiran', required: false },
            {
                model: Tr_pbumku_laporan_header,
                as: 'tb_pbumku_laporan_header', // Jalur antara Checklist ke File
                required: false,
                include: [
                    {
                        model: Tr_pbumku_laporan_file,
                        as: 'tb_pbumku_laporan_file', // File ada di dalam Header
                        attributes: [
                            'total_sesuai', 'total_minor', 'total_mayor',
                            'total_kritis', 'total_hasil', 'keterangan'
                        ],
                        required: false
                    }
                ]
            }
        ],
        order: [['tgl_izin', 'ASC']]
    });
};

// Fungsi baru untuk mengambil data referensi propinsi
export const fetchAllPropinsi = async () => {
    return await Tb_propinsi.findAll({
        attributes: ['KODE_PROPINSI', 'URAIAN_PROPINSI'],
        raw: true
    });
};

// Ambil semua idchecklist yang sudah ada di tr_laporan_primer_export
export const fetchExistingIdChecklist = async () => {
    const results = await TrLaporanPrimerExport.findAll({
        attributes: ['idchecklist'],
        raw: true
    });

    // Return sebagai Set untuk pencarian O(1)
    // Paksa semua jadi string agar === konsisten dengan data dari checklist yang juga string
    return new Set(rows.map(r => String(r.idchecklist)));
};

// Bulk insert data baru ke tr_laporan_primer_export
export const bulkInsertExportData = async (rows) => {
    if (!rows.length) return { inserted: 0, skipped: 0 };

    const result = await TrLaporanPrimerExport.bulkCreate(rows, {
        ignoreDuplicates: true,  // ← skip row yang idchecklist-nya sudah ada
        returning: false
    });

    return {
        inserted: result.length,
        skipped:  rows.length - result.length  // selisih = yang di-skip DB
    };
};