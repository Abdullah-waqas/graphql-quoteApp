import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading } = useQuery(GET_ALL_QUOTES);
  if (loading) {
    return <h4>Loading....</h4>;
  }
  if (!data.quotes.length) {
    return <h4>No quotes available!</h4>;
  }
  return (
    <div className="container">
      {data &&
        data.quotes.map((q, index) => {
          const fullName = `${q.user.firstName} ${q.user.lastName}`;
          return (
            <blockquote key={index}>
              <h6>{q.name}</h6>
              <Link to={`/profile/${q.user._id}`}>
                <p className="right-align">~{fullName}</p>
              </Link>
            </blockquote>
          );
        })}
    </div>
  );
}
