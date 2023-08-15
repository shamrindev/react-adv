import { AddCommentFormProps } from './AddCommentForm.types'
import AddCommentFormRedesigned from './redesigned/AddCommentForm'

export type { AddCommentFormProps } from './AddCommentForm.types'

const AddCommentForm = (props: AddCommentFormProps) => (
  <AddCommentFormRedesigned {...props} />
)

export default AddCommentForm
