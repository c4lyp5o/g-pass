import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';

import { conf } from '../../middleware/conf';

const gpassAPI = nc().use(conf);

gpassAPI.get(async (req, res) => {
  const prisma = new PrismaClient();
  const { type, page } = req.query;
  let x;
  switch (type) {
    case 'pegawai':
      const ppCount = await prisma.pegawai.count();
      if (ppCount > 0) {
        const ppPages = Math.ceil(ppCount / 1000);
        x = page === 1 ? 0 : (page - 1) * 1000;
        const dataPegawai = await prisma.pegawai.findMany({
          skip: x,
          take: 1000,
        });
        res.status(200).json({ items: dataPegawai, pages: ppPages });
      } else {
        res.status(200).json({ items: [], pages: 0 });
      }
      break;
    case 'juruterapi':
      const jpCount = await prisma.juruterapi.count();
      if (jpCount > 0) {
        const jpPages = Math.ceil(jpCount / 1000);
        x = page === 1 ? 0 : (page - 1) * 1000;
        const dataJuruterapi = await prisma.juruterapi.findMany({
          skip: x,
          take: 1000,
        });
        res.status(200).json({ items: dataJuruterapi, pages: jpPages });
      } else {
        res.status(200).json({ items: [], pages: 0 });
      }
      break;
    case 'fasiliti':
      const fsCount = await prisma.fasiliti.count();
      if (fsCount > 0) {
        const fsCount = await prisma.fasiliti.count();
        const fsPages = Math.ceil(fsCount / 1000);
        x = page === 1 ? 0 : (page - 1) * 1000;
        const dataFasiliti = await prisma.fasiliti.findMany({
          skip: x,
          take: 1000,
        });
        res.status(200).json({ items: dataFasiliti, pages: fsPages });
      } else {
        res.status(200).json({ items: [], pages: 0 });
      }
      break;
    case 'individu':
      const { from, id } = req.query;
      switch (from) {
        case 'pegawai':
          const data1Pegawai = await prisma.pegawai.findUnique({
            where: {
              bil: parseInt(id),
            },
          });
          res.status(200).json(data1Pegawai);
          break;
        case 'juruterapi':
          const data1Juruterapi = await prisma.juruterapi.findUnique({
            where: {
              bil: parseInt(id),
            },
          });
          res.status(200).json(data1Juruterapi);
          break;
        case 'fasiliti':
          const data1Fasiliti = await prisma.fasiliti.findUnique({
            where: {
              bil: parseInt(id),
            },
          });
          res.status(200).json(data1Fasiliti);
          break;
        default:
          res.status(404).json({ message: 'Not Found' });
          break;
      }
      break;
    default:
      res.status(404).json({ message: 'Not Found' });
      break;
  }
});

gpassAPI.post(async (req, res) => {
  const prisma = new PrismaClient();
  const { query, payload } = req.body;

  switch (query) {
    case 'create':
      console.log('create');
      let add;
      var {
        type,
        nama,
        statusPegawai,
        mdcNumber,
        mdtbNumber,
        daerah,
        negeri,
        kodFasiliti,
        kodFasilitiGiret,
      } = payload;
      if (type === 'pegawai') {
        add = await prisma.pegawai.create({
          data: {
            nama: nama,
            statusPegawai: statusPegawai,
            mdcNumber: mdcNumber,
          },
        });
      }
      if (type === 'juruterapi') {
        add = await prisma.juruterapi.create({
          data: {
            nama: nama,
            statusPegawai: statusPegawai,
            mdtbNumber: mdtbNumber,
          },
        });
      }
      if (type === 'fasiliti') {
        add = await prisma.fasiliti.create({
          data: {
            nama: nama,
            daerah: daerah,
            negeri: negeri,
            kodFasiliti: kodFasiliti,
            kodFasilitiGiret: kodFasilitiGiret,
          },
        });
      }
      res.status(200).json({ message: 'done', added: add });
      break;
    case 'read':
      console.log('read');
      let read;
      if (statusPegawai === 'pp') {
        read = await prisma.pegawai.findMany();
      }
      if (statusPegawai === 'jp') {
        read = await prisma.juruterapi.findMany();
      }
      if (statusPegawai === 'fs') {
        read = await prisma.fasiliti.findMany();
      }
      res.status(200).json(read);
      break;
    case 'readOne':
      console.log('readOne');
      let { forRead } = req.body;
      let readOne;
      if (statusPegawai === 'pp') {
        readOne = await prisma.pegawai.findUnique({
          where: {
            bil: forRead,
          },
        });
      }
      if (statusPegawai === 'jp') {
        readOne = await prisma.juruterapi.findUnique({
          where: {
            bil: forRead,
          },
        });
      }
      if (statusPegawai === 'fs') {
        readOne = await prisma.fasiliti.findUnique({
          where: {
            bil: forRead,
          },
        });
      }
      // let decryptedDataSatu = {
      //   bil: dataSatuPegawai.bil,
      //   nama: crypter.decrypt(dataSatuPegawai.nama),
      //   statusPegawai: crypter.decrypt(dataSatuPegawai.statusPegawai),
      //   gred: crypter.decrypt(dataSatuPegawai.gred),
      //   mdcNumber: crypter.decrypt(dataSatuPegawai.mdcNumber),
      // };
      res.status(200).json(readOne);
      break;
    case 'update':
      console.log('update');
      var {
        type,
        bil,
        updateNama,
        updateMdcNumber,
        updateMdtbNumber,
        updateDaerah,
        updateNegeri,
        updateKodFasiliti,
        updateKodFasilitiGiret,
      } = payload;
      let update;
      if (type === 'pegawai') {
        update = await prisma.pegawai.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            mdcNumber: updateMdcNumber,
          },
        });
      }
      if (type === 'juruterapi') {
        update = await prisma.juruterapi.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            mdtbNumber: updateMdtbNumber,
          },
        });
      }
      if (type === 'fasiliti') {
        update = await prisma.fasiliti.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            daerah: updateDaerah,
            negeri: updateNegeri,
            kodFasiliti: updateKodFasiliti,
            kodFasilitiGiret: updateKodFasilitiGiret,
          },
        });
      }
      res.status(200).json(update);
      break;
    case 'delete':
      console.log('delete');
      let deleted;
      var { type, bil } = payload;
      if (type === 'pegawai') {
        deleted = await prisma.pegawai.delete({
          where: {
            bil: bil,
          },
        });
      }
      if (type === 'juruterapi') {
        deleted = await prisma.juruterapi.delete({
          where: {
            bil: bil,
          },
        });
      }
      if (type === 'fasiliti') {
        deleted = await prisma.fasiliti.delete({
          where: {
            bil: bil,
          },
        });
      }
      res.status(200).json({ message: 'done', deleted: deleted });
      break;
    default:
      console.log('default');
      break;
  }
});

export default gpassAPI;
