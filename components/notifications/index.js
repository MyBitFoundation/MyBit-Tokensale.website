import React from 'react';
import { Alert } from 'antd';
import { getContentForNotification } from '../constants';

const Notifications = ({ data, removeNotification }) => {

  const initialBottomDistance = 20;
  const difference = 110;

  const toRender = Object.entries(data).map((notification, index) => {
    const id = notification[0];
    const { period, status, amount, actionType, transactionHash } = notification[1];
    const type = status === 0 ? 'info' : status === 1 ? 'success' : 'error';
    const { title, message } =  getContentForNotification(type, amount, period, actionType);

    const alert = (
      <Alert
        message={title}
        description={message}
        type={type}
        showIcon
        closable={type === 'success' || type === 'error'}
        style={{bottom: initialBottomDistance + (index * difference) + 'px'}} key={id}
        onClose={() => removeNotification(id)}
      />
    )

    const toReturn = transactionHash ? (
        <a
          href={`https://etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          key={transactionHash}
        >
        {alert}
        </a>
    ) : alert;

    return toReturn;
  });

  return toRender;
};

export default Notifications;
