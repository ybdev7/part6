import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../utils";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(anecdote));

    showNotification(dispatch, `Added Anecdote ${anecdote}`);
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
