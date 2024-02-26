import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <strong>{anecdote.content}</strong>
      <div>
        {"has "}
        {anecdote.votes} {anecdote.vote === 1 ? "vote" : "votes"}{" "}
        <button onClick={vote}>Vote</button>
      </div>
    </div>
  );
};

const AnecdotesList = () => {
  const dispatch = useDispatch();

  //   sort desc - most voted first
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

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
