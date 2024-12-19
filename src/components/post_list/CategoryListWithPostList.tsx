'use client';

import { useRouter } from 'next/navigation';

import { CategoryButton } from './CategoryButton';
import PostTitle from './PostTitle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryDetail, Post, PostWithOrder } from '@/config/types';

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
  postList: PostWithOrder[];
}

const CategoryListWithPostList = ({
  categoryList,
  allPostCount,
  currentCategory = 'all',
  postList,
}: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (value: string) => {
    if (value === 'all') {
      router.push('/blog');
    } else {
      router.push(`/blog/${value}`);
    }
  };

  return (
    <>
      <section className='mb-10 '>
        <ul className='flex flex-col gap-3'>
          {categoryList.map((cg) => (
            <>
              <CategoryButton
                key={cg.dirName}
                href={`/blog/${cg.dirName}`}
                displayName={cg.publicName}
                isCurrent={cg.dirName === currentCategory}
                count={cg.count}
              />
              {postList.map(
                (post, index) =>
                  cg.dirName === post.categoryPath && <PostTitle key={post.url} post={post} />
              )}
            </>
          ))}
        </ul>
      </section>
      <section className='mb-10 sm:hidden'>
        <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All ({allPostCount})</SelectItem>
            {categoryList.map((cg) => (
              <SelectItem key={cg.dirName} value={cg.dirName}>
                {cg.publicName} ({cg.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  );
};

export default CategoryListWithPostList;
