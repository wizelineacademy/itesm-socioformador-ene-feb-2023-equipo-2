// TODO

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from './TextBox.module.css';

interface BadgeProps {
  textBoxText: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  textBoxColorScheme: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
}

const TextBox = (props: BadgeProps) => {

  return (
    <>
      <div className={`${styles['text-box']} ${styles[`badge-${props.textBoxColorScheme}`]}`}>
        {props.textBoxText}
      </div>
    </>
  )
}

export default TextBox