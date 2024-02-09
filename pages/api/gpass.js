import { getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

import { authOptions } from './auth/[...nextauth]';
import { conf } from '../../middleware/conf';
import { prisma } from '../../database/prismaClient';

const gpassAPI = createRouter().use(conf);

const findItems = async (req) => {
  try {
    const { type, page } = req.query;

    let model;

    switch (type) {
      case 'pegawai':
        model = prisma.pegawai;
        break;
      case 'juruterapi':
        model = prisma.juruterapi;
        break;
      case 'fasiliti':
        model = prisma.fasiliti;
        break;
      case 'kkiakd':
        model = prisma.kkiakd;
        break;
      default:
        break;
    }

    const pageSize = 1000;
    const skip = pageSize * (page - 1);

    const itemCount = await model.count();
    const itemPages = Math.ceil(itemCount / pageSize);
    const currentItems = await model.findMany({
      skip,
      take: pageSize,
    });

    if (!currentItems) {
      return { totalItems: 0, items: [], pages: 0 };
    }

    return { totalItems: itemCount, items: currentItems, pages: itemPages };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const findSearch = async (req) => {
  try {
    const { data, searchParams, page } = req.query;

    let model, query;

    switch (data) {
      case 'pegawai':
        model = prisma.pegawai;
        query = {
          OR: [
            {
              nama: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              statusPegawai: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
          ],
        };
        break;
      case 'juruterapi':
        model = prisma.juruterapi;
        query = {
          OR: [
            {
              nama: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              statusPegawai: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
          ],
        };
        break;
      case 'fasiliti':
        model = prisma.fasiliti;
        query = {
          OR: [
            {
              nama: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              daerah: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              negeri: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              kodFasiliti: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              kodFasilitiGiret: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
          ],
        };
        break;
      case 'kkiakd':
        model = prisma.kkiakd;
        query = {
          OR: [
            {
              nama: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              daerah: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              negeri: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              kodFasiliti: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              jenisFasiliti: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
            {
              namaHospital: {
                contains: searchParams,
                mode: 'insensitive',
              },
            },
          ],
        };
        break;
      default:
        break;
    }

    const pageSize = 1000;
    const skip = pageSize * (page - 1);

    const itemCount = await model.count({
      where: query,
    });

    const itemPages = Math.ceil(itemCount / pageSize);
    const currentItems = await model.findMany({
      where: query,
      skip,
      take: pageSize,
    });

    if (!currentItems) {
      return { totalItems: 0, items: [], pages: 0 };
    }

    return { totalItems: itemCount, items: currentItems, pages: itemPages };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const findIndividu = async (req) => {
  try {
    const { from, id } = req.query;

    let model, data;

    switch (from) {
      case 'pegawai':
        model = prisma.pegawai;
        break;
      case 'juruterapi':
        model = prisma.juruterapi;
        break;
      case 'fasiliti':
        model = prisma.fasiliti;
        break;
      case 'kkiakd':
        model = prisma.kkiakd;
        break;
      default:
        break;
    }

    data = await model.findUnique({
      where: {
        bil: parseInt(id),
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const handleDownload = async (req) => {
  const { from, filetype } = req.query;

  let file;

  switch (filetype) {
    case 'json':
      file = await sendJson(from);
      break;
    case 'xlsx':
      file = await sendXlsx(from);
      break;
    default:
      break;
  }

  return file;
};

const sendJson = async (from) => {
  let data;

  switch (from) {
    case 'pegawai':
      data = await prisma.pegawai.findMany();
      break;
    case 'juruterapi':
      data = await prisma.juruterapi.findMany();
      break;
    case 'fasiliti':
      data = await prisma.fasiliti.findMany();
      break;
    case 'kkiakd':
      data = await prisma.kkiakd.findMany();
      break;
    default:
      break;
  }

  const json = JSON.stringify(data);
  const jsonfile = path.join(process.cwd(), 'public', `${from}.json`);
  fs.writeFileSync(jsonfile, json);
  const file = fs.readFileSync(jsonfile);
  setTimeout(() => {
    fs.unlinkSync(jsonfile);
  }, 100);
  return file;
};

const sendXlsx = async (from) => {
  let data;

  switch (from) {
    case 'pegawai':
      data = await prisma.pegawai.findMany();
      break;
    case 'juruterapi':
      data = await prisma.juruterapi.findMany();
      break;
    case 'fasiliti':
      data = await prisma.fasiliti.findMany();
      break;
    case 'kkiakd':
      data = await prisma.kkiakd.findMany();
      break;
    default:
      break;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(from);

  if (data.length > 0) {
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key,
    }));
    data.forEach((row) => worksheet.addRow(row));
  }

  const xlsxfile = path.join(process.cwd(), 'public', `${from}.xlsx`);
  await workbook.xlsx.writeFile(xlsxfile);
  const file = fs.readFileSync(xlsxfile);
  setTimeout(() => {
    fs.unlinkSync(xlsxfile);
  }, 100);
  return file;
};

const createData = async (req) => {
  const { payload } = req.body;

  const {
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

  let created;

  switch (type) {
    case 'pegawai':
      created = await prisma.pegawai.create({
        data: {
          nama: nama,
          statusPegawai: statusPegawai,
          mdcNumber: parseInt(mdcNumber),
        },
      });
      break;
    case 'juruterapi':
      created = await prisma.juruterapi.create({
        data: {
          nama: nama,
          statusPegawai: statusPegawai,
          mdtbNumber: mdtbNumber,
        },
      });
      break;
    case 'fasiliti':
      created = await prisma.fasiliti.create({
        data: {
          nama: nama,
          daerah: daerah,
          negeri: negeri,
          kodFasiliti: kodFasiliti,
          kodFasilitiGiret: kodFasilitiGiret,
        },
      });
      break;
    case 'kkiakd':
      created = await prisma.kkiakd.create({
        data: {
          nama: nama,
          namaHospital: namaHospital,
          daerah: daerah,
          negeri: negeri,
          kodFasiliti: kodFasiliti,
          jenisFasiliti: jenisFasiliti,
        },
      });
      break;
    default:
      break;
  }

  return created;
};

const updateData = async (req) => {
  try {
    const { payload } = req.body;

    const {
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

    let updated;

    switch (type) {
      case 'pegawai':
        updated = await prisma.pegawai.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            mdcNumber: parseInt(updateMdcNumber),
          },
        });
        break;
      case 'juruterapi':
        updated = await prisma.juruterapi.update({
          where: {
            bil,
          },
          data: {
            nama: updateNama,
            mdtbNumber: updateMdtbNumber,
          },
        });
        break;
      case 'fasiliti':
        updated = await prisma.fasiliti.update({
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
        break;
      case 'kkiakd':
        updated = await prisma.kkiakd.update({
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
        break;
      default:
        break;
    }

    return updated;
  } catch (error) {
    console.error(error);
  }
};

gpassAPI.get(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const { type, filetype } = req.query;

    let data;

    switch (type) {
      case 'pegawai':
      case 'juruterapi':
      case 'fasiliti':
      case 'kkiakd':
        data = await findItems(req);
        break;
      case 'search':
        data = await findSearch(req);
        break;
      case 'individu':
        data = await findIndividu(req);
        break;
      case 'download':
        data = await handleDownload(req);

        let contentType, fileExtension;

        if (filetype === 'json') {
          contentType = 'application/json';
          fileExtension = 'json';
        } else {
          contentType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = 'xlsx';
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${type}.${fileExtension}`
        );
        return res.status(200).send(data);
      default:
        return res.status(400).json({ message: 'Bad request' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

gpassAPI.post(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const created = await createData(req);
    res.status(200).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

gpassAPI.patch(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const updated = await updateData(req);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

gpassAPI.delete(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const { type, bil } = req.query;

    let deleted;

    switch (type) {
      case 'pegawai':
        deleted = await prisma.pegawai.delete({
          where: {
            bil: parseInt(bil),
          },
        });
        break;
      case 'juruterapi':
        deleted = await prisma.juruterapi.delete({
          where: {
            bil: parseInt(bil),
          },
        });
        break;
      case 'fasiliti':
        deleted = await prisma.fasiliti.delete({
          where: {
            bil: parseInt(bil),
          },
        });
        break;
      case 'kkiakd':
        deleted = await prisma.kkiakd.delete({
          where: {
            bil: parseInt(bil),
          },
        });
        break;
      default:
        return res.status(400).json({ message: 'Bad request' });
    }

    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default gpassAPI.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
