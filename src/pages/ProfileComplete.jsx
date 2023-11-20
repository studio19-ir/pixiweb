import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProfileComplete = () => {

    const {User,countryList} = useContext(AuthContext);

  return (
    <div className='complete_main'>
        <div className="complete_top">
            <div className="image">
            <img alt="user_photo" src={User.picture} width={70} height={70} />
            </div>
            <div>{User.username}</div>
            <div>{User.email}</div>
        </div>
        <div className="complete_wrapper">
            <div className="title">CREATE ACCOUNT</div>
            <div className="info">Finish setup your account to start using app</div>
            <div className="form">
                
                    <form id="createAccount">
                        <div className="formgroup">
                        <label>Country</label>
                        <select id="country" name="country">
                            <option>Select a Country</option>
                            {countryList?.map((c,i) => {
                                return(
                                    <option key={i} value={c.id}><img alt="country_flag" src={c.flag} width={20} height={20}/>{c.name}</option>
                                )
                            })}
                        </select>
                        </div>
                        <div className="formgroup">
                        <label>Bio</label>
                        <textarea rows={5} placeholder='Say about yourself'></textarea>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>
  )
}

export default ProfileComplete