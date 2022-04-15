
type Props =
  | {
    type: 'story'
  }
  | {
    type: 'question'
  }
  | {
    type: 'bounty'
  }

export default function PostCard(props: Props) {
  if ('question' in props) {
  }
  return (
    <div>StoryCard</div>
  )
}
