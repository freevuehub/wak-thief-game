import { useContext } from 'react'
import { PromptContext } from '@/provider/Prompt'

const usePrompt = () => useContext(PromptContext)

export default usePrompt
