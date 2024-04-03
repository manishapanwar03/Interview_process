import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Comments.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getResponseComment,
  postResponseComment,
} from "../Redux/Actions/InterviewActions";

function Comments() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState();
  const config = {
    headers: { Authorization: `Barear ${localStorage.getItem("token")}` },
  };

  const dispatch = useDispatch();

  const CommentData = useSelector(
    (state) => state.InterviewReducer2.CommentData
  );

  const PostCommentData = useSelector(
    (state) => state.InterviewReducer2.PostCommentData
  );

  useEffect(() => {
    setComments(CommentData);
    if (CommentData.length > 0) {
      setUserData(CommentData[0].user);
    }
  }, [CommentData]);

  useEffect(() => {
    setComments((prevComments) => [...prevComments, PostCommentData]);
    setComment("");
  },[PostCommentData]);

  const onClickHandler = (e) => {
    e.preventDefault();
    let userData = {
      comment: comment,
      question: id,
      parent_comment: null,
      user: null,
    };
    // axios
    //   .post(
    //     `${process.env.REACT_APP_BASE_URL}/interview_tracking/comment/${id}/`,
    //     userData
    //   )
    //   .then((response) => {
    // setComments((prevComments) => [...prevComments, response.data]);
    // setComment("");
    //     dispatch(getResponseComment(id));
    //   })
    //   .catch((error) => {
    //     console.error("Error posting comment:", error);
    //   });
    dispatch(postResponseComment(id, userData));
  };

  // const fetchComments = () => {
  //   // axios
  //   //   .get(`${process.env.REACT_APP_BASE_URL}/interview_tracking/comment/${id}/`)
  //   //   .then((response) => {
  //   //     setComments(response.data);
  //   //     if (response.data.length > 0) {
  //   //       setUserData(response.data[0].user);
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching comments:", error);
  //   //   });

  // };
  useEffect(() => {
    dispatch(getResponseComment(id));
  }, []);

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="main-container">
      <div
        style={{
          textAlign: "center",
          width: "300px",
          height: "auto",
          padding: "10px 20px",
          marginLeft: "500px",
        }}
      >
        {comments.map((text, index) => (
          <div key={index} className="comment-container">
            {userData && (
              <img
                src={userData.profile_picture_url}
                alt="User Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            )}
            <strong>{userData && userData.username}</strong> {text.comment}😊
          </div>
        ))}
      </div>

      <div className="comment-flexbox">
        <br />
        <textarea
          value={comment}
          onChange={onChangeHandler}
          className="input-box"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }}
          placeholder="Add a comment 😊"
        />
        <div className="smile-icons">
          <span role="img" aria-label="smile">
            😊
          </span>
          <span role="img" aria-label="grinning">
            😄
          </span>
        </div>
        <br />
        <div>
          <button onClick={onClickHandler} className="comment-button button-15">
            {" "}
            Submit{" "}
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Comments;
