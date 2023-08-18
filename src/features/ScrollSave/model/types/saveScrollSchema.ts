// page path -> scroll position
export type ScrollSchema = Record<string, number>

export interface SaveScrollSchema {
  scroll: ScrollSchema
}
