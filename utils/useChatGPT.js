const { Configuration, OpenAIApi } = require('openai')
const config = require('config')

const configuration = new Configuration({
    apiKey: config.get('openaiKey'),
});
const openai = new OpenAIApi(configuration);

const useChatGPT = async () => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
    console.log(completion)
}

module.exports = {
    useChatGPT,
}