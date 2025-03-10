import { CategoryDetail, HeadingItem, Post, PostMatter, PostWithOrder } from '@/config/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

// const BASE_PATH = path.join('src', 'posts');
const BASE_PATH = 'src/posts'; // 윈도우 기준 /src/posts가 아닌 src/posts
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 MDX 파일 조회
export const getPostPaths = (category?: string) => {
  const folder = category || '**';
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

// MDX 파일 파싱 : abstract / detail 구분
const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

// MDX의 개요 파싱
// url, cg path, cg name, slug
export const parsePostAbstract = (postPath: string) => {
  postPath = postPath.replaceAll('\\', '/'); // 윈도우 기준 이거 수정해야함

  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '');

  const [categoryPath, slug] = filePath.split('/');
  const url = `/blog/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);
  return { url, categoryPath, categoryPublicName, slug };
};

// MDX detail
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  // const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');
  const dateString = format(new Date(grayMatter.date), 'yyyy년 MM월 dd일', { locale: ko });
  return { ...grayMatter, dateString, content, readingMinutes };
};

// category folder name을 public name으로 변경 : dir_name -> Dir Name
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');

// post를 날짜 최신순으로 정렬
const sortPostList = (PostList: Post[]) => {
  return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

// 모든 포스트 목록 조회. 블로그 메인 페이지에서 사용
export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category);

  const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath)));
  return postList;
};

export const getPostListWithOrder = (postList: Post[]): PostWithOrder[] => {
  const sortedPostList = postList.sort((a, b) => {
    if (a.categoryPath === b.categoryPath) {
      return a.date.getTime() - b.date.getTime();
    }

    return a.categoryPath.localeCompare(b.categoryPath);
  });

  let order = 1;
  const postListWithOrder: PostWithOrder[] = sortedPostList.map((post, index, arr) => {
    if (index > 0 && arr[index].categoryPath !== arr[index - 1].categoryPath) {
      order = 1;
    }
    return { ...post, order: order++ };
  });

  // postListWithOrder.forEach((post) => console.log('post => ', post.categoryPath, post.order));

  return postListWithOrder;
};

// 모든 포스트 작성 일자 조회
export const getPostedDates = async (): Promise<Date[]> => {
  const postPaths = getPostPaths();

  const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath)));
  const postedDates = postList.map((post) => post.date);
  return postedDates;
};

export const getSortedPostList = async (category?: string) => {
  const postList = await getPostList(category);
  return sortPostList(postList);
};

export const getSitemapPostList = async () => {
  const postList = await getPostList();
  const baseUrl = 'https://github.com/pending-done';
  const sitemapPostList = postList.map(({ url }) => ({
    lastModified: new Date(),
    url: `${baseUrl}${url}`,
  }));
  return sitemapPostList;
};

export const getAllPostCount = async () => (await getPostList()).length;

export const getCategoryList = () => {
  const cgPaths: string[] = sync(`${POSTS_PATH}/*`);
  // const cgList = cgPaths.map((path) => path.split('/').slice(-1)?.[0]);
  const cgList = cgPaths.map((p) => {
    const normalizedPath = p.split(path.sep); // 운영체제에 맞는 구분자로 분리
    return normalizedPath[normalizedPath.length - 1]; // 마지막 요소 반환
  });
  return cgList;
};

export const getCategoryDetailList = async () => {
  const postList = await getPostList();
  const result: { [key: string]: number } = {};
  for (const post of postList) {
    const category = post.categoryPath;
    if (result[category]) {
      result[category] += 1;
    } else {
      result[category] = 1;
    }
  }
  const detailList: CategoryDetail[] = Object.entries(result).map(([category, count]) => ({
    dirName: category,
    publicName: getCategoryPublicName(category),
    count,
  }));

  return detailList;
};

// post 상세 페이지 내용 조회
export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace('##', '').replace('#', ''),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};
