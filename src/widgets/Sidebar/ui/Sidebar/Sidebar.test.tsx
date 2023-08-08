import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { setFeatureFlags } from '@/shared/lib/features'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('with only first param', () => {
    componentRender(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('test toggle', () => {
    // the collapse toggle only exists in the deprecated sidebar; the redesign
    // (now the default) has no toggle, so select the deprecated design here
    setFeatureFlags({ isAppRedesigned: false })
    componentRender(<Sidebar />)
    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
