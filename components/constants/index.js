const regexp = /^\d+(\.\d{1,29})?$/;

export const ETHEREUM_TICKER_COINMARKETCAP = 1027;

export const debug = (message) => console.log(message);

export const tokensPerDay = 100000;

export const dayInSeconds = 86400;

export const periodsPerPage = 25;

export const MyBitTokenSaleAPIEndpoint = 'https://api.mybit.io';

export const tokenSaleEvents = {
  fund: '0xd498819977fb9763f29bab6e4eee516c4cf59053922eb6a9fe59370a7bc28b3d',
  claim: '0x33a4ae6c0627280fcb7aaf7e07deb59bbce49aa4808ee5457f8622f77ab5d28c',
};

export const correctNetwork = 'ropsten';
//represents mainnet in metamask
export const tmp = 'main';

export const getSecondsUntilNextPeriod = (timestampStartTokenSale) => {
  const currentDay = ((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / dayInSeconds) + 1;
  const past = currentDay % 1;
  const secondsUntilNextPeriod = ((1 - past) * dayInSeconds).toFixed(0);

  return secondsUntilNextPeriod;
}

export const isDecimal = (val) => {
  return regexp.test(val);
}

export const shortenAddress = (address, leftSide=15, rightSide=8) => {
  const size = address.length;
  let splitAddress = [address.slice(0, leftSide), address.slice(size - rightSide, size)]
  return splitAddress[0] + "..." + splitAddress[1];
}

export const getContentForNotification = (type, amount, period, actionType) => {
  if(actionType === 'claim'){
    switch (type) {
      case 'success':
        return {
          title: `#${period} - Received ${Number(amount).toLocaleString('en-US')} MYB successfully!`,
          message: `Thank you for participating in the token sale. If you have any questions, please don't hesitate to reach us at info@mybit.io.`,
        }
        break;
      case 'info':
        return {
          title: `#${period} - Processing your withdrawal`,
          message: 'This action can take several minutes. This message will update as soon as the transaction is processed.',
        }
        break;
      case 'error':
        return {
          title: `#${period} - Failed to withdraw`,
          message: 'Unfortunately your transaction failed.',
        }
        break;
    }
  }
  else if(actionType === 'contribute') {
    switch (type) {
      case 'success':
        return {
          title: `#${period} - Contributed with ${amount} ETH successfully!`,
          message: 'You will be able to claim your MYB tokens as soon as the current period is over.',
        }
        break;
      case 'info':
        return {
          title: `#${period} - Processing your contribution of ${amount} ETH`,
          message: 'This action can take several minutes. This message will update as soon as the transaction is processed.',
        }
        break;
      case 'error':
        return {
          title: `#${period} - Failed to contribute with ${amount} ETH`,
          message: 'Unfortunately your transaction failed.',
        }
        break;
    }
  } else if(actionType === 'metamaskContribute'){
    return {
      title: `#${period} - Contribution of ${amount} ETH`,
      message: 'Please confirm the transaction in Metamask.',
    }
  } else if(actionType === 'metamaskClaim'){
    return {
      title: `#${period} - Claiming`,
      message: 'Please confirm the transaction in Metamask.',
    }
  }
}

