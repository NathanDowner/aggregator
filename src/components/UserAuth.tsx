import { useAuth } from '../contexts/authContext';
const UserAuth = () => {
  const { signInWithGoogle, signOut, currentUser } = useAuth();

  return (
    <div className="mt-auto border-t flex items-center self p-2 text-sm md:mb-12">
      <div className="mr-2">
        {currentUser ? (
          <img
            src={currentUser.photoURL}
            className="h-8 w-8 rounded-full"
            alt={`${currentUser.displayName}'s profile photo`}
          />
        ) : (
          <div className="rounded-full h-8 w-8 bg-gray-100" />
        )}
      </div>
      <div>
        <div className="">
          {currentUser ? currentUser.displayName : 'Guest User'}
        </div>
        {currentUser ? (
          <div
            onClick={() => signOut()}
            className="text-primary-500 cursor-pointer hover:underline"
          >
            Log Out
          </div>
        ) : (
          <div
            onClick={signInWithGoogle}
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
