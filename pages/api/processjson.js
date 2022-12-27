import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import fs from 'fs';

const safekeeping = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: safekeeping }).single('jsonFile');

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  upload(req, res, async (err) => {
    console.log('processing json');
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const { toggle } = req.body;
      let count = 0;
      switch (toggle) {
        case 'juruterapi':
          console.log('juruterapi json process');
          await prisma.juruterapi.deleteMany({});
          const punyaJp = fs.readFileSync(
            `./public/uploads/${req.file.originalname}`,
            'utf8'
          );
          const jpData = JSON.parse(punyaJp);
          for (let row of jpData) {
            if (!row.mdtbNumber) {
              return res.status(400).json({ msg: 'mdtbNumber is required' });
            }
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
        case 'pegawai':
          console.log('pegawai');
          await prisma.pegawai.deleteMany({});
          const punyaPp = fs.readFileSync(
            `./public/uploads/${req.file.originalname}`,
            'utf8'
          );
          const ppData = JSON.parse(punyaPp);
          for (let row of ppData) {
            if (!row.mdcNumber) {
              return res.status(400).json({ msg: 'mdcNumber is required' });
            }
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
        case 'fasiliti':
          console.log('fasiliti');
          await prisma.fasiliti.deleteMany({});
          const punyaFs = fs.readFileSync(
            `./public/uploads/${req.file.originalname}`,
            'utf8'
          );
          const fsData = JSON.parse(punyaFs);
          for (let row of fsData) {
            if (!row.kodFasiliti || !row.kodFasilitiGiret) {
              return res
                .status(400)
                .json({ msg: 'kodFasiliti and kodFasilitiGiret is required' });
            }
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
          break;
        default:
          res.status(404).json({ added: count });
          break;
      }
      res.status(200).json({ message: 'done' });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
