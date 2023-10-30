import { useEffect } from "react"
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom"

// type Props = {}

export const UserProfile = (/*props: Props*/) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  console.log(pathname)

  useEffect(() => {
    if (pathname.split("/")[1] === "user-profile" && pathname.split("/")[2] !== "settings") {
      navigate("/user-profile/orders")
    }
  }, [pathname])
  return (
    <div className="py-10 flex max-md:flex-col md:gap-10 gap-5">

      {/* SIDEBAR */}
      <div className="md:w-1/4 max-md:p-5 max-md:pl-0">
        <ul className="max-md:flex max-md:gap-5 max-md:[&>li>a]:bg-slate-100">
          <li className="user-profile-link__item text-gray-500 font-medium md:text-lg md:pb-2">
            <NavLink to={"/user-profile/orders"} className="max-md:p-2 max-md:rounded-md">Buyurmalarim</NavLink>
          </li>
          <li className="user-profile-link__item text-gray-500 font-medium md:text-lg">
            <NavLink to={"/user-profile/settings"} className="max-md:p-2 max-md:rounded-md">Sozlamalar</NavLink>
          </li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="md:w-3/4">
        <Outlet />
      </div>
    </div>
  )
}