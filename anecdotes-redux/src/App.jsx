import { useSelector, useDispatch } from "react-redux";
import AnecdotesList from "./components/AnecdotesList";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))} */}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
      <AnecdotesList />
    </div>
  );
};

export default App;
