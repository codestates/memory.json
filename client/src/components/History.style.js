import styled from "styled-components";

const OuterDiv = styled.div`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  align-content: center;
  padding: 5% 10% 5% 10%;
`;

const HistoryDiv = styled.div`
  width: 50%;
  height: 90vh;
  border-radius: 2rem;
  margin: auto;
  background-color: #faeee0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 15px 15px 10px #334756;
`;

const Image = styled.div`
  border: 1px solid #ad8b73;
  width: 80%;
  margin: auto;
  border-radius: 1rem;
  box-shadow: 3px 3px 2px #826f66;
`;

const YearFavorite = styled.div`
  display: flex;
  background-color: #f9e4c8;
  margin: 5px 1px 5px 1px;
  width: 90%;
  flex-direction: row;
  border-radius: 0.5rem;
  justify-content: space-between;

  box-shadow: 3px 3px 2px #826f66;
`;

const Title = styled.div`
  background-color: #f9e4c8;
  width: 90%;
  border-radius: 0.5rem;
  margin: 5px 1px 5px 1px;
  box-shadow: 3px 3px 2px #826f66;
`;

const Content = styled.div`
  background-color: #f9e4c8;
  width: 90%;
  margin: 5px 1px 5px 1px;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 2px #826f66;
`;

const Commentdiv = styled.div`
  width: 90%;
  background-color: #f9e4c8;
  border-radius: 0.5rem;

  margin: 5px 1px 10px 1px;
  box-shadow: 3px 3px 2px #826f66;
`;

const Searchmapflex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 2% 10% 2% 10%;
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
