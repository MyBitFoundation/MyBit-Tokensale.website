const sectionIssues = [{
  question: `My transactions for contributing and withdrawing are not going through, even if I increase the gas and try again. What should I do?`,
  answer: (
    <div className="HelpSection-issuesContributing">
      <p>Most likely this is caused by having pending transactions in MetaMask. If you have transactions that have not yet gone through, they will
    prevent any new transactions from being processed.</p><br />

    <p>To fix this:</p>
    <p>1. Try the cancel transaction feature in MetaMask. Then wait a few minutes.</p>
    <p>2. If that does not work, then try increasing the gas of the transaction and wait ~10 minutes to see if the network picks up.</p>
    <p>3. If none of the above are working or you do not see any pending transactions, then your best bet is to remove MetaMask and re-install it.
    This is the best method to ensure all pending transactions are removed.</p>
  </div>
  ),
}];

export const FAQ = [{
  title: 'Issues with contributing?',
  content: sectionIssues,
}];
