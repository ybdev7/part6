import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAnecdotes, updateAnecdote } from "./requests";
import {
  useNotification,
  useNotificationDispatch,
} from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  // const notificationDispatch = useNotificationDispatch();
  const notify = useNotification();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("voting...");
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    // notificationDispatch({
    //   type: "SET",
    //   payload: `You voted for anecdote ${anecdote.content}`,
    // });

    notify(`You voted for anecdote ${anecdote.content}`, 5);
  };

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdotes service is unavailable due to server error</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
