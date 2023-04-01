import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_USER_PROFILE } from "../gqlOperations/queries";

export default function Profile() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    onError: () => {
      navigate("/login");
    },
  });

  if (loading) {
    return <h4>Loading....</h4>;
  }
  if (!data?.profile?.quotes.length) {
    return <h4>No quotes available!</h4>;
  }
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.profile.email}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.profile.firstName} {data.profile.lastName}
        </h5>
        <h6>{data.profile.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.profile.quotes.map((q, index) => (
        <blockquote key={index}>
          <h6>{q.name}</h6>
        </blockquote>
      ))}
    </div>
  );
}
