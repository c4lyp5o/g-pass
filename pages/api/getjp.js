const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { nama } = req.query;

  if (!nama) {
    return res.status(200).json([]);
  }

  const results = await prisma.juruterapi.findMany({
    where: {
      nama: {
        contains: nama,
      },
    },
  });

  if (!results) {
    return res.status(200).json([]);
  }

  res.status(200).json(results);
}
