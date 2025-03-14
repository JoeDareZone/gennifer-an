export interface GeminiPart {
	text: string
}

export interface GeminiContent {
	parts: GeminiPart[]
	role: 'model'
}

export interface GeminiCandidate {
	content: GeminiContent
	finishReason: 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER'
	avgLogprobs: number
}

export interface TokenDetails {
	// Add any specific token details if needed
}

export interface UsageMetadata {
	promptTokenCount: number
	candidatesTokenCount: number
	totalTokenCount: number
	promptTokensDetails: TokenDetails[]
	candidatesTokensDetails: TokenDetails[]
}

export interface GeminiResponse {
	candidates: GeminiCandidate[]
	modelVersion: string
	usageMetadata: UsageMetadata
}
