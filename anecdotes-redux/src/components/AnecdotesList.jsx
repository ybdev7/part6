import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      {anecdote.content}
      <p>
        {" "}
        {anecdote.votes} <button onClick={vote}>Vote</button>
      </p>
    </div>
  );
};

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdotesList;
