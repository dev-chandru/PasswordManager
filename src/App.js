import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import NewUserDetails from './Components/NewUserDetails'

import './App.css'

class App extends Component {
  state = {
    isNewUserAdded: false,
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    initialUserList: [],
    isShowPassword: false,
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      isShowPassword: !prevState.isShowPassword,
    }))
  }

  isActiveUser = () => {
    this.setState({
      isNewUserAdded: true,
    })
  }

  onAddingNewUser = event => {
    event.preventDefault()
    const {
      isNewUserAdded,
      websiteInput,
      userNameInput,
      passwordInput,
    } = this.state
    const newUser = {
      id: uuidv4(),
      websiteInput,
      userNameInput,
      passwordInput,
    }
    this.setState(prevState => {
      const {initialUserList} = prevState
      return {
        initialUserList: [...initialUserList, newUser],
        websiteInput: '',
        userNameInput: '',
        passwordInput: '',
      }
    })
    this.isActiveUser()
  }

  onDeletingUserList = id => {
    const {initialUserList} = this.state
    const remainingList = initialUserList.filter(eachItem => eachItem.id !== id)

    const finalLength = remainingList.length
    if (finalLength > 0) {
      this.setState({
        initialUserList: remainingList,
      })
    } else if (finalLength === 0) {
      this.setState({
        isNewUserAdded: false,
      })
    }
  }

  onChangeWebsiteInput = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsernameInput = event => {
    this.setState({
      userNameInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onSearchInput = event => {
    const {initialUserList} = this.state
    const searchvalue = event.target.value
    const filteredList = initialUserList.filter(eachItem =>
      eachItem.websiteInput.toLowerCase().includes(searchvalue.toLowerCase()),
    )
    this.setState({
      initialUserList: filteredList,
    })
  }

  renderNewUser = () => {
    const {initialUserList, isShowPassword} = this.state
    return (
      <ul className="user-list-main-bg-container">
        {initialUserList.map(eachItem => (
          <NewUserDetails
            userDetails={eachItem}
            key={eachItem.id}
            onDeletingUserList={this.onDeletingUserList}
            isActiveShowPassword={isShowPassword}
          />
        ))}
      </ul>
    )
  }

  renderEmptyImage = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  render() {
    const {
      initialUserList,
      isNewUserAdded,
      websiteInput,
      userNameInput,
      passwordInput,
    } = this.state

    const count = initialUserList.length

    return (
      <div className="main-bg-container">
        <div className="main-banner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="main-card1-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="password-manager"
              alt="password manager"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="password-manager-again"
              alt="password manager"
            />
            <form className="form-container" onSubmit={this.onAddingNewUser}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="website-input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-images"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={websiteInput}
                />
              </div>
              <div className="website-input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-images"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  value={userNameInput}
                />
              </div>
              <div className="website-input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-images"
                  />
                </div>
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="main-card2-container">
            <div className="pass-search-main-container">
              <h1 className="pass-para">Your Passwords</h1>
              <p className="pass-count">{count}</p>
              <div className="search-input-container">
                <div className="search-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-images"
                  />
                </div>
                <input
                  type="search"
                  className="search-element"
                  placeholder="Search"
                  onChange={this.onSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="forPassword"
                className="checkbox-input"
                onChange={this.onShowPassword}
              />
              <label htmlFor="forPassword" className="label-text">
                Show passwords
              </label>
            </div>
            {isNewUserAdded ? this.renderNewUser() : this.renderEmptyImage()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
