import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(newAnecdote(anecdote));

    dispatch(showNotification(`Added Anecdote ${anecdote}`, 5));
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>Create New</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button>Create</button>
    </form>
  );
};

export default AnecdoteForm;
