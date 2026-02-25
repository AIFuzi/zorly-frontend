export class Colors {
  static purple = '#895AF6'
  static blue = '#3B82F6'
  static teal = '#10B981'
  static orange = '#F57116'
  static red = '#BE123C'
  static pink = '#EC4899'
  static cyan = '#06B6D4'
  static zinc = '#71717A'
  static lime = '#84CC16'
}

export const colorsArray = [
  { key: 'purple', code: '#895AF6' },
  { key: 'blue', code: '#3B82F6' },
  { key: 'teal', code: '#10B981' },
  { key: 'orange', code: '#F57116' },
  { key: 'red', code: '#BE123C' },
  { key: 'pink', code: '#EC4899' },
  { key: 'cyan', code: '#06B6D4' },
  { key: 'zinc', code: '#71717A' },
  { key: 'lime', code: '#84CC16' },
]

export type colorKeys = (typeof colorsArray)[number]['key']

export function getColorByKey(key: string) {
  return colorsArray.find(color => color.key === key)
}
