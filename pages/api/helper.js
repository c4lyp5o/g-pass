import fs from 'fs';
import path from 'path';
import { prisma } from '../../database/prismaClient';

export async function createBackup(toggle) {
  const data = await prisma[toggle].findMany();
  const dataJSON = JSON.stringify(data);
  const filePath = path.join(
    process.cwd(),
    'public',
    'backups',
    `${toggle}-${new Date().toISOString()}.json`
  );
  fs.writeFileSync(filePath, dataJSON);
}
