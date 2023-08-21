import { create } from 'kubo-rpc-client'

const ipfs = create({ 
  // url: 'http://localhost:5001/api/v0'
  host: 'localhost',
  port: 5001,
  protocol: 'http',
  // headers: {
  //   authorization: 'Bearer ' + 'CAESIJ1Q8kw1sRF3olfQ3za68ymo5sTmxN3V5bjNJo7PuL8B'
  // }

})

export default ipfs
