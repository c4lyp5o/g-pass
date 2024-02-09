import { prisma } from '../../database/prismaClient';

export default async function handler(req, res) {
  try {
    const { nama } = req.query;

    if (!nama) {
      return res.status(404).json([]);
    }

    const results = await prisma.pegawai.findMany({
      where: {
        nama: {
          contains: nama,
          mode: 'insensitive',
        },
      },
    });

    if (!results) {
      return res.status(404).json([]);
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
