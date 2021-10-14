import { useSession, signIn, signOut } from 'next-auth/client';
const UserAuth = () => {
  const [session, authLoading] = useSession();
  return (
    <div className="flex items-center self p-2 rounded-lg text-sm">
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
