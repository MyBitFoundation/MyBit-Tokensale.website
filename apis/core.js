/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import * as TokenSale from '../components/constants/contracts/TokenSale';
import * as MyBitToken from '../components/constants/contracts/MyBitToken';
import dayjs from 'dayjs';
import Web3 from 'web3';
const abiDecoder = require('abi-decoder');
import { tokenSaleEvents, tokensPerDay } from '../components/constants';
import { events } from '../utils/EventEmitter';

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://enormously-singular-mustang.quiknode.io/f8ae3871-b3fb-4e7d-ba45-b6c9d220757f/snN_gx_F-oK6Ij27ihhzRw==/'));
let subscriptionClaim = undefined;
let subscriptionFund = undefined;

export const fetchContributionsServer = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/contributions`);
      const jsonResponse = await response.json();
      const { timestampStartTokenSale, contributions, currentDay } = jsonResponse;
      resolve({
        timestampStartTokenSale,
        contributions,
        currentDay,
      });
    } catch (error) {
      reject(error);
    }
  });

export const fetchPriceFromCoinmarketcap = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
      const jsonResponse = await response.json();
      const { price } = jsonResponse.data.quotes.USD;
      resolve(price);
    } catch (error) {
      reject(error);
    }
  });

export const loadMetamaskUserDetails = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.web3js.eth.getAccounts();
      const balance = await window.web3js.eth.getBalance(accounts[0]);

      const details = {
        userName: accounts[0],
        ethBalance: window.web3js.utils.fromWei(balance, 'ether'),
      };

      resolve(details);
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });

// topic: 0x4dc83213fabf100be6b05af2cfc8d6bb893ebf89314fc647d8aa37e528c99245
export const fund = async (user, amount, day, updateNotification) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const weiAmount = window.web3js.utils.toWei(amount.toString(), 'ether');

      const response = await tokenSaleContract.methods
        .fund(day - 1)
        .send({
          value: weiAmount,
          from: user.userName,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(transactionHash, {
            amount,
            period: day,
            status: 0,
            actionType: 'contribute',
          });
        })
        .on('error', (error) => {
          resolve(false);
        })
        .then((receipt) => {
          if(receipt.status){
            updateNotification(receipt.transactionHash, undefined, 1);
          } else {
            updateNotification(receipt.transactionHash, undefined, -1);
          }
          resolve(receipt.status);
        });

    } catch (err) {
      console.log(err)
      resolve(false);
    }
  });

export const batchWithdrawal = async (user, days, updateNotification) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const response = await tokenSaleContract.methods
        .batchWithdraw(days)
        .send({
          from: user.userName,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(transactionHash, {
            period: days[0],
            status: 0,
            actionType: 'claim',
          });
        })
        .on('error', (error) => {
          resolve(false);
        })
        .then((receipt) => {
          console.log(receipt)
          if(receipt.status){
            const amountReceivedInWei = receipt.events['LogTokensCollected'].returnValues._amount;
            const amountReceived = window.web3js.utils.fromWei(amountReceivedInWei, 'ether');
            updateNotification(receipt.transactionHash, undefined, 1, amountReceived);
          } else {
            updateNotification(receipt.transactionHash, undefined, -1);
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
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      const response = await tokenSaleContract.methods
        .withdraw(day - 1)
        .send({
          from: user.userName,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(transactionHash, {
            period: day,
            status: 0,
            actionType: 'claim',
          });
        })
        .on('error', (error) => {
          resolve(false);
        })
        .then((receipt) => {
          if(receipt.status){
            const amountReceivedInWei = receipt.events['LogTokensCollected'].returnValues._amount;
            const amountReceived = window.web3js.utils.fromWei(amountReceivedInWei, 'ether');
            updateNotification(receipt.transactionHash, undefined, 1, amountReceived);
          } else {
            updateNotification(receipt.transactionHash, undefined, -1);
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
      console.log(err)
      resolve(false);
    }
  });


export const getAllContributionsPerDay = async (userAddress, currentDay) =>
  new Promise(async (resolve, reject) => {
    if(subscriptionFund){
      console.log("clearing events")
      await clearEvents();
    }
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      let logContributions = await tokenSaleContract.getPastEvents(
        'LogTokensPurchased',
        { fromBlock: 0, toBlock: 'latest' },
      );

      let logWithdrawals = await tokenSaleContract.getPastEvents(
        'LogTokensCollected',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const withdrawalsByDay = processWithdrawals(logWithdrawals);
      let contributions = processContributions(logContributions, withdrawalsByDay, userAddress, currentDay);
      //const result = await processOwedAmounts(contributions, currentDay, userAddress);
      //contributions = result.contributions;
      contributions = createDataForInactiveDays(contributions, currentDay, withdrawalsByDay, userAddress);
      const result = calculateOwedAmounts(contributions, currentDay);
      console.log("pulled from web3...")
      subscribeToEvents();

      resolve({
        contributions: result.contributions,
        daysOwed: result.daysOwed,
        totalOwed: result.totalOwed,
      });
    } catch (err) {
      console.log(err)
      resolve(false);
    }
  });

  export const calculateOwedAmounts = (contributions, currentDay) => {
    let totalOwed = 0;
    const daysOwed = [];

    contributions = contributions.map((contribution, index) => {
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
        closed: index + 1 < currentDay,
        phaseActive: index + 1 === currentDay,
      }
    })
    return {
      contributions,
      totalOwed,
      daysOwed,
    }
  }

  const createDataForInactiveDays = (contributions, currentDay) => {
    contributions = contributions.map((contribution, index) => {
      if(contribution) {
        return contribution;
      }

      const date = dayjs(new Date()).add(index - currentDay + 1, 'day').format('MMM, DD YYYY')

      return {
        key: index,
        period: index + 1,
        total_eth: 0,
        myb_received: 0,
        your_contribution: 0,
        closed: index + 1 < currentDay,
        phaseActive: index + 1 === currentDay,
        owed: 0,
        date,
      };
    })

    return contributions;
  }

  const processOwedAmounts = async (contributions, currentDay, userAddress) =>
    new Promise(async (resolve, reject) => {
      let totalOwed = 0;
      const daysOwed = [];

      contributions = await Promise.all(contributions.map(async (dayInfo) => {
        if(dayInfo && dayInfo.your_contribution > 0){
          let owed = undefined;
          do{
            try{
              owed = await getUnclaimedAmountOnDay(userAddress, dayInfo.key);
            }catch(err){
              console.log(err);
            }
          }while(owed === 'undefined');
          dayInfo.owed = owed;
          if(dayInfo.key < currentDay - 1) {
            if(owed > 0) {
              daysOwed.push(dayInfo.key);
            }
            totalOwed += owed;
          }
          return dayInfo;
        }
        return dayInfo;
      }))

      resolve({
        contributions,
        totalOwed,
        daysOwed,
      });
   });


  const processContributions = (log, withdrawalsByDay, userAddress, currentDay) => {
    const contributions = Array(365).fill();
    for (const contribution of log) {
      const contributor = contribution.returnValues._contributor;
      const contributed = Number(window.web3js.utils.fromWei(contribution.returnValues._amount.toString(), 'ether'))
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
            const date = dayjs(new Date())
              .add(day - currentDay + 1, 'day').format('MMM, DD YYYY')

            contributions[day] = {
              key: day,
              period: day + 1,
              total_eth: contributed,
              myb_received: withdrawal ? withdrawal : 0,
              your_contribution: isUserContribution ? contributed : 0,
              closed: day + 1 < currentDay,
              phaseActive: day + 1 === currentDay,
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

      if(withdrawalsByDay[day]){
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
        console.log(err)
        resolve(false);
      }
    });

  const clearEvents = () => {
    return Promise.all([
      subscriptionFund.unsubscribe(), subscriptionClaim.unsubscribe()
    ]);
  }

  const subscribeToEvents = () => {
    console.log("subscribing to events")
    abiDecoder.addABI(TokenSale.ABI);

    subscriptionFund = web3.eth.subscribe('logs', {
      address: '0xf4f2da8d23bf5d412d172e25b3a6f16619c371e2',
      topics: [tokenSaleEvents.fund],
    }, (error, result) => {
      if(error) console.log(error);
    }).on('data', async (trxData) => {
      const receipt = await web3.eth.getTransactionReceipt(trxData.transactionHash);
      const decodeData = abiDecoder.decodeLogs(receipt.logs);
      const details = {
        amount: Number(web3.utils.fromWei(decodeData[0].events[1].value, 'ether')),
        day: decodeData[0].events[2].value.c[0],
        contributor: decodeData[0].events[0].value,
        transactionHash: trxData.transactionHash,
      };
      events.emit('fund', details);
    })

    subscriptionClaim = web3.eth.subscribe('logs', {
      address: '0xf4f2da8d23bf5d412d172e25b3a6f16619c371e2',
      topics: [tokenSaleEvents.claim],
    }, (error, result) => {
      if(error) console.log(error);
    }).on('data', async (trxData) => {
      const receipt = await web3.eth.getTransactionReceipt(trxData.transactionHash);
      console.log(receipt)
      const decodeData = abiDecoder.decodeLogs(receipt.logs);
      console.log(decodeData);
      const details = {
        amount: Number(web3.utils.fromWei(decodeData[0].events[1].value, 'ether')),
        day: decodeData[0].events[2].value.c[0],
        contributor: decodeData[0].events[0].value,
        transactionHash: trxData.transactionHash,
      };
      events.emit('claim', details);
    })
  }
