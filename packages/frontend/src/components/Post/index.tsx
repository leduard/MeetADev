import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Container,
  ProfileImage,
  Header,
  ContentWrapper,
  Content,
} from './styles';

interface PostInterface {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    username: string;
    followers_count: number;
    following_count: number;
  };
}

interface PostComponent {
  post: PostInterface;
}

const Post: React.FC<PostComponent> = ({ post }) => {
  const history = useHistory();

  return (
    <Container
      onClick={(e): void => {
        e.stopPropagation();
        history.push(`/${post.user.username}/s/${post.id}`);
      }}
    >
      <ProfileImage
        onClick={(e): void => {
          e.stopPropagation();
          history.push(`/${post.user.username}`);
        }}
      >
        {post.user.username.charAt(0)}
      </ProfileImage>
      <ContentWrapper>
        <Header>
          <h5 style={{ fontSize: 14 }}>{`@${post.user.username}`}</h5>
          <h5 style={{ fontSize: 12 }}>
            {`${formatDistanceToNow(new Date(post.created_at), {
              locale: ptBR,
              includeSeconds: true,
            })} atrás`}
          </h5>
        </Header>
        <Content>{post.content}</Content>
        {/* <FiHeart
          onClick={(e): void => {
            e.stopPropagation();
            console.log('like');
          }}
          size={25}
          strokeWidth={1}
        /> */}
      </ContentWrapper>
    </Container>
  );
};

export default Post;
