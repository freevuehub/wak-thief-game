import { useContext } from 'react'
import { AIContext } from '@/provider/AI'

const useAI = () => useContext(AIContext)

export default useAI
