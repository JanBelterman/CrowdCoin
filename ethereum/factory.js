/* export factory instance */

import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7d61c41b8721429D3dCCE90243b4026940Dac428'
)

export default instance