// 디자인 토큰을 파싱하여 사용 가능한 형식으로 변환하는 유틸리티

type TokenValue = string | number | { hex?: string; [key: string]: any } | any

/**
 * 토큰 객체에서 실제 값을 추출
 */
function extractValue(token: any): any {
  if (!token || typeof token !== 'object') {
    return token
  }

  // $value가 있으면 값을 추출
  if (token.$value !== undefined) {
    const value = token.$value
    
    // 색상 토큰인 경우 hex 값을 반환
    if (token.$type === 'color' && typeof value === 'object' && value?.hex) {
      return value.hex
    }
    
    // 숫자나 문자열은 그대로 반환
    if (typeof value === 'number' || typeof value === 'string') {
      return value
    }
    
    // 객체인 경우 재귀적으로 처리
    if (typeof value === 'object' && value !== null) {
      return extractValue(value)
    }
    
    return value
  }

  // 중첩된 객체인 경우 재귀적으로 처리
  const result: any = {}
  for (const key in token) {
    if (key !== '$type' && key !== '$extensions' && key !== '$value') {
      result[key] = extractValue(token[key])
    }
  }
  return result
}

/**
 * 색상 토큰을 Tailwind 형식으로 변환 (카멜케이스를 케밥케이스로)
 */
function convertColorsToTailwind(colors: any): any {
  const result: any = {}
  for (const key in colors) {
    const value = colors[key]
    const tailwindKey = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
    
    if (typeof value === 'string' && value.startsWith('#')) {
      result[tailwindKey] = value
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[tailwindKey] = convertColorsToTailwind(value)
    }
  }
  return result
}

/**
 * 숫자 토큰을 px 단위로 변환
 */
function convertNumbersToPx(numbers: any): any {
  const result: any = {}
  for (const key in numbers) {
    const value = numbers[key]
    if (typeof value === 'number') {
      result[key] = `${value}px`
    } else if (typeof value === 'object' && value !== null) {
      result[key] = convertNumbersToPx(value)
    } else {
      result[key] = value
    }
  }
  return result
}

/**
 * 디자인 토큰 JSON을 파싱하여 사용 가능한 객체로 변환
 */
export function parseDesignTokens(tokens: any): {
  colors: any
  spacing: any
  borderRadius: any
  screens: any
  font: any
} {
  const parsed = extractValue(tokens)
  
  return {
    colors: convertColorsToTailwind(parsed),
    spacing: convertNumbersToPx(parsed['Spacing (Margin & Padding)'] || {}),
    borderRadius: convertNumbersToPx(parsed['Border Radius'] || {}),
    screens: parsed['Screens'] || {},
    font: parsed.IVTSfont || 'Inter',
  }
}

/**
 * 시맨틱 토큰을 파싱
 */
export function parseSemanticTokens(tokens: any): any {
  return extractValue(tokens)
}
