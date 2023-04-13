// TODO

import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from './AreaBadge.module.css';

interface BadgeProps {
  workingAreaBagde: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
  workingArea: string;     //   listForAdmin, listForEmployee, addToOrder, OrderSummary
}

const AreaBadge = (props: BadgeProps) => {

  return (
    <>
      <div className={`${styles['working-area-badge']} ${styles[`badge-${props.workingArea}`]}`}>
        {props.workingAreaBagde}
      </div>
    </>
  )
}

export default AreaBadge