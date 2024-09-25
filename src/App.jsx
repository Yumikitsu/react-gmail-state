import { useState, useEffect } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {

  // All emails
  const [allEmails, setAllEmails] = useState(initialEmails)

  // All active emails (Emails that should be displayed after filters are applied)
  const [activeEmails, setActiveEmails] = useState(allEmails)

  // State to check if read mails should be hidden
  const [hideRead, setHideRead] = useState(false)

  // State to check if starred inbox is selected
  const [readStarred, setReadStarred] = useState(false)

  // Toggle the READ state of a specific email
  const toggleRead = (id) => {
    const updatedEmails = allEmails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    )
    setAllEmails(updatedEmails)
  }

  // Toggle the STAR state of a specific email
  const toggleStar = (id) => {
    const updatedEmails = allEmails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    )
    setAllEmails(updatedEmails)
  }

  // Toggle "Hide read" checkbox
  const toggleHide = () => {
    setHideRead(!hideRead)
  }

  // Go to regular inbox
  const showAll = () => {
    setReadStarred(false)
  }

  // Go to starred inbox
  const showStarred = () => {
    setReadStarred(true)
  }

  // Use Effect Constantly Checks for Updates on the Website
  useEffect(() => {
    let emailsToShow = allEmails;

    // Filter if the read emails should be hidden
    if (hideRead) {
      emailsToShow = emailsToShow.filter((email) => !email.read);
    }

    // Filter if the inbox is the starred inbox
    if (readStarred) {
      emailsToShow = emailsToShow.filter((email) => email.starred);
    }

    // Set the active emails to the emails that should be displayed
    setActiveEmails(emailsToShow);
  }, [allEmails, hideRead, readStarred])

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list"> 
          {/* If readStarred is false, highlight the Inbox */}
          <li className={`item ${!readStarred ? 'active' : ''}`} onClick={showAll}>
            <span className="label">Inbox</span>
            <span className="count">{allEmails.length}</span>
          </li>
          {/* If readStarred is true, highlight the Starred Inbox */}
          <li className={`item ${readStarred ? 'active' : ''}`} onClick={showStarred}>
            <span className="label">Starred</span>
            <span className="count">{allEmails.filter(email => email.starred).length}</span>
          </li>
          {/* Checkbox to toggle if you wanna hide or show emails marked as READ */}
          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input id="hide-read" type="checkbox" checked={hideRead} onChange={() => {toggleHide()}}/>
          </li>
        </ul>
      </nav>
      {/* This displays all the ACTIVE Emails with their READ status and STAR status displayed */}
      <main className="emails">{activeEmails.map((email) => (
        <li key={email.id} className={`email ${email.read ? 'read' : 'undread'}`}>
          <input type="checkbox" className="select-checkbox" checked={email.read} onChange={() => toggleRead(email.id)}/>
          <input type="checkbox" className="star-checkbox" checked={email.starred} onChange={() => toggleStar(email.id)}/>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      ))}</main>
    </div>
  )
}

export default App