/**
 * Elements permitted as the `VisuallyHidden` root.
 *
 * The union is closed rather than every HTML tag so the rendered element stays
 * valid in the parent contexts this utility is actually used in: phrasing
 * content, flow content, list items, and table cells. Interactive and void
 * elements are excluded because they would either defeat the hiding contract or
 * cannot hold children. Widening this union later is additive; narrowing it is a
 * breaking change.
 */
export type VisuallyHiddenElement = 'span' | 'div' | 'p' | 'li' | 'td' | 'th'

/** Props for the `VisuallyHidden` component. */
export interface VisuallyHiddenProps {
  /**
   * Rendered root element. Choose the tag that is valid where the component is
   * placed, such as `td` inside a table row or `li` inside a list.
   *
   * @default 'span'
   */
  as?: VisuallyHiddenElement
  /**
   * Reveals the content while focus is inside it, then hides it again once focus
   * leaves.
   *
   * Required whenever the slot contains anything focusable, such as a skip link.
   * Focusable content left hidden is reachable by keyboard but invisible, which
   * strands sighted keyboard users on a control they cannot see.
   *
   * @default false
   */
  focusable?: boolean
}
