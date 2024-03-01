import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotification } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const notify = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notify(`Added new anecdote ${data.content}`);
    },
    onError: (error) => {
      console.log(error);
      if (error.response.data.error) {
        notify(`Error: ${error.response.data.error}`);
      } else notify(`Error: ${error.message}`);
    },
  });
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");

    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
