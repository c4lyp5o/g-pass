import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import crypt from 'simple-crypto-js';

import { conf } from '../../middleware/conf';

const gpassAPI = nc().use(conf);

gpassAPI.get(async (req, res) => {
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
  const { type } = req.query;
  switch (type) {
    case 'pegawai':
      const dataPegawai = await prisma.pegawai.findMany();
      let decryptedData = [];
      dataPegawai.forEach((item) => {
        decryptedData.push({
          bil: item.bil,
          nama: crypter.decrypt(item.nama),
          statusPegawai: crypter.decrypt(item.statusPegawai),
          gred: crypter.decrypt(item.gred),
          mdcNumber: crypter.decrypt(item.mdcNumber),
        });
      });
      res.status(200).json(decryptedData);
      break;
    case 'juruterapi':
      const dataJuruterapi = await prisma.juruterapi.findMany();
      let decryptedDataJuruterapi = [];
      dataJuruterapi.forEach((item) => {
        decryptedDataJuruterapi.push({
          bil: item.bil,
          nama: crypter.decrypt(item.nama),
          statusPegawai: crypter.decrypt(item.statusPegawai),
          gred: crypter.decrypt(item.gred),
          mdtbNumber: crypter.decrypt(item.mdtbNumber),
        });
      });
      res.status(200).json(decryptedDataJuruterapi);
      break;
    case 'individu':
      const { id } = req.query;
      const dataIndividu = await prisma.pegawai.findUnique({
        where: {
          bil: parseInt(id),
        },
      });
      let decryptedDataIndividu = {
        bil: dataIndividu.bil,
        nama: crypter.decrypt(dataIndividu.nama),
        statusPegawai: crypter.decrypt(dataIndividu.statusPegawai),
        gred: crypter.decrypt(dataIndividu.gred),
        mdcNumber: crypter.decrypt(dataIndividu.mdcNumber),
      };
      res.status(200).json(decryptedDataIndividu);
      break;
    default:
      res.status(404).json({ message: 'Not Found' });
      break;
  }
});

gpassAPI.post(async (req, res) => {
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
  const { query } = req.body;
  switch (query) {
    case 'create':
      console.log('create');
      const { nama, statusPegawai, gred, mdcNumber } = req.body;
      const pegawai = await prisma.pegawai.create({
        data: {
          nama: crypter.encrypt(nama),
          statusPegawai: crypter.encrypt(statusPegawai),
          gred: crypter.encrypt(gred),
          mdcNumber: crypter.encrypt(mdcNumber),
        },
      });
      res.status(200).json({ message: 'done', added: pegawai });
      break;
    case 'read':
      console.log('read');
      const dataPegawai = await prisma.pegawai.findMany();
      let decryptedData = [];
      dataPegawai.forEach((item) => {
        decryptedData.push({
          bil: item.bil,
          nama: crypter.decrypt(item.nama),
          statusPegawai: crypter.decrypt(item.statusPegawai),
          gred: crypter.decrypt(item.gred),
          mdcNumber: crypter.decrypt(item.mdcNumber),
        });
      });
      res.status(200).json(decryptedData);
      break;
    case 'readOne':
      console.log('readOne');
      const { forRead } = req.body;
      const dataSatuPegawai = await prisma.pegawai.findUnique({
        where: {
          bil: forRead,
        },
      });
      let decryptedDataSatu = {
        bil: dataSatuPegawai.bil,
        nama: crypter.decrypt(dataSatuPegawai.nama),
        statusPegawai: crypter.decrypt(dataSatuPegawai.statusPegawai),
        gred: crypter.decrypt(dataSatuPegawai.gred),
        mdcNumber: crypter.decrypt(dataSatuPegawai.mdcNumber),
      };
      res.status(200).json(decryptedDataSatu);
      break;
    case 'update':
      console.log('update');
      const { forUpdating, updateNama, updateGred, updateMdcNumber } = req.body;
      const updatedPegawai = await prisma.pegawai.update({
        where: {
          bil: forUpdating,
        },
        data: {
          nama: crypter.encrypt(updateNama),
          gred: crypter.encrypt(updateGred),
          mdcNumber: crypter.encrypt(updateMdcNumber),
        },
      });
      res.status(200).json(updatedPegawai);
      break;
    case 'delete':
      console.log('delete');
      const { forDeletion } = req.body;
      const dataDelete = await prisma.pegawai.delete({
        where: {
          bil: forDeletion,
        },
      });
      res.status(200).json({ message: 'done', deleted: dataDelete });
      break;
    default:
      console.log('default');
      break;
  }
});

export default gpassAPI;
