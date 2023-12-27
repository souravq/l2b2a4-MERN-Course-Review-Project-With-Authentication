import app from './app'
import { configData } from './config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(configData.database_url as string)
    app.listen(configData.port, () => {
      console.log('Server is listening on PORT ' + configData.port)
    })
  } catch (err) {
    console.log(err)
  }
}
main()
