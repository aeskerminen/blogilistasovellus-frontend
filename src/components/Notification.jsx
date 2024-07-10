import PropTypes from 'prop-types'

const Notification = (props) => {
  return (
    <div style={{ margin: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '2px solid black', backgroundColor: props.color }}>
      <h2 style={{ padding: 0, margin: 0 }}>{props.message}</h2>
    </div>
  )
}

Notification.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification