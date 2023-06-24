import { toggleFeatures } from '@/shared/lib/features'
import { AddCommentFormProps } from './AddCommentForm.types'
import AddCommentFormDeprecated from './deprecated/AddCommentForm'
import AddCommentFormRedesigned from './redesigned/AddCommentForm'

export type { AddCommentFormProps } from './AddCommentForm.types'

const AddCommentForm = (props: AddCommentFormProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <AddCommentFormRedesigned {...props} />,
    off: () => <AddCommentFormDeprecated {...props} />,
  })

export default AddCommentForm
