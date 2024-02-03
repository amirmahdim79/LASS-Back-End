const { google } = require('googleapis')

const apiKey = 'AIzaSyDZSjsjBfVvt00bw7M5zhMmCLRKWfKA9-k'

const auth = new google.auth.GoogleAuth({
    credentials: apiKey,
    scopes: ['https://www.googleapis.com/auth/documents']
})

const docs = google.docs({ version: 'v1', auth })

const LIST_DOCS = async () => {
    const res = await docs.documents.get()

    console.log(res)
}

module.exports = {
    LIST_DOCS,
}