import type { Button, ButtonProps } from '../src'

const nativeProps = {
  autofocus: true,
  form: 'settings-form',
  formaction: '/settings',
  formenctype: 'application/x-www-form-urlencoded',
  formmethod: 'post',
  formnovalidate: true,
  formtarget: '_self',
  name: 'intent',
  onClick: (event: MouseEvent) => {
    event.preventDefault()
  },
  type: 'submit',
  value: 'save',
} satisfies ButtonProps

const componentProps: InstanceType<typeof Button>['$props'] = nativeProps

void componentProps
