import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '../types/todo';

interface TodoState {
    todos: Todo[];
    addTodo : (text:string) => void;
    toggleTodo : (id: number) => void;
    deleteTodo : (id: number) => void;
    editTodo : (id:number, text:string) => void;
}


// create<TodoState>() -> 스토어 생성
// persist(...) -> 이 스토어를 감싸면 상태가 자동으로 localStorage와 동기화됨
//   - 이전에 직접 짰던 useEffect 2개(읽기/쓰기) 로직이 전부 이 한 줄로 대체됨

export const useTodoStore = create<TodoState>()(
    persist(
          (set) => ({
          todos: [],
     
          addTodo: (text: string) =>
            set((state) => ({
              todos: [
                ...state.todos,
                {
                  id: Date.now(),
                  text,
                  completed: false,
                  createdAt: Date.now(),
                },
              ],
            })),
     
          toggleTodo: (id: number) =>
            set((state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              ),
            })),
     
          deleteTodo: (id: number) =>
            set((state) => ({
              todos: state.todos.filter((todo) => todo.id !== id),
            })),

          editTodo : (id:number, text:string) =>
            set((state) => ({
                todos: state.todos.map((todo) => todo.id === id ? {...todo, text} : todo)
            }))   

        }),
        {
          name: 'todos', // localStorage에 저장될 key 이름 (이전 STORAGE_KEY와 동일 역할)
        }
    )
)