import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Link to="/users">Users</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default HomePage
