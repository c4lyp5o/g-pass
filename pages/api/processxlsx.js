import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';
import multer from 'multer';

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
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const { toggle } = req.body;
      let count = 0;
      switch (toggle) {
        case 'juruterapi':
          console.log('juruterapi');
          await prisma.juruterapi.deleteMany({});
          const punyaJp = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const jpXlSheet = punyaJp.SheetNames;
          const jpData = xlsx.utils.sheet_to_json(punyaJp.Sheets[jpXlSheet[0]]);
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
          const punyaPp = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const ppXlSheet = punyaPp.SheetNames;
          const ppData = xlsx.utils.sheet_to_json(punyaPp.Sheets[ppXlSheet[0]]);
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
          const punyaFs = xlsx.readFile(
            `./public/uploads/${req.file.originalname}`
          );
          const fsXlSheet = punyaFs.SheetNames;
          const fsData = xlsx.utils.sheet_to_json(punyaFs.Sheets[fsXlSheet[0]]);
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
          console.log('default');
          break;
      }
      res.status(200).json({ added: count });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
