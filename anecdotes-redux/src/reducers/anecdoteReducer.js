import { createSlice } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // vote(state, action) {
    //   console.log("voting..action=", action);
    //   return state.map((a) =>
    //     a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
    //   );
    // },
    replaceAnecdote(state, action) {
      console.log("replacing..action=", action);
      return state.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const allAnecdotes = await anecdotes.getAll();
    dispatch(setAnecdotes(allAnecdotes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const result = await anecdotes.createNew(content);
    dispatch(appendAnecdote(result));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const result = await anecdotes.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(replaceAnecdote(result));
  };
};

export const { setAnecdotes, appendAnecdote, replaceAnecdote } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
