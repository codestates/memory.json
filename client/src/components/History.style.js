import styled from "styled-components";

const OuterDiv = styled.div`
  width: 80%;
  height: 60vh;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  align-content: center;
  padding: 5% 10% 5% 10%;
`;

const HistoryDiv = styled.div`
  width: 600px;
  height: auto;
  margin: auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  border: 1px solid black;
  width: 300px;
  margin: auto;
`;

const YearFavorite = styled.div`
  display: flex;
  margin-top: 5%;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
`;

const Title = styled.div`
  border: 1px solid black;
`;

const Content = styled.div`
  border: 1px solid black;
`;

const Commentdiv = styled.div`
  border: 1px solid black;
`;

const Searchmapflex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 2% 10% 2% 10%;
  border: 1px solid black;
`;

const Inputbutton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Kakaomap = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  OuterDiv,
  HistoryDiv,
  Image,
  YearFavorite,
  Title,
  Content,
  Commentdiv,
  Searchmapflex,
  Inputbutton,
  Kakaomap,
};
