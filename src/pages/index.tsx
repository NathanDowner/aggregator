import Head from 'next/head';
import { useState } from 'react';
import MainDisplay from '../components/MainDisplay';
import SideBar from '../components/SideBar';
import { Feed } from '../models/feed.model';

const feeds: Feed[] = [
  {
    name: 'Tech News',
    sources: [
      { name: 'CNET', link: 'https://www.cnet.com/rss/all/' },
      { name: 'FPT', link: 'https://www.frontpagetech.com/feed/' },
      // { name: '9to5 Mac', link: 'https://9to5mac.com/feed/' },
    ],
  },
  // { name: 'feed 2', sources: [{ name: 'CNET', link: '' }] },
  // { name: 'feed 3', sources: [{ name: 'CNET', link: '' }] },
];

export default function Home() {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
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
      />
      <MainDisplay currentFeed={feeds[activeFeedIndex]} />
    </div>
  );
}
