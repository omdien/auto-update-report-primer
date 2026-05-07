import { 
    Tr_sertifikat_kapal, 
    Tr_ppm_kapal, 
    Tb_pelabuhan_pendaratan, 
    Tb_jenis_ijin, 
    Tr_kapal_spt,
    Tb_propinsi,
    Tb_r_upt,
    Tb_master_kapal,
    Tr_inspeksi_teknis_evalusi
} from "../models/index.js";
import Sequelize from "sequelize";

export const fetchSertifikatKapalRaw = async (filters) => {
    const Op = Sequelize.Op;
    const where = filters.tgl_awal && filters.tgl_akhir 
        ? { tanggal_terbit: { [Op.between]: [filters.tgl_awal, filters.tgl_akhir] } } 
        : {};

    return await Tr_sertifikat_kapal.findAll({
        where,
        attributes: [
            ['nomor_sertifikat', 'no_cbib'],
            'nama_kapal', 
            'alamat_pemilik', 
            'ukuran_kapal', 
            'grade', 
            'tanggal_terbit', 
            'berlaku_sampai', 
            'tanggal_inspeksi', 
            'nomor_aju_kapal', 
            'jenis_kapal',
            // --- CARA 1: SUBQUERY UNTUK MENGGABUNGKAN PRODUK ---
            [
                Sequelize.literal(`(
                    SELECT GROUP_CONCAT(DISTINCT tjk.ur_jenis_komoditi SEPARATOR ', ')
                    FROM kapal.tr_sertifikat_kapal_produk AS tskp
                    JOIN kapal.tb_jenis_komoditi AS tjk ON tskp.id_komoditi = tjk.id_jenis_komoditi
                    WHERE tskp.nomor_aju_kapal = Tr_sertifikat_kapal.nomor_aju_kapal
                )`), 
                'jenis_produk'
            ],
            // --------------------------------------------------
        ],
        include: [
            {
                model: Tr_ppm_kapal,
                as: 'tr_ppm_kapal',
                attributes: [
                    'nib', 'tanggal_aju_kapal', 'nama_nahkoda', 'jumlah_abk', 
                    'alat_tangkap', 'daerah_tangkap', 'nomor_bkp', 
                    'tanggal_rencana_bongkar_kapal', 'kd_prop', 'kode_upt', 
                    'tempat_pendaratan'
                ],
                include: [
                    { 
                        model: Tb_pelabuhan_pendaratan, 
                        as: 'tb_pelabuhan_pendaratan', 
                        attributes: ['nama_pelabuhan'] 
                    },
                    { 
                        model: Tb_master_kapal, 
                        as: 'tb_master_kapal', 
                        attributes: ['pemilik', 'telp_pemilik'] 
                    }
                ]
            },
            { model: Tb_jenis_ijin, as: 'tb_jenis_ijin', attributes: ['uraian_ijin'] },
            { 
                model: Tr_kapal_spt, 
                as: 'tr_kapal_spt', 
                attributes: ['tanggal_spt', 'nomor_spt'], // Tambahkan no_spt jika perlu dicek
                where: {
                    // Mengambil yang nomor SPT-nya tidak null DAN tidak kosong
                    nomor_spt: { 
                        [Op.and]: [
                            { [Op.ne]: null },
                            { [Op.ne]: '' }
                        ]
                    }
                },
                required: false // Pakai false agar sertifikat tetap muncul jika SPT belum terbit sama sekali
            },
            // { 
            //     model: Tr_inspeksi_teknis_evalusi, 
            //     as: 'tr_inspeksi_teknis_evalusi', 
            //     attributes: ['nm_evaluator'] 
            // }
        ],
        raw: true,
        nest: true
    });
};

export const fetchRefHC = async () => {
    const [propinsi, upt] = await Promise.all([
        Tb_propinsi.findAll({ raw: true }),
        Tb_r_upt.findAll({ raw: true })
    ]);
    return { propinsi, upt };
};