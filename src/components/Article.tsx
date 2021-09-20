import { ClockIcon, UserCircleIcon } from '@heroicons/react/solid';
import DOMPurify from 'dompurify';
import { FeedArticle } from '../models/feed.model';

type ArticleProps = {
  article: FeedArticle;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  const { title, creator, isoDate, content, categories, link } = article;
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const sanitizeHtml = () => ({
    __html: DOMPurify.sanitize(content),
  });

  const postDate = new Date(isoDate);
  return (
    <article className="bg-white p-4 shadow-lg rounded-lg">
      <header>
        <h2 className="font-semibold mb-1">{title}</h2>
        {/* tags row */}
        {/* {categories && (
          <div className="flex space-x-1 overflow-x-auto">
            {categories.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 rounded-full bg-gray-400 text-xs text-white whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}

        <div className="flex justify-between text-gray-400 text-xs my-2">
          <p className="flex items-center">
            <UserCircleIcon className="h-3 mr-1" />
            {creator}
          </p>
          <p className="flex items-center">
            <ClockIcon className="h-3 mr-1" />

            {postDate.toLocaleDateString('en-GB', options)}
          </p>
        </div>
      </header>
      <div
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={sanitizeHtml()}
      />
      <footer className=" flex justify-start">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          See Full
        </a>
      </footer>
    </article>
  );
};

export default Article;
