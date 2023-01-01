import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';
import multer from 'multer';
import fs from 'fs';
import { createBackup } from './helper';

const safekeeping = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: safekeeping }).single('excelFile');

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  upload(req, res, async (err) => {
    console.log('processing xlsx');
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const { toggle, addmode } = req.body;
      let count = 0;
      switch (toggle) {
        case 'pegawai':
          console.log('pegawai');
          await createBackup(toggle);
          const punyaPp = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const ppXlSheet = punyaPp.SheetNames;
          const ppData = xlsx.utils.sheet_to_json(punyaPp.Sheets[ppXlSheet[0]]);
          if (ppData.length === 0) {
            return res.status(400).json({ msg: 'No data found' });
          }
          if (!ppData[0].mdcNumber) {
            return res.status(400).json({ msg: 'mdcNumber is required' });
          }
          if (addmode === 'false') {
            await prisma.pegawai.deleteMany({});
          }
          for (let row of ppData) {
            count++;
            await prisma.pegawai.create({
              data: {
                nama: row.nama,
                statusPegawai: row.statusPegawai,
                mdcNumber: row.mdcNumber,
              },
            });
          }
          break;
        case 'juruterapi':
          console.log('juruterapi');
          await createBackup(toggle);
          const punyaJp = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const jpXlSheet = punyaJp.SheetNames;
          const jpData = xlsx.utils.sheet_to_json(punyaJp.Sheets[jpXlSheet[0]]);
          if (jpData.length === 0) {
            return res.status(400).json({ msg: 'No data found' });
          }
          if (!jpData[0].mdtbNumber) {
            return res.status(400).json({ msg: 'mdtbNumber is required' });
          }
          if (addmode === 'false') {
            console.log(`deleting all ${toggle}`);
            await prisma.juruterapi.deleteMany({});
          }
          for (let row of jpData) {
            count++;
            await prisma.juruterapi.create({
              data: {
                nama: row.nama,
                statusPegawai: row.statusPegawai,
                mdtbNumber: row.mdtbNumber,
              },
            });
          }
          break;
        case 'fasiliti':
          console.log('fasiliti');
          await createBackup(toggle);
          const punyaFs = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const fsXlSheet = punyaFs.SheetNames;
          const fsData = xlsx.utils.sheet_to_json(punyaFs.Sheets[fsXlSheet[0]]);
          if (fsData.length === 0) {
            return res.status(400).json({ msg: 'No data found' });
          }
          if (!fsData[0].kodFasiliti || !fsData[0].kodFasilitiGiret) {
            return res
              .status(400)
              .json({ msg: 'kodFasiliti and kodFasilitiGiret is required' });
          }
          if (addmode === 'false') {
            await prisma.fasiliti.deleteMany({});
          }
          for (let row of fsData) {
            count++;
            await prisma.fasiliti.create({
              data: {
                nama: row.nama,
                statusPegawai: row.statusPegawai,
                daerah: row.daerah,
                negeri: row.negeri,
                kodFasiliti: row.kodFasiliti,
                kodFasilitiGiret: row.kodFasilitiGiret,
              },
            });
          }
          console.log('fasiliti done');
          break;
        case 'kkiakd':
          console.log('kkiakd');
          await createBackup(toggle);
          const punyaKk = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const kkXlSheet = punyaKk.SheetNames;
          const kkData = xlsx.utils.sheet_to_json(punyaKk.Sheets[kkXlSheet[0]]);
          if (kkData.length === 0) {
            return res.status(400).json({ msg: 'No data found' });
          }
          if (!kkData[0].kodFasiliti) {
            return res.status(400).json({ msg: 'kodFasiliti is required' });
          }
          if (addmode === 'false') {
            await prisma.kkiakd.deleteMany({});
          }
          for (let row of kkData) {
            count++;
            await prisma.kkiakd.create({
              data: {
                nama: row.nama,
                namaHospital: row.namaHospital,
                daerah: row.daerah,
                negeri: row.negeri,
                kodFasiliti: row.kodFasiliti,
                jenisFasiliti: row.jenisFasiliti,
              },
            });
          }
          break;
        default:
          console.log('default');
          break;
      }
      setTimeout(() => {
        fs.unlinkSync(`./public/uploads/${req.file.originalname}`);
      }, 100);
      res.status(200).json({ added: count });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
