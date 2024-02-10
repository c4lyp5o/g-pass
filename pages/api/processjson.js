import { getServerSession } from 'next-auth';
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

const upload = multer({ storage: safekeeping }).single('jsonFile');

async function insertData(req, res) {
  const { toggle, addmode } = req.body;

  if (!toggle) {
    return res.status(400).json({ message: 'Invalid selection' });
  }

  await createBackup(toggle);

  const fromJSON = fs.readFileSync(
    `./public/uploads/${req.file.originalname}`,
    'utf8'
  );

  const jsonData = JSON.parse(fromJSON);

  if (jsonData.length === 0) {
    return res.status(400).json({ message: 'No data found' });
  }

  switch (toggle) {
    case 'pegawai':
      if (!jsonData[0].mdcNumber) {
        return res.status(400).json({ message: 'mdcNumber is required' });
      }
      break;
    case 'juruterapi':
      if (!jsonData[0].mdtbNumber) {
        return res.status(400).json({ message: 'mdtbNumber is required' });
      }
      break;
    case 'fasiliti':
      if (!jsonData[0].kodFasiliti || !jsonData[0].kodFasilitiGiret) {
        return res.status(400).json({
          message: 'kodFasiliti and kodFasilitiGiret is required',
        });
      }
      break;
    case 'kkiakd':
      if (!jsonData[0].kodFasiliti) {
        return res.status(400).json({ message: 'kodFasiliti is required' });
      }
      break;
    default:
      console.log('default');
      break;
  }

  if (addmode === 'false') {
    await prisma[toggle].deleteMany({});
  }

  try {
    for (let item of jsonData) {
      await prisma[toggle].create({
        data: item,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  setTimeout(() => {
    fs.unlinkSync(`./public/uploads/${req.file.originalname}`);
  }, 100);

  return jsonData.length;
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  upload(req, res, async (error) => {
    console.log('processing json');
    if (error) {
      res.status(500).json({ message: error });
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
