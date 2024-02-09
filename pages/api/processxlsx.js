import { getServerSession } from 'next-auth';
import { Workbook } from 'exceljs';
import multer from 'multer';
import fs from 'fs';
import { prisma } from '../../database/prismaClient';

import { authOptions } from './auth/[...nextauth]';
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

async function insertData(req, res) {
  const { toggle, addmode } = req.body;

  if (!toggle) {
    return res.status(400).json({ message: 'Invalid selection' });
  }

  const workbook = new Workbook();

  await createBackup(toggle);

  await workbook.xlsx.readFile(`./public/uploads/${req.file.originalname}`);
  const worksheet = workbook.getWorksheet(1);

  if (!worksheet) {
    return res.status(400).json({ message: 'Invalid worksheet' });
  }

  const data = [];

  switch (toggle) {
    case 'pegawai':
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          data.push({
            bil: row.getCell(1).value,
            nama: row.getCell(2).value,
            statusPegawai: row.getCell(3).value,
            mdcNumber: row.getCell(4).value,
          });
        }
      });
      break;
    case 'juruterapi':
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          data.push({
            bil: row.getCell(1).value,
            nama: row.getCell(2).value,
            statusPegawai: row.getCell(3).value,
            mdtbNumber: row.getCell(4).value,
          });
        }
      });
      break;
    case 'fasiliti':
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          data.push({
            bil: row.getCell(1).value,
            nama: row.getCell(2).value,
            negeri: row.getCell(3).value,
            daerah: row.getCell(4).value,
            kodFasiliti: row.getCell(5).value,
            kodFasilitiGiret: row.getCell(6).value,
          });
        }
      });
      break;
    case 'kkiakd':
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          data.push({
            bil: row.getCell(1).value,
            nama: row.getCell(2).value,
            namaHospital: row.getCell(3).value,
            negeri: row.getCell(4).value,
            daerah: row.getCell(5).value,
            kodFasiliti: row.getCell(6).value,
            jenisFasiliti: row.getCell(7).value,
          });
        }
      });
      break;
    default:
      break;
  }

  if (data.length === 0) {
    return res.status(400).json({ message: 'No data found' });
  }

  switch (toggle) {
    case 'pegawai':
      if (!data[0].mdcNumber) {
        return res.status(400).json({ message: 'mdcNumber is required' });
      }
      break;
    case 'juruterapi':
      if (!data[0].mdtbNumber) {
        return res.status(400).json({ message: 'mdtbNumber is required' });
      }
      break;
    case 'fasiliti':
      if (!data[0].kodFasiliti || !data[0].kodFasilitiGiret) {
        return res
          .status(400)
          .json({ message: 'kodFasiliti and kodFasilitiGiret is required' });
      }
      break;
    case 'kkiakd':
      if (!data[0].kodFasiliti) {
        return res.status(400).json({ message: 'kodFasiliti is required' });
      }
      break;
    default:
      break;
  }

  if (addmode === 'false') {
    await prisma[toggle].deleteMany({});
  }

  try {
    for (let row of data) {
      await prisma[toggle].create({
        data: row,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  setTimeout(() => {
    fs.unlinkSync(`./public/uploads/${req.file.originalname}`);
  }, 100);

  return data.length;
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  upload(req, res, async (error) => {
    console.log('processing xlsx');
    if (error) {
      res.status(500).json({ message: err });
    } else {
      const count = await insertData(req, res);
      res.status(200).json({ added: count });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
