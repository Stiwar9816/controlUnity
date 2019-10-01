 import * as axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/`
}

export default axios.create(options)