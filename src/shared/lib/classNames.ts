type Mods = Record<string, string | boolean>

const classNames = (className: string, mods: Mods, additional: string[]) => {
  return [
    className,
    ...additional,
    ...Object.entries(mods)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key)
  ]
}

export default classNames;
