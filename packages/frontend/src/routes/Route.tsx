import React from 'react';
import {
  Route as ReactRouterDOM,
  RouteProps as ReactRouterDOMProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/Auth';

interface RouteProps extends ReactRouterDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const {
    user: { user },
  } = useAuth();

  return (
    <ReactRouterDOM
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/login' : '/' }} />
        );
      }}
    />
  );
};

export default Route;
