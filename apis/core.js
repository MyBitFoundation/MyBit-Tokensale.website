/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import * as TokenSale from '../components/constants/contracts/TokenSale';
import * as MyBitToken from '../components/constants/contracts/MyBitToken';
import dayjs from 'dayjs';
import Web3 from 'web3';
const abiDecoder = require('abi-decoder');
import {
  tokenSaleEvents,
  tokensPerDay,
  debug,
  MyBitTokenSaleAPIEndpoint,
  BLOCK_NUMBER_CONTRACT_CREATION,
} from '../components/constants';
import { events } from '../utils/EventEmitter';

let web3Socket = new Web3();
let subscriptionClaim = undefined;
let subscriptionFund = undefined;
const gasPrice = 5000000000;

const transactionHashClaim = new Set();

const fetchGasPriceFromServer = async () => {
  try {
    const response = await fetch(`${MyBitTokenSaleAPIEndpoint}/gasprice`);
    const jsonResponse = await response.json();
    const gasPriceServer = jsonResponse.gasPrice;
    if(gasPriceServer && gasPriceServer > 0){
      gasPrice = (gasPriceServer * 1000000000).toFixed(0);
    }
    setTimeout(() => fetchGasPriceFromServer(), 60000);
  } catch (error) {
    debug(error);
  }
}

export const loadMetamaskUserDetails = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.web3js.eth.getAccounts();
      const balance = await window.web3js.eth.getBalance(accounts[0]);

      const details = {
        userName: accounts[0],
        ethBalance: window.web3js.utils.fromWei(balance, 'ether'),
      };

      debug("Account details: ", details)

      resolve(details);
    } catch (error) {
      debug(error)
      reject(error);
    }
  });

export const fund = async (user, amount, day, updateNotification) =>
  new Promise(async (resolve, reject) => {
    try {
      const id = Date.now();
      updateNotification(id, {
        amount,
        period: day,
        status: 0,
        actionType: 'metamaskContribute',
      });

      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      debug(`Amount to contribute: ${amount}`);

      const weiAmount = window.web3js.utils.toWei(amount.toString(), 'ether');

      const estimatedGas = await tokenSaleContract.methods
        .fund(day - 1)
        .estimateGas({
          value: weiAmount,
          from: user.userName,
        });

      debug(`Amount gas: ${estimatedGas}`);
      debug(`Amount gas price: ${gasPrice}`);

      const response = await tokenSaleContract.methods
        .fund(day - 1)
        .send({
          value: weiAmount,
          from: user.userName,
          gas: estimatedGas,
          gasPrice: gasPrice,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(id, {
            amount,
            period: day,
            status: 0,
            actionType: 'contribute',
            transactionHash,
          });
        })
        .on('error', (error) => {
          updateNotification(id, undefined, -1);
          resolve(false);
        })
        .then((receipt) => {
          debug(receipt)
          if(receipt.status){
            updateNotification(id, undefined, 1);
          } else {
            updateNotification(id, undefined, -1);
          }
          resolve(receipt.status);
        });

    } catch (err) {
      debug(err)
      resolve(false);
    }
  });

export const batchWithdrawal = async (user, days, updateNotification) =>
  new Promise(async (resolve, reject) => {
    try {
      const id = Date.now();
      updateNotification(id, {
        period: days.length > 1 ? `${days[0] + 1} to #${days[days.length -1] + 1}` : days[0] + 1,
        status: 0,
        actionType: 'metamaskClaim',
        amount: 0,
      });

      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const estimatedGas = await tokenSaleContract.methods
        .batchWithdraw(days)
        .estimateGas({
          from: user.userName,
        });

      const response = await tokenSaleContract.methods
        .batchWithdraw(days)
        .send({
          from: user.userName,
          gas: estimatedGas,
          gasPrice: gasPrice,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(id, {
            period: days.length > 1 ? `${days[0] + 1} to #${days[days.length -1] + 1}` : days[0] + 1,
            status: 0,
            actionType: 'claim',
            transactionHash,
            amount: 0,
          });
        })
        .on('error', (error) => {
          updateNotification(id, undefined, -1);
          reject();
        })
        .then((receipt) => {
          if(receipt.status){
            debug(receipt)
            const amountReceivedInWei = receipt.events['LogTokensCollected'].returnValues._amount;
            const amountReceived = window.web3js.utils.fromWei(amountReceivedInWei, 'ether');
            updateNotification(id, undefined, 1, amountReceived);
          } else {
            updateNotification(id, undefined, -1);
          }
          resolve(receipt.status);
        });

    } catch (err) {
      resolve(false);
    }
  });

