import OpenAI from 'openai'
import Express from 'express'

const app = Express()
const openai = new OpenAI()

app.use(Express.json())

app.post('/api/feedback', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant giving feedback on tech CV/resume. Give your response in this format: grammar, formatting, content, overall impression, and areas of improvement. Keep the responses short and concise. Keep each response to a maximum of 200 characters.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: req.body.message,
            },
            {
              type: 'image_url',
              image_url: {
                url: req.body.imageUrl,
              },
            },
          ],
        },
      ],
      model: 'gpt-4-turbo',
    })

    res.json({ feedback: completion.choices[0].message.content })
  } catch (error) {
    console.error('Error generating feedback:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
