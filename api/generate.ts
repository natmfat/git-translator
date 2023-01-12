import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import buildBasePrompt from "../buildBasePrompt";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: `${process.env.OPENAI_API_KEY}`,
    })
);

const basePrompt = buildBasePrompt();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userInput = (req.body?.userInput || req.query?.userInput)?.trim();
    if (!userInput) {
        res.status(200).json({
            output: "No command supplied.",
        });

        return;
    }

    try {
        const prompt = `${basePrompt}\nEnglish: ${userInput}\nOutput: `;
        const completions = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.7,
            max_tokens: 250,
        });

        res.status(200).json({
            output: completions.data.choices.pop(),
        });
    } catch (e) {
        res.status(200).json({
            output: {
                text: "OpenAI key invalid.",
            },
        });
    }
};

export default handler;