export const withdraw = async (user, day, updateNotification) =>
  new Promise(async (resolve, reject) => {
    try {
      const id = Date.now();
      updateNotification(id, {
        period: day,
        status: 0,
        actionType: 'metamaskClaim',
        amount: 0,
      });
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const estimatedGas = await tokenSaleContract.methods
        .withdraw(day - 1)
        .estimateGas({
          from: user.userName,
        });

      const response = await tokenSaleContract.methods
        .withdraw(day - 1)
        .send({
          from: user.userName,
          gas: estimatedGas,
          gasPrice: gasPrice,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(id, {
            period: day,
            status: 0,
            actionType: 'claim',
            transactionHash,
            amount: 0,
          });
        })
        .on('error', (error) => {
          updateNotification(id, undefined, -1);
          resolve(false);
        })
        .then((receipt) => {
          debug(receipt)
          if(receipt.status){
            const amountReceivedInWei = receipt.events['LogTokensCollected'].returnValues._amount;
            const amountReceived = window.web3js.utils.fromWei(amountReceivedInWei, 'ether');
            updateNotification(id, undefined, 1, amountReceived);
          } else {
            updateNotification(id, undefined, -1);
          }
          resolve(receipt.status);
        });

    } catch (err) {
      resolve(false);
    }
  });

export const getStartTimestamp = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const start = await tokenSaleContract.methods
        .start()
        .call();

      resolve(Number(start));
    } catch (err) {
      debug(err)
      resolve(false);
    }
  });


function getDateForPeriod(day, timestampStartTokenSale){
  return(dayjs(timestampStartTokenSale).add(day + 1, 'day').format('MMM, DD YYYY'))
}

function cleanNumbersOfContributions(contributions){
  return contributions.map(contribution => {
    return {
      ...contribution,
      your_contribution: Number(window.web3js.utils.fromWei(contribution.your_contribution.toString(), 'ether')),
      total_eth: Number(window.web3js.utils.fromWei(contribution.total_eth.toString(), 'ether')),
    };
  });
}

export const getAllContributionsPerDay = async (userAddress, currentDay, timestampStartTokenSale) =>
  new Promise(async (resolve, reject) => {
    try {
      debug("fetching all contributions with web3")
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      let logContributions = await tokenSaleContract.getPastEvents(
        'LogTokensPurchased',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      let logWithdrawals = await tokenSaleContract.getPastEvents(
        'LogTokensCollected',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      const withdrawalsByDay = processWithdrawals(logWithdrawals);
      let contributions = processContributions(logContributions, withdrawalsByDay, userAddress, currentDay, timestampStartTokenSale);
      contributions = createDataForInactiveDays(contributions, currentDay, timestampStartTokenSale);
      contributions = cleanNumbersOfContributions(contributions);
      const result = calculateOwedAmounts(contributions, currentDay);
      debug("pulled from web3...")
      subscribeToEvents();

      resolve({
        ...result,
      });
    } catch (err) {
      debug(err)
      resolve(false);
    }
  });

  export const calculateOwedAmounts = (contributions, currentDay) => {
    let totalOwed = 0;
    const daysOwed = [];
    let currentPeriodTotal = 0;

    contributions = contributions.map((contribution, index) => {
      if(contribution.key === currentDay - 1){
        currentPeriodTotal += contribution.total_eth;
      }

      if(contribution.your_contribution === 0){
        return contribution;
      }

      const contributed = contribution.your_contribution;
      const totalContributed = contribution.total_eth;
      const owed = (contributed / totalContributed) * tokensPerDay;

      if(contribution.myb_received === 0 && contribution.key < currentDay - 1 && owed > 0) {
        if(owed > 0) {
          daysOwed.push(contribution.key);
        }
        totalOwed += owed;
      }

      // also setting closed and phaseActive here because
      // this method is called once a period is over and the
      // current day changes
      return {
        ...contribution,
        owed: owed > 0 ? owed : 0,
        closed: currentDay ? index + 1 < currentDay : false,
        phaseActive: currentDay ? index + 1 === currentDay : false,
      }
    })

    return {
      contributions,
      totalOwed,
      daysOwed,
      currentPeriodTotal,
    }
  }

const createDataForInactiveDays = (contributions, currentDay, timestampStartTokenSale) => {
  contributions = contributions.map((contribution, index) => {
    if(contribution) {
      return contribution;
    }

    const date = getDateForPeriod(index, timestampStartTokenSale)

    return {
      key: index,
      period: index + 1,
      total_eth: 0,
      myb_received: 0,
      your_contribution: 0,
      closed: currentDay ? index + 1 < currentDay : false,
      phaseActive: currentDay ? index + 1 === currentDay : false,
      owed: 0,
      date,
    };
  })

  return contributions;
}

const processContributions = (log, withdrawalsByDay, userAddress, currentDay, timestampStartTokenSale) => {
  const contributions = Array(365).fill();
  for (const contribution of log) {
    const contributor = contribution.returnValues._contributor;
    const contributed = Number(contribution.returnValues._amount);
    const day = Number(contribution.returnValues._day);
    const isUserContribution = contributor === userAddress;
    let withdrawal = 0;
    if(withdrawalsByDay[day] && withdrawalsByDay[day][userAddress]){
      withdrawal = withdrawalsByDay[day][userAddress];
    }

    if(day >= 0 && day < 365){
      // check if day has been initialized
      if (contributions[day]) {
        const thisDay = contributions[day];
        thisDay.total_eth = thisDay.total_eth + contributed;
        thisDay.owed = 0;
        thisDay.your_contribution = isUserContribution
          ? thisDay.your_contribution + contributed
          : thisDay.your_contribution;
        thisDay.myb_received = withdrawal ? withdrawal : 0;
      } else {
          const date = getDateForPeriod(day, timestampStartTokenSale)

          contributions[day] = {
            key: day,
            period: day + 1,
            total_eth: contributed,
            myb_received: withdrawal ? withdrawal : 0,
            your_contribution: isUserContribution ? contributed : 0,
            closed: currentDay ? day + 1 < currentDay : false,
            phaseActive: currentDay ? day + 1 === currentDay : false,
            date,
            owed: 0,
          };
        }
    }
  }

  return contributions;
}

const processWithdrawals = (log) => {
  const withdrawalsByDay = {};
  log.forEach((withdrawal) => {
    const day = withdrawal.returnValues._day;
    const amount = withdrawal.returnValues._amount;
    const contributor = withdrawal.returnValues._contributor;
    const amountNumber = Number(window.web3js.utils.fromWei(amount, 'ether'));
    if(amount === '0') return;

    if(withdrawalsByDay[day] && !withdrawalsByDay[day][contributor]){
      withdrawalsByDay[day][contributor] = amountNumber;
    } else {
      withdrawalsByDay[day] = {
        [contributor]: amountNumber,
      };
    }
  })

  return withdrawalsByDay;
}

const getUnclaimedAmountOnDay = async (contributor, day) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const amount = await tokenSaleContract.methods
      .getTokensOwed(contributor, day)
      .call();

      resolve(Number(window.web3js.utils.fromWei(amount, 'ether')));
    } catch (err) {
      debug(err)
      resolve(false);
    }
  });

