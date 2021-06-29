import { ProfilePic } from './account-profile-pic/account-profile-pic'
import './account-profile-form.componet.scss'
import backgroudImage from '../../../../assets/shifaaz-shamoon-okVXy9tG3KY-unsplash.jpg'
import profilePicture from '../../../../assets/amonfUS.png'
import FormDropDownItem from '../../../../common-components/components/input-drop-down/input-drop-down'
import { TextBox } from '../../../../common-components/components/text-box/text-box'
import { useEffect, useState } from 'react'
import { cities, states, countries } from '../../../../constants/dummyData'
import { FormObj, fromObjInit } from '../../account.types'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

import { saveChanges } from '../../account.actions'

//! Nu mai folosidefault export

function AccountBodyComponent(props: any): JSX.Element {

    const [fromObj, setFromObj] = useState<FormObj>(fromObjInit)

    useEffect(() => {
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails')!)
        setFromObj(userDetails)
        console.log("USE EFFECT USER DETAILS",userDetails)
        
    }, [])

    function handleTBChange(e: React.ChangeEvent<HTMLInputElement>, key: string): void {
        setFromObj({ ...fromObj, [key]: e.target.value })
    }

    function handleDDChange(key: string, item: string): void {
        setFromObj({ ...fromObj, [key]: item })
    }


    return (
        <div className="user-profile-container debugON">
            <ProfilePic profilePicture={profilePicture} backgroudImage={backgroudImage} />
            <div className="profile-form debug">
                {/* de adaugat o valuare default care sa fie gri daca campul nu e completat */}
                <TextBox
                    label="First Name*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.firstName!}
                    onChange={e => handleTBChange(e, 'firstName')}
                />

                <TextBox
                    label="Middle Name*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.middleName!}
                    onChange={e => handleTBChange(e, 'middleName')}
                />

                <TextBox
                    label="Last Name*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.lastName!}
                    onChange={e => handleTBChange(e, 'lastName')}
                />

                {/* ---------------------------------------------------------- */}

                <TextBox
                    label="Email*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.email!}
                    onChange={e => handleTBChange(e, 'email')}
                />

                <TextBox
                    label="Phone*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.phoneNumber!}
                    onChange={e => handleTBChange(e, 'phoneNumber')}
                />

                <TextBox
                    label="Fax*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.fax!}
                    onChange={e => handleTBChange(e, 'fax')}
                />

                {/* ---------------------------------------------------------- */}

                <TextBox
                    label="Address*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.address!}
                    onChange={e => handleTBChange(e, 'address')}
                />

                <FormDropDownItem
                    id="cityInput"
                    options={cities}
                    label="City*"
                    defaultText={fromObj.city!}
                    name="city"
                    onChange={handleDDChange}
                />

                <FormDropDownItem
                    id="stateInput"
                    options={states}
                    label="State*"
                    defaultText={fromObj.state!}
                    name="state"
                    onChange={handleDDChange}
                />

                {/* ---------------------------------------------------------- */}

                <TextBox
                    label="Zip Code*"
                    type="text"
                    enableHide={false}
                    defaultText={fromObj.zipCode!}
                    onChange={e => handleTBChange(e, 'zipCode')}
                />

                <FormDropDownItem
                    label="Country*"
                    id="countryInput"
                    options={countries}
                    defaultText={fromObj.country!}
                    name="country"
                    onChange={handleDDChange}
                />

                <div className="profile-form-item"></div>

                {/* ---------------------------------------------------------- */}

                <div className="profile-form-item line">
                    <hr />
                </div>
                <div className="profile-form-item line"></div>
                <div className="profile-form-item line"></div>
                {/* <!-- * CHANGE PASSWORD --> */}

                <div className="profile-form-item change-password-title">
                    <label className="change-password-label debug-profile">
                        <b>Change Password</b>
                    </label>
                    <br />
                </div>

                {/* ---------------------------------------------------------- */}

                <TextBox
                    label="Old Password*"
                    type="password"
                    enableHide={true}
                    defaultText="1234567891011"
                    onChange={e => handleTBChange(e, 'oldPassword')}
                />

                <TextBox
                    label="New Password*"
                    type="password"
                    enableHide={true}
                    defaultText="1234567891011"
                    onChange={e => handleTBChange(e, 'newPassword')}
                />

                <TextBox
                    label="Re-type Password*"
                    type="password"
                    enableHide={true}
                    defaultText="1234567891011"
                    onChange={e => handleTBChange(e, 'reNewpassword')}
                />

                {/* <DefaultButtom formObj={fromObj} text="Save Changes" /> */}
                <div className="change-password-button-container">
                    <button className="save-button" onClick={() => props.saveChanges(fromObj)}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})

const mapDispatchToProps = (dispatch: any) => ({
    dispatch,
    ...bindActionCreators({ saveChanges }, dispatch) //? astea sunt ACTIONS
})

export const AccountBody = connect(mapStateToProps, mapDispatchToProps)(AccountBodyComponent)
