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

  function handleAddSource(feedName: string, sourceName: string, url: string) {
    setFeeds((prev) => {
      const feedIndex = feeds.findIndex((feed) => feed.name === feedName);
      return [
        ...prev.slice(0, feedIndex),
        {
          ...prev[feedIndex],
          sources: [
            ...prev[feedIndex].sources,
            { name: sourceName, link: url },
          ],
        },
        ...prev.slice(feedIndex + 1),
      ];
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
        onAddSource={handleAddSource}
      />
      <MainDisplay currentFeed={feeds[activeFeedIndex]} />
    </div>
  );

  // TODO static/ server side render the feeds
}
