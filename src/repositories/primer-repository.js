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

/**
 * Mengambil data laporan primer utama beserta seluruh relasinya berdasarkan filter yang diberikan.
 * @param {Object} filters - Objek berisi parameter filter (tgl_awal, tgl_akhir, status_checklist, kd_izin, kd_daerah_prefix)
 */
export const fetchAllReportPrimerData = async (filters) => {
  const Op = Sequelize.Op;
  
  // ==========================================
  // 1. DEFINISI KONDISI UTAMA (WHERE CLAUSE)
  // ==========================================
  const whereConditions = {
    [Op.and]: [
      // Filter wajib: Hanya mengambil data yang statusnya aktif ('1')
      { sts_aktif: "1" },
      // Filter wajib: Mengecualikan kode izin tertentu (kemungkinan kode uji/sampah)
      { kd_izin: { [Op.ne]: "032000000023" } },
      // Filter wajib: Rentang tanggal izin berdasarkan input filter
      { tgl_izin: { [Op.between]: [filters.tgl_awal, filters.tgl_akhir] } },
    ],
  };

  // ==========================================
  // 2. PENAMBAHAN FILTER DINAMIS
  // ==========================================
  // Jika parameter status_checklist dikirim, tambahkan ke kondisi AND
  if (filters.status_checklist)
    whereConditions[Op.and].push({
      status_checklist: filters.status_checklist,
    });
    
  // Jika parameter kd_izin spesifik dikirim, tambahkan ke kondisi AND
  if (filters.kd_izin)
    whereConditions[Op.and].push({ kd_izin: filters.kd_izin });
    
  // Jika parameter prefix daerah dikirim (misal untuk filter wilayah/provinsi tertentu)
  if (filters.kd_daerah_prefix) {
    whereConditions[Op.and].push({
      kd_daerah: { [Op.like]: `${filters.kd_daerah_prefix}%` },
    });
  }

  // ==========================================
  // 3. EKsekusi QUERY UTAMA DENGAN SEQUELIZE
  // ==========================================
  return await Tr_oss_checklist.findAll({
    where: whereConditions,
    // Atribut spesifik yang ditarik dari tabel utama (Tr_oss_checklist)
    attributes: [
      "idchecklist",
      "tgl_izin",
      "id_izin",
      "jenis_izin",
      "kd_izin",
      "kd_daerah",
      "nama_izin",
      "no_izin",
      "nib",
      "tgl_permohonan",
      "status_checklist",
      "sts_aktif",
      "id_proyek",
    ],
    // Relasi (JOIN) ke tabel-tabel pendukung laporan
    include: [
      {
        model: Tb_perizinan,
        as: "ref_perizinan",
        attributes: ["ur_izin_singkat"], // Hanya ambil kolom uraian singkat izin
        required: false, // LEFT JOIN: Data checklist tetap muncul meskipun referensi perizinannya kosong/tidak ada
      },
      { 
        model: V_oss_header, 
        as: "v_oss_header", 
        required: false // LEFT JOIN: Mengambil header data OSS tambahan jika ada
      },
      {
        model: Tr_oss_proyek,
        as: "v_oss_proyek",
        attributes: ["kbli", "uraian_usaha"], // Mengambil informasi KBLI dan deskripsi usaha proyek
        required: false, // LEFT JOIN
      },
      {
        model: Tr_pbumku_laporan_lampiran,
        as: "tr_pbumku_laporan_lampiran",
        required: false, // LEFT JOIN: Lampiran laporan PBUMKU
      },
      {
        model: Tr_pbumku_laporan_header,
        as: "tb_pbumku_laporan_header", // Jalur relasi dari Checklist ke Header Laporan
        required: false, // LEFT JOIN
        include: [
          {
            model: Tr_pbumku_laporan_file,
            as: "tb_pbumku_laporan_file", // Nested Include: File detail berada di dalam Header Laporan
            attributes: [
              "total_sesuai",
              "total_minor",
              "total_mayor",
              "total_kritis",
              "total_hasil",
              "keterangan",
            ],
            required: false, // LEFT JOIN
          },
        ],
      },
    ],
    // Pengurutan data secara ascending berdasarkan tanggal izin tertua
    order: [["tgl_izin", "ASC"]],
  });
};

/**
 * Mengambil data referensi seluruh propinsi untuk kebutuhan mapping wilayah pada laporan.
 */
export const fetchAllPropinsi = async () => {
  return await Tb_propinsi.findAll({
    attributes: ["KODE_PROPINSI", "URAIAN_PROPINSI"],
    raw: true, // Mengembalikan objek data mentah (plain object) untuk performa lebih cepat
  });
};

/**
 * Mengambil semua idchecklist yang sudah tercatat di tabel riwayat export (tr_laporan_primer_export).
 * Digunakan untuk mencegah duplikasi data saat proses sinkronisasi/export laporan.
 */
export const fetchExistingIdChecklist = async () => {
  const results = await TrLaporanPrimerExport.findAll({
    attributes: ["idchecklist"],
    raw: true,
  });

  // Catatan: Pastikan variabel penampung hasil query di bawah sesuai (sebelumnya tertulis 'rows', 
  // namun di atas dideklarasikan sebagai 'results'). 
  // Return dikonversi sebagai Set untuk pencarian secepat O(1).
  // Paksa semua jadi string agar tipe data === konsisten dengan data dari checklist.
  return new Set(results.map((r) => String(r.idchecklist)));
};

/**
 * Melakukan proses penyimpanan massal (Bulk Insert) data baru ke tabel tr_laporan_primer_export.
 * @param {Array} rows - Array data objek yang akan dimasukkan ke database.
 */
export const bulkInsertExportData = async (rows) => {
  if (!rows.length) return { inserted: 0, skipped: 0 };

  // 1. Hitung jumlah record di database SEBELUM proses insert dijalankan
  const totalBefore = await TrLaporanPrimerExport.count();

  // 2. Jalankan perintah bulkCreate (memanfaatkan konfigurasi ignoreDuplicates dari database/Sequelize)
  await TrLaporanPrimerExport.bulkCreate(rows, {
    ignoreDuplicates: true,
  });

  // 3. Hitung jumlah record di database SESUDAH proses insert selesai
  const totalAfter = await TrLaporanPrimerExport.count();

  // 4. Kalkulasi selisih untuk mengetahui jumlah data baru yang benar-benar masuk
  const actualInserted = totalAfter - totalBefore; 
  const actualSkipped = rows.length - actualInserted; 

  return {
    inserted: actualInserted,
    skipped: actualSkipped,
  };
};