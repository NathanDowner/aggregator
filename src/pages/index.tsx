import Head from 'next/head';
import { useState } from 'react';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { Feed } from '../models/feed.model';

export default function Home() {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [feeds, setFeeds] = useState<Feed[]>([
    {
      name: 'Tech News',
      sources: [
        { name: 'CNET', link: 'http://rss.cnn.com/rss/edition_technology.rss' },
        { name: 'FPT', link: 'https://www.frontpagetech.com/feed/' },
        { name: '9to5 Mac', link: 'https://9to5mac.com/feed/' },
      ],
    },
    {
      name: 'World News',
      sources: [
        { name: 'CNN', link: 'http://rss.cnn.com/rss/edition_world.rss' },
      ],
    },
  ]);

  function handleAddFeed(feedName: string) {
    if (!feeds.find((f) => f.name === feedName)) {
      const newFeed: Feed = { name: feedName, sources: [] };
      setFeeds((prev) => [...prev, newFeed]);
    }
  }

  function handleUpdateFeed(feed: Feed) {
    setFeeds((prev) => {
      const feedIndex = feeds.findIndex(
        (existingFeed) => existingFeed.name === feed.name
      );

      if (feedIndex !== -1) {
        return [
          ...prev.slice(0, feedIndex),
          { ...feed },
          ...prev.slice(feedIndex + 1),
        ];
      }
    });
  }

  return (
    <div className="flex min-h-full">
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
      />
      <MainDisplay currentFeed={feeds[activeFeedIndex]} />
    </div>
  );

  // TODO static/ server side render the feeds
}
