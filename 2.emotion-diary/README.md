# 감정다이어리

## React + Typescript

### 
- React Router
- zustand

#### BrowserRouter
- 페이지를 완전히 새로 불러오지 않고도 URL 주소만 깔끔하게 변경할 수 있게 해줍니다.
- 브라우저의 앞으로 가기, 뒤로 가기 버튼이 정상적으로 작동하도록 지원합니다.
- 일반적인 웹사이트처럼 직관적이고 SEO(검색엔진 최적화)에도 유리한 URL 형태를 유지합니다.
- BrowserRouter는 내부적으로 Context API를 사용하여 라우팅 정보를 자식 컴포넌트들에게 전달합니다. 
  따라서 Link, Routes, Route, useNavigate 같은 리액트 라우터의 기능(훅/컴포넌트)을 사용하려면 반드시 그 상위에 BrowserRouter가 씌워져 있어야 합니다.
```
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter> 
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    </Routes>
</BrowserRouter>

```

### createBrowserRouter (최신권장방식)
- 화면을 그리기 전에 미리 데이터를 가져옴 (Data APIs)
- 화면 전환과 데이터 로딩이 동시에 처리되어 부드러움
- errorElement 속성으로 손쉽게 라우트별 에러 처리
- loader, action, errorElement 같은 강력한 데이터 API 기능을 온전히 활용할 수 있습니다.

```
// main.tsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. 라우터를 객체 배열 형태로 정의합니다.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />, // 에러 처리도 한 번에!
  },
  {
    path: "/about",
    element: <About />,
    // loader: () => fetch('/api/about-data'), // 화면 렌더링 전에 데이터 페칭 가능!
  },
]);

{/* 2. RouterProvider에 생성한 라우터 객체를 주입합니다. */}
<RouterProvider router={router} />

//App.tsx
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App

```

### TypeScript 타입정의
확장성과 사용 목적에서 결정적인 차이

#### type(Type Alias) 
- 모든 타입의 **별칭(Alias)**을 만들 때
- 선언 병합 (Declaration Merging) 불가능(동일한 이름 선언 시 에러)
- 확장(상속) 방식 인터섹션(&) 연산자 사용
- 원시 타입, 유니온(|), 튜플 등 모든 타입 가능

#### interface
- 객체(Object)의 구조를 정의할 때
- 선언 병합 (Declaration Merging) 가능(동일한 이름으로 선언하면 자동 합쳐짐)
- 확장(상속) 방식 extends 키워드 사용
- 객체 구조만 가능


### Zustand에서 persist 미들웨어 사용
persist 미들웨어를 사용하면 새로고침을 해도 상태(State)가 사라지지 않고 LocalStorage나 SessionStorage에 안전하게 저장됩니다.