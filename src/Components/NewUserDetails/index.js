import './index.css'

const backGroundColorList = [
  'purple',
  'dark-yellow',
  'green',
  'orange',
  'light-green',
  'red',
  'sky-blue',
  'grey',
  'blue',
]

const NewUserDetails = props => {
  const {userDetails, onDeletingUserList, isShowPassword} = props
  const {id, websiteInput, userNameInput, passwordInput} = userDetails
  const firstLetter = websiteInput[0].toUpperCase()

  const onDeleteItem = () => {
    onDeletingUserList(id)
  }

  const showRealPassword = () => <p className="user-name">{passwordInput}</p>

  const showEncryptImage = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  const bgLength = backGroundColorList.length - 1

  const bgColorNum = Math.ceil(Math.random() * bgLength)
  const bgColor = backGroundColorList[bgColorNum]

  const firstLetterClassName = `first-letter ${bgColor}`

  return (
    <li className="user-list-main-container">
      <div className="card1-container">
        <p className={firstLetterClassName}>{firstLetter}</p>
        <div>
          <p className="website">{websiteInput}</p>
          <p className="user-name">{userNameInput}</p>
          {isShowPassword ? showRealPassword() : showEncryptImage()}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDeleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default NewUserDetails
