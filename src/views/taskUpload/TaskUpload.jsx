import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import React from "react"

const TaskUpload = () => {
  return (
    <CTable bordered borderColor={"dark"}>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Class</CTableHeaderCell>
          <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
          <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">1</CTableHeaderCell>
          <CTableDataCell>Mark</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export default TaskUpload
