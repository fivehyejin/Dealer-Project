// 디자인 토큰을 JSON 파일에서 직접 읽어서 사용
import primitiveString from '../tokens/primitiveString.tokens.json'
import primitiveColors from '../tokens/primitiveColors.tokens.json'
import semanticDark from '../tokens/semanticDark.tokens.json'
import semanticLight from '../tokens/semanticLight.tokens.json'
import { parseDesignTokens, parseSemanticTokens } from './tokenParser'

// 프리미티브 토큰 파싱
const parsedPrimitiveString = parseDesignTokens(primitiveString)
const parsedPrimitiveColors = parseDesignTokens(primitiveColors)

// 시맨틱 토큰 파싱
const parsedSemanticDark = parseSemanticTokens(semanticDark)
const parsedSemanticLight = parseSemanticTokens(semanticLight)

// 통합된 디자인 토큰
export const designTokens = {
  // 프리미티브 토큰
  primitive: {
    colors: parsedPrimitiveColors.colors,
    spacing: parsedPrimitiveString.spacing,
    borderRadius: parsedPrimitiveString.borderRadius,
    screens: parsedPrimitiveString.screens,
    font: parsedPrimitiveString.font,
  },
  // 시맨틱 토큰
  semantic: {
    dark: parsedSemanticDark,
    light: parsedSemanticLight,
  },
}

// Tailwind 설정용 헬퍼
export const tailwindTokens = {
  colors: {
    ...parsedPrimitiveColors.colors,
    // 시맨틱 색상도 포함 (필요시)
  },
  spacing: parsedPrimitiveString.spacing,
  borderRadius: parsedPrimitiveString.borderRadius,
  screens: parsedPrimitiveString.screens,
  fontFamily: {
    sans: [parsedPrimitiveString.font, 'system-ui', 'sans-serif'],
  },
}
