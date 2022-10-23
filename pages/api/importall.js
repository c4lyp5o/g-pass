import { PrismaClient } from '@prisma/client';
import crypt from 'simple-crypto-js';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const crypter = new crypt(process.env.SALT);
  const response = await fetch('https://erkm.calypsocloud.one/pegawai', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.API_KEY,
    },
  });
  const data = await response.json();
  data.forEach(async (item) => {
    const pegawai = await prisma.pegawai.create({
      data: {
        nama: crypter.encrypt(item.nama),
        statusPegawai: crypter.encrypt(item.statusPegawai),
        gred: crypter.encrypt(item.gred),
        mdcNumber: crypter.encrypt(item.mdcNumber),
      },
    });
    console.log(pegawai);
  });
  res.status(200).json({ message: 'done' });
}
