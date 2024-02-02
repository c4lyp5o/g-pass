import { getServerSession } from 'next-auth';

import { authOptions } from './auth/[...nextauth]';

const secretHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.statusCode = 202;
    res.end(`Welcome to the VIP club ${session.user.email}, eheh`);
  } else {
    res.statusCode = 418;
    res.end("Hold on, you're not allowed in here!");
  }
};

export default secretHandler;
