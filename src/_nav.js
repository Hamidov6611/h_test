import React from "react"
import CIcon from "@coreui/icons-react"
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFolderOpen,
  cilHome,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilTask,
} from "@coreui/icons"
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react"

const _nav = [
  {
    component: CNavItem,
    name: "Bosh sahifa",
    to: "/home",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Yoshlarni royxatga olish",
    to: "/registration",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Topshiriqlar",
    to: "/topshiriqlar",
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },
]

export default _nav
