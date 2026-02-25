export const formIds = {
  create: 'create-board-form',
  update: 'update-board-form',
} as const

export type formType = (typeof formIds)[keyof typeof formIds]
