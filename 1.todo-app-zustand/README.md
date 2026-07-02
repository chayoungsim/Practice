# React + TypeScript + Vite

### 상태관리 Zustand 사용

1. todo CRUD 기능추가
2. all| Todo | Done filter 기능추가
3. 상태관리 zustand 이용

### 
```
npm install -D sass - scss사용
npm install zustand - 상태관리

```
### persist
persist는 Zustand 스토어의 상태를 스토리지(기본은 localStorage)에 자동 저장하고, 새로고침 시 자동 복원해주는 미들웨어예요.
create<T>()(persist(설정함수, 옵션)) — persist가 원래의 set/get/store 함수를 감싸서, set이 호출될 때마다 자동으로 storage에도 써줘요.
