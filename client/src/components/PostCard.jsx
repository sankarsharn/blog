import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[380px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[180px] w-full object-cover group-hover:h-[150px] transition-all duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        {/* Clickable title */}
        <Link to={`/post/${post.slug}`}>
          <p className='text-md font-semibold line-clamp-2 hover:underline cursor-pointer'>
            {post.title}
          </p>
        </Link>

        <span className='italic text-xs text-gray-600'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 absolute bottom-[-180px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-1.5 text-sm rounded-md !rounded-tl-none m-2 group-hover:bottom-0'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
