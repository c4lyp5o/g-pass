const { prisma } = require('../../database/prismaClient');

export default async function handler(req, res) {
  try {
    const { negeri, daerah } = req.query;

    if (!negeri && !daerah) {
      return res.status(404).json([]);
    }

    if (!negeri && daerah) {
      return res.status(404).json([]);
    }

    if (negeri && !daerah) {
      return res.status(404).json([]);
    }

    const results = await prisma.fasiliti.findMany({
      where: {
        daerah: {
          contains: daerah,
          mode: 'insensitive',
        },
        negeri: {
          contains: negeri,
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
