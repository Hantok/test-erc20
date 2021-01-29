// a different comment!
const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const { deployRelayHub } = require('@openzeppelin/gsn-helpers');

before('deploy GSN RelayHub', async function () {
  const [defaultSender] = await web3.eth.getAccounts();
  await deployRelayHub(web3, { from: defaultSender });
});
