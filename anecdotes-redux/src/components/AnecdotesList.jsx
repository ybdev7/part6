import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

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

  //filter
  //   sort desc - most voted first
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => {
            console.log("will vote for id=", anecdote.id);
            dispatch(vote(anecdote));

            dispatch(showNotification(`You voted for ${anecdote.content}`, 5));
          }}
        />
      ))}
    </div>
  );
};

export default AnecdotesList;
