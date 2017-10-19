const EtherToken = artifacts.require('EtherToken')
const HumanFriendlyToken = artifacts.require('HumanFriendlyToken')

contract('HumanFriendlyToken', function (accounts) {
    let etherToken

    before(async () => {
        etherToken = await EtherToken.deployed()
    })

    it('can be used to get ether token metadata', async () => {
        const humanFriendlyToken = await HumanFriendlyToken.at(etherToken.address)
        assert.equal('Ether Token', await humanFriendlyToken.name())
        assert.equal('ETH', await humanFriendlyToken.symbol())
        assert.equal(18, await humanFriendlyToken.decimals())
    })
})
