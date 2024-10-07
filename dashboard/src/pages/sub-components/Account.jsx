import { useState } from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {

  const options = [
    {
       name: "Profile",
       component: <Profile />,
    },
    {
       name: "Update Profile",
       component: <UpdateProfile />,
    },
    {
       name: "Update Password",
       component: <UpdatePassword />,
    },
 ];

  const [selectedComponent, setSelectedComponent] = useState("Profile")

  const selectedOption = options.find(option => option.name === selectedComponent)
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
          >
            {options.map((option) => (
              <Link key={option.name} href="#" className={selectedComponent === option.name ? 'font-semibold text-primary' : ''} onClick={() => setSelectedComponent(option.name)}>
              {option.name}
            </Link>
            ))}
          </nav>
          <div className="grid gap-6">
            {selectedOption && selectedOption.component}
          </div>
        </div>
      </main>
  )
}

export default Account