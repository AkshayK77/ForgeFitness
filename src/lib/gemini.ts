const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

export async function callGemini(prompt: string): Promise<Record<string, unknown>> {
  const jsonOnlySuffix = 'Return only valid JSON. No markdown, no backticks, no explanation, no text before or after the JSON object.'
  const finalPrompt = `${prompt.trim()}

${jsonOnlySuffix}`

  const payload = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: finalPrompt }],
    temperature: 0.7,
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  }

  console.log('Groq payload:', JSON.stringify(payload, null, 2))

  let responseText
  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    responseText = await response.text()
    console.log('Groq raw response status:', response.status)
    console.log('Groq raw response body:', responseText)

    if (!response.ok) {
      throw new Error(`Groq error ${response.status}: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    const text = data?.choices?.[0]?.message?.content
    if (!text) throw new Error('Groq returned no content')

    const cleaned = text
      .trim()
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim()

    try {
      return JSON.parse(cleaned)
    } catch (parseErr) {
      console.error('Groq returned non-JSON:', text)
      throw new Error('AI response was not valid JSON. Check the console for the raw response.')
    }
  } catch (err) {
    console.error('Full Groq error:', (err as Error).message)
    throw err
  }
}
