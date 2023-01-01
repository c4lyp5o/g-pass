import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export async function createBackup(toggle) {
  const prisma = new PrismaClient();

  switch (toggle) {
    case 'pegawai':
      const dataPegawai = await prisma.pegawai.findMany();
      const pegawaiJSON = JSON.stringify(dataPegawai);
      const ppjson = path.join(
        process.cwd(),
        'public',
        'backups',
        `pegawai-${new Date().toISOString()}.json`
      );
      fs.writeFileSync(ppjson, pegawaiJSON);
      break;
    case 'juruterapi':
      const dataJuruterapi = await prisma.juruterapi.findMany();
      const juruterapiJSON = JSON.stringify(dataJuruterapi);
      const jpjson = path.join(
        process.cwd(),
        'public',
        'backups',
        `juruterapi-${new Date().toISOString()}.json`
      );
      fs.writeFileSync(jpjson, juruterapiJSON);
      break;
    case 'fasiliti':
      const dataFasiliti = await prisma.fasiliti.findMany();
      const fasilitiJSON = JSON.stringify(dataFasiliti);
      const fsjson = path.join(
        process.cwd(),
        'public',
        'backups',
        `fasiliti-${new Date().toISOString()}.json`
      );
      fs.writeFileSync(fsjson, fasilitiJSON);
      break;
    case 'kkiakd':
      const dataKkiakd = await prisma.kkiakd.findMany();
      const kkiakdJSON = JSON.stringify(dataKkiakd);
      const kkiakdjson = path.join(
        process.cwd(),
        'public',
        'backups',
        `kkiakd-${new Date().toISOString()}.json`
      );
      fs.writeFileSync(kkiakdjson, kkiakdJSON);
      break;
    default:
      console.log('default');
      break;
  }
}
