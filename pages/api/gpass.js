import { PrismaClient } from '@prisma/client';
import nc from 'next-connect';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

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
    case 'kkiakd':
      const kkiakdCount = await prisma.kkiakd.count();
      if (kkiakdCount > 0) {
        const kkiakdPages = Math.ceil(kkiakdCount / 1000);
        x = page === 1 ? 0 : (page - 1) * 1000;
        const dataKKIAKD = await prisma.kkiakd.findMany({
          skip: x,
          take: 1000,
        });
        res.status(200).json({ items: dataKKIAKD, pages: kkiakdPages });
      } else {
        res.status(200).json({ items: [], pages: 0 });
      }
      break;
    case 'individu':
      var { from, id } = req.query;
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
        case 'kkiakd':
          const data1KKIAKD = await prisma.kkiakd.findUnique({
            where: {
              bil: parseInt(id),
            },
          });
          res.status(200).json(data1KKIAKD);
          break;
        default:
          res.status(404).json({ message: 'Not Found' });
          break;
      }
      break;
    case 'download':
      console.log('download');
      var { from, filetype } = req.query;
      switch (from) {
        case 'pegawai':
          console.log('dl pegawai');
          if (filetype === 'json') {
            const dataPegawai = await prisma.pegawai.findMany();
            const pegawaiJSON = JSON.stringify(dataPegawai);
            const jsonfile = path.join(process.cwd(), 'public', 'pegawai.json');
            fs.writeFileSync(jsonfile, pegawaiJSON);
            const ppjson = fs.readFileSync(jsonfile);
            setTimeout(() => {
              fs.unlinkSync(jsonfile);
            }, 100);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(ppjson);
          }
          if (filetype === 'xlsx') {
            const dataPegawai = await prisma.pegawai.findMany();
            const pegawaiJSON = JSON.stringify(dataPegawai);
            fs.writeFileSync(
              path.join(process.cwd(), 'public', 'pegawai.json'),
              pegawaiJSON
            );
            const ppjson = fs.readFileSync(
              path.join(process.cwd(), 'public', 'pegawai.json')
            );
            const ppdata = JSON.parse(ppjson);
            const ppwb = XLSX.utils.book_new();
            const ppsheet = XLSX.utils.json_to_sheet(ppdata);
            XLSX.utils.book_append_sheet(ppwb, ppsheet, 'Pegawai');
            const ppfile = path.join(process.cwd(), 'public', 'pegawai.xlsx');
            XLSX.writeFile(ppwb, ppfile);
            const workbook = XLSX.readFile(ppfile);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            for (const cell in sheet) {
              if (sheet[cell].v) {
                sheet[cell].s = {
                  border: {
                    top: { style: 'thin', color: { auto: 1 } },
                    bottom: { style: 'thin', color: { auto: 1 } },
                    left: { style: 'thin', color: { auto: 1 } },
                    right: { style: 'thin', color: { auto: 1 } },
                  },
                };
              }
            }
            XLSX.writeFile(workbook, ppfile);
            const ppxlsx = fs.readFileSync(ppfile);
            setTimeout(() => {
              fs.unlinkSync(ppfile);
              fs.unlinkSync(path.join(process.cwd(), 'public', 'pegawai.json'));
            }, 100);
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.status(200).send(ppxlsx);
          }
          break;
        case 'juruterapi':
          console.log('dl juruterapi');
          if (filetype === 'json') {
            const dataJuruterapi = await prisma.juruterapi.findMany();
            const juruterapiJSON = JSON.stringify(dataJuruterapi);
            const jsonfile = path.join(
              process.cwd(),
              'public',
              'juruterapi.json'
            );
            fs.writeFileSync(jsonfile, juruterapiJSON);
            const jpjson = fs.readFileSync(jsonfile);
            setTimeout(() => {
              fs.unlinkSync(jsonfile);
            }, 100);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(jpjson);
          }
          if (filetype === 'xlsx') {
            const dataJuruterapi = await prisma.juruterapi.findMany();
            const juruterapiJSON = JSON.stringify(dataJuruterapi);
            fs.writeFileSync(
              path.join(process.cwd(), 'public', 'juruterapi.json'),
              juruterapiJSON
            );
            const jpjson = fs.readFileSync(
              path.join(process.cwd(), 'public', 'juruterapi.json')
            );
            const data = XLSX.utils.json_to_sheet(JSON.parse(jpjson));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, data, 'JP');
            const xlsxfile = path.join(
              process.cwd(),
              'public',
              'juruterapi.xlsx'
            );
            XLSX.writeFile(workbook, xlsxfile);
            const jpxlsx = fs.readFileSync(xlsxfile);
            setTimeout(() => {
              fs.unlinkSync(xlsxfile);
              fs.unlinkSync(
                path.join(process.cwd(), 'public', 'juruterapi.json')
              );
            }, 100);
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.status(200).send(jpxlsx);
          }
          break;
        case 'fasiliti':
          console.log('dl fasiliti');
          if (filetype === 'json') {
            const dataFasiliti = await prisma.fasiliti.findMany();
            const fasilitiJSON = JSON.stringify(dataFasiliti);
            const jsonfile = path.join(
              process.cwd(),
              'public',
              'fasiliti.json'
            );
            fs.writeFileSync(jsonfile, fasilitiJSON);
            const fsjson = fs.readFileSync(jsonfile);
            setTimeout(() => {
              fs.unlinkSync(jsonfile);
            }, 100);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(fsjson);
          }
          if (filetype === 'xlsx') {
            const dataFasiliti = await prisma.fasiliti.findMany();
            const fasilitiJSON = JSON.stringify(dataFasiliti);
            fs.writeFileSync(
              path.join(process.cwd(), 'public', 'fasiliti.json'),
              fasilitiJSON
            );
            const fsjson = fs.readFileSync(
              path.join(process.cwd(), 'public', 'fasiliti.json')
            );
            const data = XLSX.utils.json_to_sheet(JSON.parse(fsjson));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, data, 'FP');
            const xlsxfile = path.join(
              process.cwd(),
              'public',
              'fasiliti.xlsx'
            );
            XLSX.writeFile(workbook, xlsxfile);
            const fsxlsx = fs.readFileSync(xlsxfile);
            setTimeout(() => {
              fs.unlinkSync(xlsxfile);
              fs.unlinkSync(
                path.join(process.cwd(), 'public', 'fasiliti.json')
              );
            }, 100);
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.status(200).send(fsxlsx);
          }
          break;
        case 'kkiakd':
          console.log('dl kkiakd');
          if (filetype === 'json') {
            const dataKKIAKD = await prisma.kkiakd.findMany();
            const kkiakdJSON = JSON.stringify(dataKKIAKD);
            const jsonfile = path.join(process.cwd(), 'public', 'kkiakd.json');
            fs.writeFileSync(jsonfile, kkiakdJSON);
            const kkiakdjson = fs.readFileSync(jsonfile);
            setTimeout(() => {
              fs.unlinkSync(jsonfile);
            }, 100);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(kkiakdjson);
          }
          if (filetype === 'xlsx') {
            const dataKKIAKD = await prisma.kkiakd.findMany();
            const kkiakdJSON = JSON.stringify(dataKKIAKD);
            fs.writeFileSync(
              path.join(process.cwd(), 'public', 'kkiakd.json'),
              kkiakdJSON
            );
            const kkiakdjson = fs.readFileSync(
              path.join(process.cwd(), 'public', 'kkiakd.json')
            );
            const data = XLSX.utils.json_to_sheet(JSON.parse(kkiakdjson));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, data, 'KKIAKD');
            const xlsxfile = path.join(process.cwd(), 'public', 'kkiakd.xlsx');
            XLSX.writeFile(workbook, xlsxfile);
            const kkiakdxlsx = fs.readFileSync(xlsxfile);
            setTimeout(() => {
              fs.unlinkSync(xlsxfile);
              fs.unlinkSync(path.join(process.cwd(), 'public', 'kkiakd.json'));
            }, 100);
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.status(200).send(kkiakdxlsx);
          }
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
        namaHospital,
        statusPegawai,
        mdcNumber,
        mdtbNumber,
        daerah,
        negeri,
        kodFasiliti,
        kodFasilitiGiret,
        jenisFasiliti,
      } = payload;
      if (type === 'pegawai') {
        add = await prisma.pegawai.create({
          data: {
            nama: nama,
            statusPegawai: statusPegawai,
            mdcNumber: parseInt(mdcNumber),
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
      if (type === 'kkiakd') {
        add = await prisma.kkiakd.create({
          data: {
            nama: nama,
            namaHospital: namaHospital,
            daerah: daerah,
            negeri: negeri,
            kodFasiliti: kodFasiliti,
            jenisFasiliti: jenisFasiliti,
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
      if (statusPegawai === 'kkiakd') {
        read = await prisma.kkiakd.findMany();
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
      if (statusPegawai === 'kkiakd') {
        readOne = await prisma.kkiakd.findUnique({
          where: {
            bil: forRead,
          },
        });
      }
      res.status(200).json(readOne);
      break;
    case 'update':
      console.log('update');
      var {
        type,
        bil,
        updateNama,
        updateNamaHospital,
        updateMdcNumber,
        updateMdtbNumber,
        updateDaerah,
        updateNegeri,
        updateKodFasiliti,
        updateKodFasilitiGiret,
        updateJenisFasiliti,
      } = payload;
      let update;
      if (type === 'pegawai') {
        update = await prisma.pegawai.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            mdcNumber: parseInt(updateMdcNumber),
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
      if (type === 'kkiakd') {
        update = await prisma.kkiakd.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            namaHospital: updateNamaHospital,
            daerah: updateDaerah,
            negeri: updateNegeri,
            kodFasiliti: updateKodFasiliti,
            jenisFasiliti: updateJenisFasiliti,
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
      if (type === 'kkiakd') {
        deleted = await prisma.kkiakd.delete({
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
