function replacePrompt(prompt: string) {
  return (variables: Record<string, string | number>) => {
    return prompt.replace(/{{(.*?)}}/g, (match, p1) => `${variables[p1]}` || match)
  }
}

export default replacePrompt
