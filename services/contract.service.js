import { contracts, tokens } from '../constants'

const getContract = async (address, abi) => {
  const contract = new window.web3.eth.Contract(abi, address)

  return contract
}

export const getDripMarketplaceContract = async (chainId) => {
  const contract = await getContract(
    contracts.DRIP_MARTKETPLACE.address[chainId],
    contracts.DRIP_MARTKETPLACE.abi
  )

  return contract
}

export const getTokenContract = async (crypto) => {
  const contract = await getContract(tokens[crypto].address, tokens[crypto].abi)

  return contract
}
