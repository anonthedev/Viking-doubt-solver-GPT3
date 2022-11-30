import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePromptSuffix = "provide me with sources for the answers remove any urls in the source";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${req.body.promptInput}${basePromptSuffix}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${req.body.promptInput}${basePromptSuffix}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;