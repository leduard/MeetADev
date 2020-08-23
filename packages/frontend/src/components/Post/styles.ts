import styled from 'styled-components';

export const Container = styled.button`
  min-height: 135px;
  max-height: 135px;
  max-width: 520px;
  width: 100%;
  padding: 10px;

  display: flex;

  align-items: center;

  background-color: #edebeb;
  color: #0a0a0a;
  border: none;
  border-radius: 10px;

  & + & {
    margin-top: 20px;
  }
`;

export const ProfileImage = styled.button`
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

export const Header = styled.div`
  display: flex;
  padding: 0 10px;
  align-self: flex-start;
  justify-content: space-between;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  min-height: 100%;
  align-self: stretch;
  width: 100%;
  padding: 0 0 10px 0;

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

export const Content = styled.p`
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
