import { ReactElement } from 'react'
import './ConfirmDeleteModal.scss'
import Button from "@mui/material/Button";

interface ConfirmDeleteProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }: ConfirmDeleteProps): ReactElement | null => {
    if (!isOpen) {
        return null
    }

    return (
        <div className="ConfirmDeleteModal">
            <div className="modal-content">
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to delete it?  <strong>This action is irreversible.</strong></p>
                <div className="button-container">
                    <Button onClick={ onClose } variant="outlined">Cancel</Button>
                    <Button onClick={ onConfirm } color="error" variant="contained">Confirm</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal
