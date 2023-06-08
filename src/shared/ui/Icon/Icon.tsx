import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
  width?: number
  height?: number
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true
  onClick: () => void
}

type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = (props: IconProps) => {
  const {
    className,
    Svg,
    inverted,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props

  const icon = (
    <Svg
      className={classNames(cls.icon, { [cls.inverted]: inverted }, [
        className,
      ])}
      width={width}
      height={height}
      {...otherProps}
    />
  )

  if (clickable) {
    return (
      <button
        type="button"
        className={cls.button}
        onClick={props.onClick}
        style={{ width, height }}
      >
        {icon}
      </button>
    )
  }

  return icon
}
