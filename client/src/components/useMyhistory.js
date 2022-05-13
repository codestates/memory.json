import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myhistoryModalAction } from "../store/actions";
import axios from "axios";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function useMyhistory(page) {
  const userState = useSelector((state) => state.userinfoReducer);

  const dispatch = useDispatch();

  const { id } = userState;
  const user_id = id;
  // console.log(user_id);

  const [loading, setLoading] = useState(true);
  const [historyFeed, setHistoryfeed] = useState([]);
  const [error, setError] = useState(false);

  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  const historyHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(
        `${serverUrl}histories/user/:${user_id}?page=${page}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      // console.log(res);
      // console.log(res.data.data.rows);
      setHistoryfeed((prev) => [...prev, ...res.data.data.rows]);
      console.log(res.data.data.rows)
      console.log("historyfeed",historyFeed);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    historyHandler(page);
    dispatch(myhistoryModalAction);
  }, [historyHandler, page]);

  return { loading, error, historyFeed };
}

export default useMyhistory;
