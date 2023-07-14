import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilBell, cilMenu, cilUser } from "@coreui/icons"

import { AppHeaderDropdown } from "./header/index"
// import { logo } from "src/assets/brand/logo"
import { sygnet } from "src/assets/brand/sygnet"

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4" style={{ height: "95px" }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="xl" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={cilUser} height={50} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilUser} size="xl" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
