
import { useEffect, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/new_logo.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import ProfileDropdown from "../core/Auth/ProfileDropdown"
// import { BottomNavigation } from "@mui/material"

function Navbar() {
  const [showDropDown,setShowDropDown]=useState(false);
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 relative items-center justify-center z-auto  ${
        location.pathname !== "/" ? " bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between fixed bg-opacity-50 z-1">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-500  font-semibold">
          {NavbarLinks.map((link, index) => (
              <Link to={link?.path}>
                <p
                  className={`${
                    matchRoute(link?.path)
                      ? "text-pink-300"
                      : "text-white"
                  }`}
                >
                  {link.title}
                </p>
              </Link>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
              <AiOutlineMenu onClick={()=>setShowDropDown(!showDropDown)} color="white" fontSize={24}/>
        </button>
      </div>
    <div className={`w-[100vw] md:hidden p-4 h-fit bg-richblack-800 z-50 absolute top-[55px] text-white ${showDropDown?("block"):("hidden")}  border border-white`}> 
    <ul className="flex  flex-col w-full gap-y-2 items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <Link to={link?.path}>
                <p
                  className={`${
                    matchRoute(link?.path)
                      ? "text-pink-300"
                      : "text-white"
                  }`}
                >
                  {link.title}
                </p>
              </Link>
            ))}
            
          {token === null && (
            <Link to="/login">
              <button className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/login")
                          ? "text-pink-300"
                          : "text-white"
                      }`}>
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup" 
            className={`group relative flex cursor-pointer items-center gap-1 ${
              matchRoute("/signup")
                ? "text-pink-300"
                : "text-white"
            }`}>
              <button >
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
          </ul>
    </div>
    </div>
  )
}

export default Navbar