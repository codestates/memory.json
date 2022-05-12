import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function useFetch(page) {
  const userState = useSelector((state) => state.userinfoReducer);
  const { id } = userState;
  const user_id = id;
  // console.log(user_id);

  const [loading, setLoading] = useState(true);
  const [historyFeed, setHistoryfeed] = useState([
    {
      id: 3,
      place_id: 5,
      user_id: 4,
      history_title: "여기 제목을 보세요!",
      history_content: "여기 재밌는 내용이에요!",
      history_year: 1999,
      favorite_count: 30,
      created_at: "2019-08-25 12:36:04",
      updated_at: "2019-08-25 12:36:04",
    },
    {
      id: 4,
      place_id: 5,
      user_id: 7,
      history_title: "여기 제목을 보세요2!",
      history_content: "여기 재밌는 내용이에요2!",
      history_year: 2001,
      favorite_count: 20,
      created_at: "2019-08-25 12:36:04",
      updated_at: "2019-08-25 12:36:04",
    },
  ]);
  const [error, setError] = useState(false);

  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  const historyHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`${serverUrl}histories/user/:${user_id}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      const tempData = [
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 3,
          place_id: 5,
          user_id: 4,
          history_title: "여기 제목을 보세요!",
          history_content: "여기 재밌는 내용이에요!",
          history_year: 1999,
          favorite_count: 30,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
        {
          id: 4,
          place_id: 5,
          user_id: 7,
          history_title: "여기 제목을 보세요2!",
          history_content: "여기 재밌는 내용이에요2!",
          history_year: 2001,
          favorite_count: 20,
          created_at: "2019-08-25 12:36:04",
          updated_at: "2019-08-25 12:36:04",
        },
      ];
      setHistoryfeed((prev) => [...prev, ...tempData]);
      console.log(historyFeed);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    historyHandler(page);
  }, [historyHandler, page]);

  return { loading, error, historyFeed };
}

export default useFetch;
