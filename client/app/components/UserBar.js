import React from 'react'
import styles from 'client/app/styles'

export default function UserBar(props) {
  const { userData } = props
  const fullSizeProfilePicture = userData.profile_image_url ? userData.profile_image_url.replace('_normal', '_bigger') : ''
  return (
    <div style={styles.userBar}>
      <img src={fullSizeProfilePicture} style={styles.profilePicture} alt={userData.screen_name} />
      <span>{userData.screen_name}</span>
    </div>
  )
}
