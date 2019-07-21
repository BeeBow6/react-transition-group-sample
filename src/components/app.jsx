import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import TransitionPage from './transition';
import CSSTransitionPage from './cssTransition';
import TransitionGroupPage from './transitionGroup';

const ROUTES = [
  { name: 'Transition', path: '/', Component: TransitionPage },
  { name: 'CSSTransition', path: '/css', Component: CSSTransitionPage },
  { name: 'TransitionGroup', path: '/group', Component: TransitionGroupPage }
];

const App = () => {
  return (
    <div className="page">
      <BrowserRouter basename="/react-transition-group-sample/dist">
        <ul className="menu">
          {ROUTES.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="menu__item"
                activeClassName="menu__item--active"
                exact
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="page__container">
          {ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page__item-"
                  unmountOnExit
                >
                  <div className="page__item">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
