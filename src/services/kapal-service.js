import { fetchSertifikatKapalRaw, fetchRefHC } from "../repositories/kapal-repository.js";

export const getSertifikatKapalReport = async (filters) => {
    try {
        // 1. Ambil data secara paralel
        const [dataKapal, refHC] = await Promise.all([
            fetchSertifikatKapalRaw(filters),
            fetchRefHC()
        ]);

        // 2. Mapping/Pivot data
        return dataKapal.map(item => {
            // Cari nama provinsi berdasarkan kode
            const prov = refHC.propinsi.find(p => p.KODE_PROPINSI === item.tr_ppm_kapal?.kd_prop);
            // Cari nama UPT berdasarkan kode
            const upt = refHC.upt.find(u => u.KD_UNIT === item.tr_ppm_kapal?.kode_upt);

            return {
                id_cbib: "",
                no_cbib: item.no_cbib,
                nama_kapal: item.nama_kapal?.toUpperCase(),
                nib: item.tr_ppm_kapal?.nib,
                alamat: item.alamat_pemilik,
                gt: item.ukuran_kapal,
                tipe_kapal: item.tb_jenis_ijin?.uraian_ijin,
                tgl_permohonan: item.tr_ppm_kapal?.tanggal_aju_kapal,
                tgl_spt: item.tr_kapal_spt?.tanggal_spt,
                tgl_awal_inspeksi: item.tanggal_inspeksi,
                tgl_akhir_inspeksi: item.tanggal_inspeksi,
                tgl_laporan: "",
                jenis_produk: item.jenis_produk || "-",
                grade_scpib: item.grade,
                tgl_terbit: item.tanggal_terbit,
                tgl_kadaluarsa: item.berlaku_sampai,
                upt_inspeksi: upt ? upt.NM_PENDEK_BARU?.toUpperCase() : "-",
                nama_pelabuhan: item.tr_ppm_kapal?.tb_pelabuhan_pendaratan?.nama_pelabuhan,
                kode_provinsi: item.tr_ppm_kapal?.kd_prop,
                nama_provinsi: prov ? prov.URAIAN_PROPINSI?.toUpperCase() : "-",
                status_pemasok: "",
                nama_pemilik: item.tr_ppm_kapal?.tb_master_kapal?.pemilik,
                telp_pemilik: item.tr_ppm_kapal?.tb_master_kapal?.telp_pemilik,
                nahkoda_kapal: item.tr_ppm_kapal?.nama_nahkoda,
                jumlah_abk: item.tr_ppm_kapal?.jumlah_abk,
                alat_tangkap: item.tr_ppm_kapal?.alat_tangkap,
                daerah_tangkap: item.tr_ppm_kapal?.daerah_tangkap,
                no_siup: "",
                tgl_siup: "",
                no_kbli: "",
                no_skkp_bkp_nk: item.tr_ppm_kapal?.nomor_bkp,
                tgl_skkp_bkp_nk: item.tr_ppm_kapal?.tanggal_rencana_bongkar_kapal,
                pj_pusat:  "-",
            };
        });
    } catch (error) {
        console.error("Error in Kapal Service:", error);
        throw error;
    }
};