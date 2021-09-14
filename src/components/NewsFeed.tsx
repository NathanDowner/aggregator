import { FeedArticle } from '../models/feed.model';
import Article from './Article';

type NewsFeedProps = {
  articles: FeedArticle[];
};

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <Article key={idx} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
