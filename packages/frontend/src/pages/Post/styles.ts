import styled from 'styled-components';

import backgroundSvg from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  color: #edebeb;
`;

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 520px;
`;

export const PostContainer = styled.div`
  min-height: 175px;
  max-height: 175px;
  max-width: 520px;
  width: 100%;
  padding: 10px;

  display: flex;

  align-items: center;

  background-color: #edebeb;
  color: #0a0a0a;
  border: none;
  border-radius: 10px;

  margin-top: 120px;
`;

export const PostProfileImage = styled.button`
  min-height: 45px;
  min-width: 45px;

  display: flex;
  justify-content: center;
  align-self: flex-start;
  align-items: center;

  border: 1px solid #0a0a0a;
  border-radius: 26px;

  background-color: #02c76b;
  color: #0a0a0a;
  font-weight: bold;

  h1 {
    font-weight: bold;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  padding: 0 10px;
  align-self: flex-start;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;

  > h5:first-child {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const PostContentWrapper = styled.div`
  min-height: 100%;
  align-self: stretch;
  width: 100%;
  padding: 0 0 10px 0;

  > h5 {
    text-align: left;
    color: #727171;
    padding: 0 10px;
  }

  svg {
    display: flex;
    float: right;
    background: none;
    border: none;
    fill: #dfdfdf;
    transition: 0.5s;

    &:hover {
      stroke: none;
      fill: #da2f3a;
    }
  }
`;

export const PostContent = styled.p`
  margin-top: 10px;
  min-height: 60px;
  font-size: 16px;
  font-weight: 500;
  text-align: justify;
  line-height: 22px;
  padding: 5px 0 5px 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Image = styled.div`
  flex: 1;

  background: url(${backgroundSvg}) no-repeat center,
    linear-gradient(#121212, #0a0a0a);
  background-size: cover;
`;
