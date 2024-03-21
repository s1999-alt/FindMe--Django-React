import React from 'react'

const ConfirmationModal = ({ message, loading, error, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-actions">
          <button disabled={loading} onClick={onCancel}>Cancel</button>
          <button disabled={loading} onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
