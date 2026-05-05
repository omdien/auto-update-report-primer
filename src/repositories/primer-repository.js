import Sequelize from "sequelize";
import Tr_oss_checklist from "../models/tr_oss_checklist.js";
import V_oss_header from "../models/v_oss_header.js";
import Tr_pbumku_laporan_header from "../models/tr_pbumku_laporan_header.js";
import Tr_pbumku_laporan_file from "../models/tr_pbumku_laporan_file.js";
import Tr_pbumku_laporan_lampiran from "../models/tr_pbumku_laporan_lampiran.js";
import Tr_oss_proyek from "../models/tr_oss_proyek.js";
import Tb_propinsi from "../models/tb_propinsi.js"; 
import Tb_perizinan from "../models/tb_perizinan.js"; 

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