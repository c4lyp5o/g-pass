import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import crypt from 'simple-crypto-js';

import { conf } from '../../middleware/conf';

const pegawai = nc().use(conf);

pegawai.get(async (req, res) => {
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
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
  console.log('sending data');
  res.status(200).json(decryptedData);
});

export default pegawai;
