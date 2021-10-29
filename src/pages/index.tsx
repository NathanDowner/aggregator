import Head from 'next/head';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createFeed, updateFeed } from '../api/feeds';
import { fetchFeeds } from '../api/utils';
import Animations from '../components/animations';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { useAuth } from '../contexts/authContext';
import { Feed } from '../models/feed.model';
import { useNotification } from '../contexts/notificationContext';

const Home: React.FC = () => {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currentUser, isAuthLoading } = useAuth();
  const { notifyError, notifySuccess } = useNotification();

  const getFeeds = async () => {
    try {
      const feeds = await fetchFeeds(currentUser);
      setFeeds(feeds);
    } catch (error) {
      notifyError(error.error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, [currentUser]);

  async function handleAddFeed(feedName: string) {
    const existingFeed = feeds.find((f) => f.name === feedName);
    if (!existingFeed) {
      const newFeed: Feed = { name: feedName, sources: [] };
      try {
        const { name } = await createFeed(newFeed);
        notifySuccess('Created feed successfully!');
        setFeeds((prev) => [...prev, { ...newFeed, id: name }]);
      } catch (error) {
        notifyError(error.error);
      }
    }
  }

  async function handleUpdateFeed(feed: Feed) {
    const feedIndex = feeds.findIndex(
      (existingFeed) => existingFeed.name === feed.name
    );
    if (feedIndex !== -1) {
      try {
        await updateFeed(feed);
        notifySuccess('Updated feed successfully!');
      } catch (error) {
        notifyError(error.error);
      }
      setFeeds((prev) => {
        return [
          ...prev.slice(0, feedIndex),
          { ...feed },
          ...prev.slice(feedIndex + 1),
        ];
      });
    }
  }

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>Aggregator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <SideBar
            feeds={feeds}
            activeFeedIndex={activeFeedIndex}
            setActiveFeed={setActiveFeedIndex}
            onAddFeed={handleAddFeed}
            onUpdateFeed={handleUpdateFeed}
            isDrawerOpen={isDrawerOpen}
          />

          {/* Backdrop */}
          <Animations.FadeIn reveal={isDrawerOpen}>
            <div
              onClick={handleCloseDrawer}
              className="absolute z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]"
            />
          </Animations.FadeIn>

          <MainDisplay
            currentFeed={feeds[activeFeedIndex]}
            onOpenDrawer={handleOpenDrawer}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
