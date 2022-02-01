import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons'
import Logo from "../images/logo.png"
const Nav = ({libraryStatus, setLibraryStatus}) => {
    return(
        <nav>
            <img src={Logo} style={{width: 60}} alt="" />
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} style={{marginLeft: 5}} />
            </button>
        </nav>
    )
}
export default Nav;