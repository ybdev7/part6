import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("anecdote reducer", () => {
  const initialState = [
    { content: "If it hurts, do it more often", id: 1, votes: 0 },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: 2,
      votes: 0,
    },
  ];

  test("should return a proper initial state when called with undefined state ", () => {
    const action = {
      type: "anecdotes/nothing",
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState.length).toEqual(6);
  });

  test.only("vote", () => {
    const action = {
      type: "anecdotes/vote",
      payload: 1,
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0].votes).toEqual(1);
  });

  test.only("new", () => {
    const action = {
      type: "anecdotes/newAnecdote",
      payload: "test anecdote",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[2].content).toEqual("test anecdote");
    expect(newState[2].votes).toEqual(0);
  });
});
