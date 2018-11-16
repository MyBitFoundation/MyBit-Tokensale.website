/*
property 'closed' => just marks the phase as finished or not finished
    closed: light gray text, white Claim button / not closed: dark gray text, blue Contribute button=========================
property phaseActive marks the current phase and gives the row a background and colors the Contribute button in green
*/

export default [
{
    key: 1,
    period: 1,
    myb_distributed: 10000,
    total_eth: 150.75,
    deadline: "Jan 1, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: true,
    phaseActive: false
},
{
    key: 2,
    period: 2,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 2, 2019",
    price: 0.023,
    your_contribution: 0,
    myb_received: 2000,
    closed: true,
    phaseActive: false
},
{
    key: 3,
    period: 3,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 3, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: true,
    phaseActive: false
},
{
    key: 4,
    period: 4,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 4, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: false,
    phaseActive: true
},
{
    key: 5,
    period: 5,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 5, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: false,
    phaseActive: false
},
{
    key: 6,
    period: 6,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 6, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: false,
    phaseActive: false
},
{
    key: 7,
    period: 7,
    myb_distributed: 10000,
    total_eth: 8.75,
    deadline: "Jan 7, 2019",
    price: 0.023,
    your_contribution: 15,
    myb_received: 2000,
    closed: false,
    phaseActive: false
}
];
