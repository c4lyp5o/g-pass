import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import crypt from 'simple-crypto-js';

import { conf } from '../../middleware/conf';

const juruterapi = nc().use(conf);

juruterapi.get(async (req, res) => {
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
  const dataJuruterapi = await prisma.juruterapi.findMany();
  let decryptedData = [];
  dataJuruterapi.forEach((item) => {
    decryptedData.push({
      bil: item.bil,
      nama: crypter.decrypt(item.nama),
      statusPegawai: crypter.decrypt(item.statusPegawai),
      gred: crypter.decrypt(item.gred),
      mdtbNumber: crypter.decrypt(item.mdtbNumber),
    });
  });
  console.log('sending data');
  res.status(200).json(decryptedData);
});

export default juruterapi;
