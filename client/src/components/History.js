import * as S from "./History.style";
import React from "react";

const History = (props) => {
  props.histroyList &&
    props.historyList.map((el) => {
      return (
        <S.OuterDiv>
          <S.HistoryDiv>
            <S.Image></S.Image>
            <S.YearFavorite>
              <div>{el.history_year}</div>
              <div>좋아요</div>
            </S.YearFavorite>
            <S.Title>
              <div>{el.history_title}</div>
            </S.Title>
            <S.Content>
              <div>{el.history_content}</div>
            </S.Content>
            <S.Commentdiv>
              <div>댓글</div>
            </S.Commentdiv>
          </S.HistoryDiv>
        </S.OuterDiv>
      );
    });
};
export default History;
