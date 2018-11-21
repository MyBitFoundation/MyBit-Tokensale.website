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

async function getAllContributionsPerDay(web3, currentDay){
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

      let contributions = processContributions(web3, logContributions, currentDay);
      contributions = createDataForInactiveDays(contributions, currentDay);

      resolve(contributions);
    } catch (err) {
      console.log(err)
      resolve(false);
    }
  })
}

async function createDataForInactiveDays(contributions, currentDay){
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

function processContributions(web3, log, currentDay){
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
          const date = dayjs(new Date())
            .add(day - currentDay + 1, 'day').format('MMM, DD YYYY')

          contributions[day] = {
            key: day,
            period: day + 1,
            total_eth: contributed,
            myb_received: 0,
            your_contribution: 0,
            closed: day + 1 < currentDay,
            phaseActive: day + 1 === currentDay,
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
