import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getPost } from "../redux/modules/postSlice";
import { deleteComment } from "../redux/modules/commentSlice";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Button from "../components/mainButton/MainButton";
import CommentPage from "./CommentPage";

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const info = posts.reduce((acc, cur, idx) => {
    if (cur.id === params.id) {
      acc.num = idx + 1;
      acc.id = cur.id;
      acc.title = cur.title;
      acc.content = cur.content;
      acc.nickname = cur.nickname;
      acc.password = cur.password;
      acc.date = cur.date;
      acc.ip = cur.ip;
    }
    return acc;
  }, {});

  return (
    <div>
      <Header />
      <DetailPageWrapper>
        <span>No.{info.num}</span>
        <h2>{info.title}</h2>
        <div>
          {info.nickname}({info.ip}) | {info.date}
        </div>
        <hr />
        <p>{info.content}</p>
        <ButtonDiv>
          <Button
            onClick={() => {
              let input = prompt("비밀번호를 입력하세요.");
              if (input === info.password) {
                navigate("/update/" + info.id);
              } else if (input === null) {
                alert("취소되었습니다.");
              } else if (input !== info.password) {
                alert("비밀번호가 틀렸습니다.");
              }
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              let input = prompt("비밀번호를 입력하세요.");
              if (input === info.password) {
                if (window.confirm("게시글을 삭제하시겠습니까?")) {
                  dispatch(deletePost(info.id)).then(() => {
                    dispatch(deleteComment(info.id));
                    navigate("/");
                  });
                } else {
                  alert("취소되었습니다.");
                }
              } else if (input === null) {
                alert("취소되었습니다.");
              } else if (input !== info.password) {
                alert("비밀번호가 틀렸습니다.");
              }
            }}
          >
            삭제
          </Button>
          <Button onClick={() => navigate("/post")}>글쓰기</Button>
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </ButtonDiv>
      </DetailPageWrapper>
      <CommentPage />
    </div>
  );
};

const DetailPageWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  min-width: 500px;
  max-width: 800px;
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  hr {
    border: 1px solid #ccc;
    margin: 20px 0;
  }
  p {
    font-size: 1.5rem;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 200px;
`;

export default DetailPage;
