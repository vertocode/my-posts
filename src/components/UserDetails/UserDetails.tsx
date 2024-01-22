import { ReactElement } from 'react';
import './UserDetails.scss';
import UserPNG from '../../assets/images/user.png'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";

const UserDetails = ({ user }): ReactElement => {
    const [name, setName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditintPhotoURL, setIsEditingPhotoURL] = useState(false)

    const hasChanged = () => {
        return name !== user.displayName || email !== user.email || photoURL !== user.photoURL
    }

    const save = () => {
        setIsEditingName(false)
        setIsEditingEmail(false)
        setIsEditingPhotoURL(false)
    }

    return (
        <div className="UserDetails">
            <header>
                <h1>User's Details</h1>
                {hasChanged() && <Button variant="contained" onClick={save}>Save</Button>}
            </header>

            <div className="user-info">
                <div className="profile-pic">
                    <img src={photoURL || UserPNG} alt="User's profile picture" />
                    {!isEditintPhotoURL && <i className="fa fa-edit" onClick={ () => setIsEditingPhotoURL(true) }></i>}
                    {isEditintPhotoURL && (
                        <TextField
                            onChange={(e) => setPhotoURL(e.target.value)}
                            label="Photo URL"
                            variant="standard"
                            value={photoURL}
                            type="text"
                        />
                    )}
                </div>
                <div className="info">
                    <p><strong>User ID:</strong> {user.uid}</p>
                    {isEditingName
                    ? (
                        <p>
                            <strong>Name:</strong>
                            <TextField
                                value={ name }
                                type="text"
                                onBlur={ () => setIsEditingName(false) }
                                onChange={ (e) => setName(e.target.value) }
                            />
                        </p>
                    )
                    : (
                        <p>
                            <strong>Name:</strong> {name}
                            <i className="fa fa-edit" onClick={ () => setIsEditingName(true) }></i>
                        </p>
                    )}
                    {isEditingEmail
                    ? (
                        <p>
                            <strong>Email:</strong>
                            <TextField
                                value={ email }
                                type="text"
                                onBlur={ () => setIsEditingEmail(false) }
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                        </p>
                    )
                    : (
                        <p>
                            <strong>Email:</strong> {email}
                            <i className="fa fa-edit" onClick={ () => setIsEditingEmail(true) }></i>
                        </p>
                    )}
                </div>
            </div>
            {/*<div className="token-info">*/}
            {/*    <p><strong>Access Token:</strong> {user.stsTokenManager.accessToken}</p>*/}
            {/*    <p><strong>Refresh Token:</strong> {user.stsTokenManager.refreshToken}</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default UserDetails;
