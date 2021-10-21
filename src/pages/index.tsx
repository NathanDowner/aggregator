import Head from 'next/head';
import { useEffect, useState } from 'react';
import { createFeed, updateFeed } from '../api/feeds';
import { fetchFeeds } from '../api/utils';
import Animations from '../components/animations';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { useAuth } from '../contexts/authContext';
import { Feed } from '../models/feed.model';

const Home: React.FC = () => {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currentUser } = useAuth();

  const getFeeds = async () => {
    setIsLoading(true);
    try {
      const feeds = await fetchFeeds(currentUser);
      setFeeds(feeds);
    } catch (error) {
      alert(error.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFeeds();
  }, []);

  useEffect(() => {
    getFeeds();
  }, [currentUser]);

  async function handleAddFeed(feedName: string) {
    const existingFeed = feeds.find((f) => f.name === feedName);
    if (!existingFeed) {
      const newFeed: Feed = { name: feedName, sources: [] };
      try {
        const { name } = await createFeed(newFeed);
        setFeeds((prev) => [...prev, { ...newFeed, id: name }]);
      } catch (error) {
        alert(error.error);
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
      } catch (error) {
        alert(error.error);
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
    <div className="flex h-screen">
      <Head>
        <title>Aggregator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
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
    </div>
  );
};

export default Home;
