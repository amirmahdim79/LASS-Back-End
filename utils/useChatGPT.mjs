import { OpenAIApi, Configuration } from 'openai';
import config from 'config'

const configuration = new Configuration({
    apiKey: config.get('openaiKey'),
    organization: 'org-0XLogrmUmG8jtwe9leU5UpUy'
});

const openai = new OpenAIApi(configuration);

export const useChatGPT = async (prompt) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
        });
        return JSON.parse(completion.data.choices[0].message.content) 
    } catch (err) {
        console.log(err)
    }
}