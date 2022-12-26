import { PrismaClient } from '@prisma/client';
// import crypt from 'simple-crypto-js';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  // const crypter = new crypt(process.env.SALT);
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
        nama: item.nama,
        statusPegawai: item.statusPegawai,
        gred: item.gred,
        mdcNumber: item.mdcNumber,
      },
    });
    // console.log(pegawai);
  });
  res.status(200).json({ message: 'done' });
}
