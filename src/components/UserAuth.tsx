import { useSession, signIn, signOut } from 'next-auth/client';
import { useEffect } from 'react';
const UserAuth = () => {
  const [session, isAuthLoading] = useSession();

  useEffect(() => {
    if (session?.uid) {
      localStorage.setItem('userId', session.uid);
    } else {
      localStorage.removeItem('userId');
    }
    return () => {};
  }, [session]);
  return (
    <div className="mt-auto mb-12 pl-8 bg-primary-100 flex items-center self p-2 text-sm">
      <div className="mr-2">
        {session ? (
          <img
            src={session.user.image}
            className="h-8 w-8 rounded-full"
            alt={`${session.user.name}'s profile photo`}
          />
        ) : (
          <div className="rounded-full h-8 w-8 bg-gray-100" />
        )}
      </div>
      <div>
        <div className="">{session ? session.user.name : 'Guest User'}</div>
        {session ? (
          <div
            onClick={() => signOut()}
            className="text-primary-500 cursor-pointer hover:underline"
          >
            Log Out
          </div>
        ) : (
          <div
            onClick={() => signIn('google')}
            className="text-primary-500 cursor-pointer hover:underline"
          >
            Log in here
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
