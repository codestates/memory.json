import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function useMyhistory(page) {
  const userState = useSelector((state) => state.userinfoReducer);

  const { id } = userState;
  const user_id = id;

  const [loading, setLoading] = useState(true);
  const [historyFeed, setHistoryfeed] = useState([]);
  const [error, setError] = useState(false);

  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  const historyHandler = useCallback( async () => {
    try {
      setLoading(false);
      setError(false);
      const res = await axios.get(
        `${serverUrl}histories/user/${user_id}?page=${page}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      setHistoryfeed((prev) => [...prev, ...res.data.data.rows]);
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

export default useMyhistory;
