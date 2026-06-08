import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const db_mutu = new Sequelize(process.env.DB_NAME_MUTU_PRIMER, process.env.DB_USER_MUTU_PRIMER, process.env.DB_PASS_MUTU_PRIMER, {
    host: process.env.DB_HOST_MUTU_PRIMER,
    dialect: 'mysql',
    timezone: '+07:00'
});

export const db_hc = new Sequelize(process.env.DB_NAME_MUTU_HC, process.env.DB_USER_MUTU_HC, process.env.DB_PASS_MUTU_HC, {
    host: process.env.DB_HOST_MUTU_HC,
    dialect: 'mysql'
});

export const db_kapal = new Sequelize(process.env.DB_NAME_MUTU_KAPAL, process.env.DB_USER_MUTU_KAPAL, process.env.DB_PASS_MUTU_KAPAL, {
    host: process.env.DB_HOST_MUTU_KAPAL,
    dialect: 'mysql'
});

export const db_report_primer = new Sequelize(process.env.DB_NAME_REPORT_PRIMER, process.env.DB_USER_REPORT, process.env.DB_PASS_REPORT, {
    host: process.env.DB_HOST_REPORT,
    dialect: 'mysql'
});

export const db_report_kapal = new Sequelize(process.env.DB_NAME_REPORT_KAPAL, process.env.DB_USER_REPORT, process.env.DB_PASS_REPORT, {
    host: process.env.DB_HOST_REPORT,
    dialect: 'mysql'
});