const bitcoinRPCConf = require('./bitcoinRPCConf')
const Client = require('bitcoin-core')
const client = new Client(bitcoinRPCConf)

let BTC2Sats = (inBTC) => { 
	let dotIdx =  inBTC.search(/\./)
	if(dotIdx<0){return (inBTC+'0'.repeat(8))}
	let addNZeroes = 8 - (inBTC.length - dotIdx-1)
	let inSats = (inBTC+'0'.repeat(addNZeroes)).replace(/\./, '')
	return inSats
}

let sats2BTC = (inSats) =>  {
	if(inSats.length<9){
		inSats = '0'.repeat(8-inSats.length+1)+inSats}
	let inSatsArr = [...inSats]
	inSatsArr.splice(-8, 0, '.')
	return(inSatsArr.join('').replace(/\.?0+$/,''))
}


module.exports = {
  client: client,
  BTC2Sats: BTC2Sats, 
  sats2BTC: sats2BTC
}
