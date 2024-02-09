import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import Loading from '../../components/loading';

export default function LogKeluar() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  useEffect(() => {
    signOut();
  }, [status]);

  return <Loading />;
}
