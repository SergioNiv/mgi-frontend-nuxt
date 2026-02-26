export const isRequired = (value: unknown): boolean => {
  return value !== null && value !== undefined && value !== ''
}
