import React, { useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const Card = ({ onDelete, children }) => (
  <li className="fade-card">
    <div className="fade-card__body">
      {children}
      <button
        type="button"
        className="fade-card__del"
        onClick={onDelete}
      >
        delete
        </button>
    </div>
  </li>
);

const AddList = ({ addItem }) => {
  const [value, setValue] = useState('');
  const itemId = useRef(0);

  return (
    <form
      className="fade-add"
      onSubmit={e => {
        e.preventDefault();
        itemId.current = itemId.current + 1;
        setValue('');
        addItem({
          id: itemId.current,
          value
        });
      }}
    >
      <input
        type="text"
        className="fade-add__text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="btn"
        disabled={!value}
      >
        Add
      </button>
    </form>
  );
};

const TransitionGroupPage = () => {
  const [list, setList] = useState([]);

  return (
    <div>
      <AddList addItem={item => setList([item, ...list])} />
      <TransitionGroup component="ul">
        {list.map(({ id, value }) => (
          <CSSTransition
            key={id}
            timeout={200}
            classNames="fade-card-"
          >
            <Card onDelete={() => setList(list.filter(item => item.id !== id))}>
              {value}
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TransitionGroupPage;