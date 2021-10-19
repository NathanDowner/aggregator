import { Transition } from '@headlessui/react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { createFeed, getFeeds, getSampleFeeds, updateFeed } from '../api/feeds';
import { fetchFeeds } from '../api/utils';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { Feed } from '../models/feed.model';

type Props = {
  initFeeds: Feed[];
};

const Home: React.FC<Props> = ({ initFeeds }) => {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [feeds, setFeeds] = useState<Feed[]>(initFeeds);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function handleAddFeed(feedName: string) {
    const existingFeed = feeds.find((f) => f.name === feedName);
    if (!existingFeed) {
      const newFeed: Feed = { name: feedName, sources: [] };
      try {
        const { name } = await createFeed(newFeed);
        setFeeds((prev) => [...prev, { ...newFeed, id: name }]);
      } catch (error) {
        alert(error);
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
        alert(error);
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
      <SideBar
        feeds={feeds}
        activeFeedIndex={activeFeedIndex}
        setActiveFeed={setActiveFeedIndex}
        onAddFeed={handleAddFeed}
        onUpdateFeed={handleUpdateFeed}
        isDrawerOpen={isDrawerOpen}
      />
      {/* Backdrop */}
      <Transition
        as={Fragment}
        show={isDrawerOpen}
        enter="transition-opacity"
        enterFrom="opacity-0"
        // enterTo="opacity-20"
        leave="transition-opacity"
        // leaveFrom="opacity-30"
        leaveTo="opacity-0"
      >
        <div
          onClick={handleCloseDrawer}
          className="absolute z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]"
        />
      </Transition>
      <MainDisplay
        currentFeed={feeds[activeFeedIndex]}
        onOpenDrawer={handleOpenDrawer}
      />
    </div>
  );
};

export default Home;
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  try {
    const feeds = await fetchFeeds(session);
    return {
      props: {
        initFeeds: Object.keys(feeds).map((k) => ({
          ...feeds[k],
          id: k,
          sources: feeds[k].sources ?? [],
        })),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initFeeds: [],
      },
    };
  }
}
