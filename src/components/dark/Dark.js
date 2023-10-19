import React from 'react';
import './dark.scss';

export const Dark = (props) => {
  const cls = ['dark'];

  if(props.showModal) {
    cls.push('show_dark');
  }

  return (
    <div className={cls.join(' ')} onClick={props.hideModalHandler}/>
  )
}