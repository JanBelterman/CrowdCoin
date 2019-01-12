/* Get web3 instance with working provider */
import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider)
} else {
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/bc0b9e5d56d541ac85748fa7c00e1063'
    )
    web3 = new Web3(provider)
}

export default web3