

const TodoItem = () => {
  return (
    <div className="todo-item">
        <label htmlFor="">
            <input type="checkbox" />
            <span className="cont">할일들...</span>
            <span className="date">2026-07-02</span>
        </label>
        <div className="btns">
            <button>수정</button>
            <button>삭제</button>
        </div>        
    </div>
  )
}

export default TodoItem