import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlOperations/mutations";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [createQuote, { error, loading, data }] = useMutation(CREATE_QUOTE, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    refetchQueries: ["getUserProfile", "getAllQuotes"],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({ variables: { name: quote } });
  };

  if (loading) {
    return <h4>Loading....</h4>;
  }

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.quote && (
        <div className="green card-panel">Quote created successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
