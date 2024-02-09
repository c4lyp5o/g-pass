const { prisma } = require('../../database/prismaClient');

export default async function handler(req, res) {
  try {
    const { negeri } = req.query;

    if (!negeri) {
      return res.status(404).json([]);
    }

    const results = await prisma.kkiakd.findMany({
      where: {
        negeri: {
          contains: negeri,
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
