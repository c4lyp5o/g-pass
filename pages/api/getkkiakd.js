const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
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
}
