# TMDB API
## 영화 정보 큐레이션 사이트 (Netflix/TMDB 클론)
- 핵심 기술: React Router의 심화 활용, 스와이퍼(Swiper.js) 커스텀, 영화 예고편 팝업(유튜브 연동).
- 학습 포인트:  **'필터링'과 '슬라이딩 인터랙션'**이 핵심입니다.
- 추천 API: TMDB API (무료이며 문서화가 아주 잘 되어 있음)
- 영화 검색 기능 추가 
- 영화 상세페이지 React router
- useQuery 사용
- hooks 사용하기
- 페이지네이션
- Filter 기능추가 (장르별)
- Sort 기능추가 (평점순, 인기순)

[공식사이트] (https://developer.themoviedb.org/docs/getting-started?utm_source=chatgpt.com)


### @tanstack/react-query
서버에서 가져오는 데이터를 효율적으로 관리하는 라이브러리입니다.
React의 useState와 useEffect로 직접 API를 호출할 수도 있지만, 캐싱, 로딩 상태, 에러 처리, 자동 재요청, 데이터 동기화 등을 모두 직접 구현해야 합니다. 
TanStack Query는 이런 작업을 대신 처리해 줍니다.
useQuery는 React Query(@tanstack/react-query)에서 가장 많이 사용하는 Hook으로, 서버 데이터를 가져오고(fetch), 캐싱하고, 동기화하는 역할을 합니다.

### useQuery는 서버 상태(Server State)를 관리하는 도구
- useQuery 기본 조회
- queryKey와 캐시 동작 이해
- enabled를 이용한 조건부 조회
- useMutation으로 추가/수정/삭제(CUD) 처리
- invalidateQueries를 이용한 캐시 갱신


#### 설치
```
npm install @tanstack/react-query
```
#### Provider 등록
```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```
#### API
```
const { data, isLoading, error } = useQuery({
  queryKey: ["movies"],
  queryFn: getMovies,
});
```

조회(useQuery)
추가(useMutation)
삭제(useMutation)
수정(useMutation)
invalidateQueries

영화 검색 프로젝트 → useQuery 중심으로 조회와 캐시를 학습
Todo 프로젝트 → useMutation과 invalidateQueries로 CRUD 구현
검색 자동완성 → enabled, queryKey, staleTime을 적용해 성능 개선
무한 스크롤 또는 페이지네이션 → useInfiniteQuery까지 확장


#### Swiper
```
npm i swiper

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
```

#### react-spinners

### useSearchParams는 URL의 ? 뒤에 있는 값을 읽고 변경하는 Hook입니다.
```
/movie?keyword=avatar&page=2

? 뒤의 부분을 Query String(Search Params) 라고 합니다.
keyword=avatar
page=2

이 값을 React에서 쉽게 다룰 수 있게 해주는 것이 useSearchParams입니다.

```

```
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("keyword"));

  return <></>;
}
```

#### <>는 "이 함수(또는 클래스)에 타입 정보를 전달한다"는 의미입니다.
#### TypeScript에서는 제네릭(Generic) 을 사용하는 곳이라면 모두 같은 문법을 사용합니다.
#### 즉, <>는 타입(Type)을 전달하는 문법이고, ()는 실제 값(Value)을 전달하는 문법입니다. 
#### TypeScript에서는 이러한 <> 문법을 제네릭(Generic) 이라고 하며, 
#### useState, useQuery, Promise, Array 등 다양한 곳에서 공통적으로 사용됩니다.
```
interface User {
  name: string;
  age: number;
}

const [user, setUser] = useState<User | null>(null);
```
```
function func<T>(value:T): T {
  return value;
}

함수를 호출할때마다 타입이 결정된다.

let num = func(10);   //number 타입
let bool = func(true);  //boolean 타입
let str = func("string") //string 타입

```

#### useMemo는 계산 결과를 기억했다가 필요한 경우에만 다시 계산하는 Hook입니다.


### 페이지네이션
react-paginate : https://www.npmjs.com/package/react-paginate