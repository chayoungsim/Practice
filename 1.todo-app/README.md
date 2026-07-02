# React + TypeScript + Vite


## TypeScript 기반 Todo App 프로젝트 작업 계획서
- 기본적인 기능(추가, 조회, 수정, 삭제)울 갖춘 Todo App
- 목표: React와 TypeScript를 사용하는 프로젝트의 기본 구조를 설정합니다.

### 프로젝트 환경
1. 새프로젝트 생성 
```
npm create vite@latest 1.todo-app
```
2. 타입정의 

3. 컴포넌트 구조 설계 및 기본 구현
- 입력폼 컴포넌트  TodoForm.tsx
- 목록 컴포넌트 TodoList.tsx
- 개발항목 컴포넌트 TodoItem.tsx


4. 핵심기능구현 (CRUD)
- Todo 앱의 핵심 기능인 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)를 구현합니다.


5_1. 가장 심플한 Todo
```
```

5_2. Context API + useReducer + Custom Hooks
```
- CRUD
- 검색(Search)
- 필터(All / Active / Completed)
- LocalStorage 저장
- Context API
- useReducer
- Custom Hook
- SCSS Modules

```

### typscript - 인터페이스
타입에 이름을 지어주는 또 다른 문법 + 객체의 구조를 정의 하는데 특화된 문법 (상속, 합침 등의 특수한 기능을 제공함)
함수 타입 표현식  sayHi : () => void;
호출 시그니처 sayHi() : void;   ===> 오버로드 구현시 호출 시그니처

//오버로딩
sayHi() : void
sayHi(a:number, b: number) :void


.trim(): 문자열의 앞과 뒤에 있는 공백(스페이스, 탭, 줄바꿈 등)을 자동으로 깎아내 주는 내장 함수입니다. (글자 사이에 있는 공백은 건드리지 않아요.)

만약 위에서 공백을 깎고 남은 값이 빈 문자열("")이라면, JavaScript에서는 이를 false 같은 값(Falsy)으로 취급합니다.
여기에 느낌표(!)를 붙이면 "비어있다면" 즉, true가 됩니다.

```
const trimmed = input.trim();


```