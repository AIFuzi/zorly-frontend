'use client'

import { Field } from '@/src/components/ui/field'
import { Label } from '@/src/components/ui/label'
import { colorKeys, colorsArray } from '@/src/shared/consts'
import { Check } from 'lucide-react'
import { useState } from 'react'

interface ColorSelectorProps {
  selectColor: (color: string) => void
}

export default function ColorSelector({ selectColor }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<colorKeys>('purple')

  function colorSelect(color: string) {
    selectColor(color)
    setSelectedColor(color)
  }

  return (
    <Field>
      <Label>Board color</Label>
      <div className="grid grid-cols-6 space-y-2">
        {colorsArray.map(color => (
          <div
            key={color.key}
            onClick={() => colorSelect(color.key)}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:opacity-90 ${selectedColor === color.key && 'border-2 border-black dark:border-white'}`}
            style={{ backgroundColor: color.code }}
          >
            {color.key === selectedColor && <Check />}
          </div>
        ))}
      </div>
    </Field>
  )
}
