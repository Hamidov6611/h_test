import React, { useEffect, useState } from "react"
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react"
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"

import avatar8 from "./../../assets/images/avatars/8.jpg"
import Cookies from "js-cookie"
import axios, { Axios } from "axios"
import { url } from "src/utils/config"

const AppHeaderDropdown = () => {
  const [user, setUser] = useState([])

  const [token, setToken] = useState("")
  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      setToken(b)
    }
  })

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  }

  const logoutHandler = async (e) => {
    e.preventDefault()
    try {
      const data = axios.post(`${url}/user_logout_views/`, config)
      Cookies.remove("token")
      Cookies.remove("role")
      Cookies.remove("user")
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isMatch = Cookies.get("user")
    if (isMatch) {
      const res = JSON.parse(isMatch)
      setUser(res)
    }
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <CIcon icon={cilUser} style={{border:"3px solid #444", padding:'4px', borderRadius:"50%"}} height={50} alt="Logo" size="xl" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className=" fw-semibold pt-2">
          {user?.first_name} {user?.last_name}
        </CDropdownHeader>

        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon
            icon={cilLockLocked}
            className="me-2"
            onClick={logoutHandler}
          />
          Chiqish
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
