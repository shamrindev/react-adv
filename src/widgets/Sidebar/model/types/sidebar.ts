export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  /** outline icon used by the redesigned sidebar; deprecated keeps Icon */
  IconRedesigned?: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}
