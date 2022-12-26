const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { nama } = req.query;

  const results = await prisma.juruterapi.findMany({
    where: {
      nama: {
        contains: nama,
      },
    },
  });

  if (!results) {
    return res.status(404).json({ msg: 'No results found' });
  }

  res.status(200).json(results);
}
