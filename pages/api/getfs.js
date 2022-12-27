const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { negeri, daerah } = req.query;

  if (!negeri && !daerah) {
    return res.status(200).json([]);
  }

  if (!negeri && daerah) {
    return res.status(200).json([]);
  }

  if (negeri && !daerah) {
    return res.status(200).json([]);
  }

  const results = await prisma.fasiliti.findMany({
    where: {
      daerah: {
        contains: daerah,
      },
      negeri: {
        contains: negeri,
      },
    },
  });

  if (!results) {
    return res.status(200).json([]);
  }

  res.status(200).json(results);
}
