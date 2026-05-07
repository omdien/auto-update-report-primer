import Sequelize from "sequelize";

// Import Model dari folder 'kapal'
import Tr_sertifikat_kapal from "./kapal/tr_sertifikat_kapal.js";
import Tr_ppm_kapal from "./kapal/tr_ppm_kapal.js";
import Tb_pelabuhan_pendaratan from "./kapal/tb_pelabuhan_pendaratan.js";
import Tb_jenis_ijin from "./kapal/tb_jenis_ijin.js";
import Tr_kapal_spt from "./kapal/tr_kapal_spt.js";
import Tb_jenis_komoditi from "./kapal/tb_jenis_komoditi.js";
import Tr_sertifikat_kapal_produk from "./kapal/tr_sertifikat_kapal_produk.js";
import Tb_master_kapal from "./kapal/tb_master_kapal.js";
import Tr_inspeksi_teknis_evalusi from "./kapal/tr_inspeksi_teknis_evaluasi.js";

// Import Model dari folder 'hc' (Lintas DB)
import Tb_propinsi from "./hc/tb_propinsi.js";
import Tb_r_upt from "./hc/tb_r_upt.js";

// --- PERBAIKAN LINTAS DATABASE ---
// Memaksa Sequelize untuk selalu menyertakan nama database 'hc' 
// saat melakukan join ke tabel-tabel ini.
Tb_propinsi.schema('hc');
Tb_r_upt.schema('hc');

// --- DEFINISI RELASI ---

// Relasi tr_sertifikat_kapal
Tr_sertifikat_kapal.belongsTo(Tr_ppm_kapal, { 
    foreignKey: 'nomor_aju_kapal', targetKey: 'nomor_aju_kapal', as: 'tr_ppm_kapal' 
});
Tr_sertifikat_kapal.belongsTo(Tb_jenis_ijin, { 
    foreignKey: 'jenis_kapal', targetKey: 'id_jenis_ijin', as: 'tb_jenis_ijin' 
});
Tr_sertifikat_kapal.belongsTo(Tr_kapal_spt, { 
    foreignKey: 'nomor_aju_kapal', targetKey: 'nomor_aju_kapal', as: 'tr_kapal_spt' 
});
Tr_sertifikat_kapal.belongsTo(Tr_sertifikat_kapal_produk, {
    foreignKey: 'nomor_aju_kapal', targetKey: 'nomor_aju_kapal', as: 'tr_sertifikat_kapal_produk'
});
Tr_sertifikat_kapal.belongsTo(Tr_inspeksi_teknis_evalusi, {
    foreignKey: 'nomor_aju_kapal', targetKey: 'nomor_aju_kapal', as: 'tr_inspeksi_teknis_evalusi'
});

// Relasi tr_ppm_kapal
Tr_ppm_kapal.belongsTo(Tb_pelabuhan_pendaratan, { 
    foreignKey: 'tempat_pendaratan', targetKey: 'kode_pelabuhan', as: 'tb_pelabuhan_pendaratan' 
});
Tr_ppm_kapal.belongsTo(Tb_master_kapal, {
    foreignKey: 'id_kapal', targetKey: 'id_kapal', as: 'tb_master_kapal'
});

// Relasi Lintas DB (kapal -> hc)
Tr_ppm_kapal.belongsTo(Tb_propinsi, { 
    foreignKey: 'kd_prop', targetKey: 'KODE_PROPINSI', as: 'tb_propinsi' 
});
Tr_ppm_kapal.belongsTo(Tb_r_upt, { 
    foreignKey: 'kode_upt', targetKey: 'KD_UNIT', as: 'tb_r_upt' 
});

Tr_sertifikat_kapal_produk.belongsTo(Tb_jenis_komoditi, {
    foreignKey: 'id_komoditi', targetKey: 'id_jenis_komoditi', as: 'tb_jenis_komoditi'
});

// Export semua agar bisa dipakai di Repository
export {
    Tr_sertifikat_kapal,
    Tr_ppm_kapal,
    Tb_pelabuhan_pendaratan,
    Tb_jenis_ijin,
    Tr_kapal_spt,
    Tb_propinsi,
    Tb_r_upt,
    Tr_sertifikat_kapal_produk,
    Tb_jenis_komoditi,
    Tb_master_kapal,
    Tr_inspeksi_teknis_evalusi
};