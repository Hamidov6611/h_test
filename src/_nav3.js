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

const _nav3 = [
  {
    component: CNavItem,
    name: "Bosh sahifa",
    to: "/main1",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: "Yoshlarni royxatga olish",
  //   to: "/registration2",
  //   icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  // },
]

export default _nav3
