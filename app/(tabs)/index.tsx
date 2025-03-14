import axios from 'axios'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { GeminiResponse } from '../../types/gemini'

export default function HomeScreen() {
	const [message, setMessage] = useState('')

	const getChat = () => {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`

		const requestBody = {
			contents: [
				{
					parts: [{ text: 'Write a story about a magic backpack.' }],
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
				setMessage(generatedText)
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
		<View className='flex-1 justify-center items-center'>
			<TouchableOpacity
				className='bg-red-500 p-4 rounded-lg'
				onPress={getChat}
			>
				<Text className='text-white'>Generate AI Story</Text>
			</TouchableOpacity>
			{message && <Text className='p-4 mt-4'>{message}</Text>}
		</View>
	)
}