const clearEvents = () => {
  if(!subscriptionFund){
    return;
  }
  return Promise.all([
    subscriptionFund.unsubscribe(), subscriptionClaim.unsubscribe()
  ]);
}

const resetSocket = async () => {
  debug("reseting socket")
  try{
    await clearEvents()

    subscriptionClaim = undefined;
    subscriptionFund = undefined;

    debug("reset socket")
  }catch(err){
    debug(err);
  }
}

let errorCounter = 0;

const subscribeToEvents = async () => {
  const provider = new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_PROVIDER_MAINNET);
  provider.on('error', e => {
    debug("socket connection error ")
    debug(e)
    provider.connection.close()
    subscribeToEvents();
  });
  provider.on('end', e => {
    debug("socket connection closed")
    provider.connection.close()
    subscribeToEvents();
  });

  provider.on('connect', () => {
    web3Socket.setProvider(provider)

    debug("subscribing to events")
    abiDecoder.addABI(TokenSale.ABI);

    subscriptionFund = web3Socket.eth.subscribe('logs', {
      address: TokenSale.ADDRESS,
      topics: [tokenSaleEvents.fund],
    })
    .on('data', async (trxData) => {
      debug(`transaction hash of funding event: ${trxData.transactionHash}`)
      const receipt = await web3Socket.eth.getTransactionReceipt(trxData.transactionHash);
      debug(`receipt: ${receipt}`)
      const decodeData = abiDecoder.decodeLogs(receipt.logs);
      debug(decodeData)
      const day = decodeData[0].events[2].value;
      const details = {
        amount: Number(window.web3js.utils.fromWei(decodeData[0].events[1].value, 'ether')),
        day: +day,
        contributor: decodeData[0].events[0].value,
        transactionHash: trxData.transactionHash,
      };
      events.emit('fund', details);
    })

    subscriptionClaim = web3Socket.eth.subscribe('logs', {
      address: TokenSale.ADDRESS,
      topics: [tokenSaleEvents.claim],
    })
    .on('data', async (trxData) => {
      const txHash = trxData.transactionHash;
      debug(txHash)
      if(!transactionHashClaim.has(txHash)){
        transactionHashClaim.add(txHash)
      } else {
        return;
      }
      const receipt = await web3Socket.eth.getTransactionReceipt(txHash);
      const decodeData = abiDecoder.decodeLogs(receipt.logs);
      debug(decodeData)
      const indexOfEvent = decodeData[0] ? 0 : 1;
      const actualEvents = indexOfEvent === 0 ? decodeData.slice(0, decodeData.length - 1) : decodeData.slice(1, decodeData.length);
      debug(indexOfEvent)
      debug(actualEvents)
      for(let i = 0; i < actualEvents.length; i++){
        const day = actualEvents[i].events[2].value;
        const details = {
          amount: Number(window.web3js.utils.fromWei(actualEvents[i].events[1].value, 'ether')),
          day: +day,
          contributor: actualEvents[i].events[0].value,
          transactionHash: txHash,
        };
        debug(details)
        events.emit('claim', details);
      }

      debug(decodeData)
    })

    debug("subscribed to events")
  })
}


/*
this service is giving us a recaptcha, hardcoding the gas price
until we find a different alternative
if(typeof window !== 'undefined'){
  fetchGasPriceFromServer();
}*/
