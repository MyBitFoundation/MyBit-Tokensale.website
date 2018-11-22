import React from 'react';
import { Alert } from 'antd';
import { getContentForNotification } from '../constants';

const Notifications = ({ data, removeNotification }) => {

  const initialBottomDistance = 20;
  const difference = 110;

  const toRender = Object.entries(data).map((notification, index) => {
    const hash = notification[0];
    const { period, status, amount, actionType } = notification[1];
    const type = status === 0 ? 'info' : status === 1 ? 'success' : 'error';
    const { title, message } =  getContentForNotification(type, Number(amount).toLocaleString(), period, actionType);

    return(
      <a
        href={`https://ropsten.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        key={hash}
      >
        <Alert
          message={title}
          description={message}
          type={type}
          showIcon
          closable={type === 'success' || type === 'error'}
          style={{bottom: initialBottomDistance + (index * difference) + 'px'}} key={hash}
          onClose={() => removeNotification(hash)}
        />
      </a>
    )
  });

  return toRender;
};

export default Notifications;
