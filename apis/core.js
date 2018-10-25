/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import * as TokenSale from '../components/constants/contracts/TokenSale';
import * as MyBitToken from '../components/constants/contracts/MyBitToken';

export const fetchPriceFromCoinmarketcap = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
      const jsonResponse = await response.json();
      const { price, percent_change_24h } = jsonResponse.data.quotes.USD;
      resolve({
        price,
        priceChangePercentage: percent_change_24h,
      });
    } catch (error) {
      reject(error);
    }
  });

export const loadMetamaskUserDetails = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.web3js.eth.getAccounts();
      const balance = await window.web3js.eth.getBalance(accounts[0]);
      const myBitTokenContract = new window.web3js.eth.Contract(
        MyBitToken.ABI,
        MyBitToken.ADDRESS,
      );
      const myBitBalance = await myBitTokenContract.methods
        .balanceOf(accounts[0])
        .call();

      const details = {
        userName: accounts[0],
        ethBalance: window.web3js.utils.fromWei(balance, 'ether'),
        myBitBalance: window.web3js.utils.fromWei(myBitBalance, 'ether'),
      };
      resolve(details);
    } catch (error) {
      reject(error);
    }
  });

// topic: 0x4dc83213fabf100be6b05af2cfc8d6bb893ebf89314fc647d8aa37e528c99245
export const fund = async (user, amount, day) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );
      const weiAmount = window.web3js.utils.toWei(amount.toString(), 'ether');

      const response = await tokenSaleContract.methods
        .fund(day)
        .send({
          value: weiAmount,
          from: user.userName,
        })
        .on('error', (error) => {
          resolve(false);
        })
        .then((receipt) => {
          resolve(receipt.status);
        });

    } catch (err) {
      resolve(false);
    }
  });

/*
* returns object where the days are keys and the values
* are the total of that day in ETH and an object with
* the individual contributions for that day, where
* address of contributors are keys and value is the total
* contributed on that day
*/

export const getAllContributionsPerDay = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new window.web3js.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      let logContributions = await tokenSaleContract.getPastEvents(
        'LogTokensPurchased',
        { fromBlock: 0, toBlock: 'latest' },
      );

      let contributionsToReturn = {};
      for (const contribution of logContributions) {
        const contributor = contribution.returnValues._contributor;
        const contributed = Number(window.web3js.utils.fromWei(contribution.returnValues._amount.toString(), 'ether'))
        const day = contribution.returnValues._day;
        const weiPerToken = contribution.returnValues.weiPerToken;
        const weiContributed = contribution.returnValues.weiContributed;

        console.log(weiContributed)
        console.log(contributed)

        let dayContributions = contributionsToReturn[day];
        // check if day has been initialized
        if (dayContributions) {
          dayContributions.total = dayContributions.total + contributed;
          let contributionsByUser = dayContributions.all[contributor];

          // check if this users' object has been initialized
          if (contributionsByUser) {
            contributionsByUser.total = contributionsByUser.total + contributed;
          } else {
            const owned = await getUnclaimedAmountOnDay(contributor, day);
            dayContributions.all[contributor] = {
              total: contributed,
              owned: owned,
            };
          }
        } else {
          const owned = await getUnclaimedAmountOnDay(contributor, day);
          contributionsToReturn[day] = {
            total: contributed,
            all: {
              [contributor]: {
                total: contributed,
                owned,
              }
            }
          };
        };
      }

      // TODO remove
      console.log("contributions by day: ", contributionsToReturn);

      resolve(contributionsToReturn);
    } catch (err) {
      console.log(err)
      resolve(false);
    }
  });

  const getUnclaimedAmountOnDay = async (contributor, day) =>
    new Promise(async (resolve, reject) => {
      try {
        const tokenSaleContract = new window.web3js.eth.Contract(
          TokenSale.ABI,
          TokenSale.ADDRESS,
        );

        const amount = await tokenSaleContract.methods
        .getUnclaimedAmount(contributor, day)
        .call();

        console.log("amount", amount)
        resolve(amount);
      } catch (err) {
        console.log(err)
        resolve(false);
      }
    });

