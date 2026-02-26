export const formIds = {
  create: 'create-board-form',
  update: 'update-board-form',
  addWord: 'add-word-form',
} as const

export type formType = (typeof formIds)[keyof typeof formIds]
