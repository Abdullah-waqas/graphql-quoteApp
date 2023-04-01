import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ALL_QUOTES_BY_USER_ID } from "../gqlOperations/queries";

export default function OtherUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_ALL_QUOTES_BY_USER_ID, {
    variables: {
      user_id: userId,
    },
    fetchPolicy: "no-cache",
    onError: () => {
      navigate("/login");
    },
  });

  if (loading) {
    return <h4>Loading....</h4>;
  }
  if (!data?.user?.quotes.length) {
    return <h4>No quotes available!</h4>;
  }
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.email}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>{data.user.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.user.quotes.map((q, index) => (
        <blockquote key={index}>
          <h6>{q.name}</h6>
        </blockquote>
      ))}
    </div>
  );
}
