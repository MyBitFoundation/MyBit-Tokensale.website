const TokenSale = require('./components/constants/contracts/TokenSale');
const MyBitToken = require('./components/constants/contracts/MyBitToken');
const dayjs = require('dayjs');

async function getStartTimestamp(web3){
  return new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new web3.eth.Contract(
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
}

async function getAllContributionsPerDay(web3, currentDay, timestampStartTokenSale){
  return new Promise(async (resolve, reject) => {
    try {
      const tokenSaleContract = new web3.eth.Contract(
        TokenSale.ABI,
        TokenSale.ADDRESS,
      );

      let logContributions = await tokenSaleContract.getPastEvents(
        'LogTokensPurchased',
        { fromBlock: 0, toBlock: 'latest' },
      );

      let contributions = processContributions(web3, logContributions, currentDay, timestampStartTokenSale);
      contributions = createDataForInactiveDays(contributions, currentDay, timestampStartTokenSale);

      resolve(contributions);
    } catch (err) {
      console.log(err)
      resolve(false);
    }
  })
}

async function createDataForInactiveDays(contributions, currentDay, timestampStartTokenSale){
  contributions = contributions.map((contribution, index) => {
    if(contribution) {
      return contribution;
    }

    getDateForPeriod(index, timestampStartTokenSale)

    const date = getDateForPeriod(index, timestampStartTokenSale);

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

function getDateForPeriod(day, timestampStartTokenSale){
  return(dayjs(timestampStartTokenSale).add(day + 1, 'day').format('MMM, DD YYYY'))
}

function processContributions(web3, log, currentDay, timestampStartTokenSale){
  const contributions = Array(365).fill();
  for (const contribution of log) {
    const contributor = contribution.returnValues._contributor;
    const contributed = Number(web3.utils.fromWei(contribution.returnValues._amount.toString(), 'ether'))
    const day = Number(contribution.returnValues._day);
    if(day >= 0 && day < 365){
      // check if day has been initialized
      if (contributions[day]) {
        const thisDay = contributions[day];
        thisDay.total_eth = thisDay.total_eth + contributed;
        thisDay.owned = 0;
        thisDay.your_contribution = 0;
        thisDay.myb_received = 0;
      } else {
          const date = getDateForPeriod(day, timestampStartTokenSale);

          contributions[day] = {
            key: day,
            period: day + 1,
            total_eth: contributed,
            myb_received: 0,
            your_contribution: 0,
            closed: currentDay ? day + 1 < currentDay : false,
            phaseActive: currentDay ? day + 1 === currentDay : false,
            date,
            owed: 0,
          };
        };
    }
  }
  return contributions;
}


module.exports = {
  getStartTimestamp: getStartTimestamp,
  getAllContributionsPerDay: getAllContributionsPerDay,
};
