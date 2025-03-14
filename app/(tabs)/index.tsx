import axios from 'axios'
import { useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GeminiResponse } from '../../types/gemini'

export default function HomeScreen() {
	const [messages, setMessages] = useState<string[]>([])
	const getChat = () => {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`

		const requestBody = {
			contents: [
				{
					// parts: [{ text: 'Write a story about a magic backpack.' }],
					parts: [{ text: 'Hey Gemini' }],
				},
			],
		}

		axios
			.post<GeminiResponse>(url, requestBody, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(response => {
				const generatedText =
					response.data.candidates[0]?.content.parts[0]?.text || ''
				setMessages(prevMessages => [...prevMessages, generatedText])
				console.log('Generated text:', generatedText)
			})
			.catch((error: { response: { data: any }; message: any }) => {
				console.error(
					'Error:',
					error.response ? error.response.data : error.message
				)
			})
	}

	return (
		<SafeAreaView className='flex-1 justify-center items-center p-4 gap-y-4'>
			<Text className='text-2xl font-bold'>Chat with AI</Text>
			<FlatList
				className='flex-1 w-full border-2 border-red-500 flex-row'
				data={messages}
				renderItem={({ item }) => <Text>{item}</Text>}
			/>
			<TouchableOpacity
				className='bg-red-500 p-4 rounded-lg'
				onPress={getChat}
			>
				<Text className='text-white'>Generate AI Story</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
