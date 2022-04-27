import React, { useState } from 'react';
import styled from 'styled-components';

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;
const ModalBack = styled.div`
  z-index: -1;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
  min-height: 400px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: 15vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow: hidden;
`;

function Signup({ }) {
  return (
    <ModalArea>
      <ModalBack>
        <ModalView>
          <div>
            <div
              role='button'
              onClick={closeFun}
              className='back-arrow'
              aria-hidden='true'
            >
              &times;
            </div>
          </div>
          <form>
            <label htmlFor='id'>아이디</label>
            <input type='id' id='id' placeholder='id'></input>

            <label htmlFor='password'>비밀번호</label>
            <input type='password' id='password' placeholder='비밀번호' />

            <label htmlFor='password2'>비밀번호 확인</label>
            <input type='password' id='password2' placeholder='비밀번호 확인' />

            <label htmlFor='nickname'>이름</label>
            <input type='text' id='nickname' placeholder='닉네임' />

            <label htmlFor='name'>이름</label>
            <input type='text' id='name' placeholder='이름' />

            <button className='signup_button' type='button'>
              회원가입
            </button>
          </form>
          </ModalView>
      </ModalBack>
    </ModalArea>
  );
}

export default Signup;