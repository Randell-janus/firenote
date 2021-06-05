import firebase from "firebase";
import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Todos = () => {
  const [todo, setTodo] = useState("");

  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>

      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button type="submit">Add</button>
        </form>
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </main>
    </div>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };

  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };

  return (
    <div className="todo-container">
      <div key={id} className="todo">
        <p
          className={`todo-item ${complete ? "complete" : ""}`}
          tabIndex="0"
          onClick={() => onCompleteTodo(id, complete)}
        >
          {text}
        </p>
        <button className="remove-todo" onClick={() => onDeleteTodo(id)}>remove</button>
      </div>
    </div>
  );
};

export default Todos;
