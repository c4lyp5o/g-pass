import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import crypt from 'simple-crypto-js';

import { conf } from '../../middleware/conf';

const gpassAPI = nc().use(conf);

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
      const {
        forUpdating,
        updateNama,
        updateStatusPegawai,
        updateGred,
        updateMdcNumber,
      } = req.body;
      const dataUpdate = await prisma.pegawai.update({
        where: {
          bil: forUpdating,
        },
        data: {
          nama: crypter.encrypt(updateNama),
          statusPegawai: crypter.encrypt(updateStatusPegawai),
          gred: crypter.encrypt(updateGred),
          mdcNumber: crypter.encrypt(updateMdcNumber),
        },
      });
      res.status(200).json(dataUpdate);
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
