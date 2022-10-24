import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import crypt from 'simple-crypto-js';

import { conf, logger } from '../../middleware/conf';

const individu = nc().use(conf);

individu.get(async (req, res) => {
  logger.info('GET /api/individu from ' + req.ip);
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
  const { id } = req.query;
  const dataIndividu = await prisma.pegawai.findUnique({
    where: {
      bil: parseInt(id),
    },
  });
  let decryptedData = [];
  decryptedData.push({
    bil: dataIndividu.bil,
    nama: crypter.decrypt(dataIndividu.nama),
    statusPegawai: crypter.decrypt(dataIndividu.statusPegawai),
    gred: crypter.decrypt(dataIndividu.gred),
    mdcNumber: crypter.decrypt(dataIndividu.mdcNumber),
  });
  logger.info('Sending data for ' + decryptedData[0].nama);
  res.status(200).json(decryptedData);
});

export default individu;
