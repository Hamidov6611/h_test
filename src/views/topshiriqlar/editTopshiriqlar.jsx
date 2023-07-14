import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCardText,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
} from "@coreui/react"
import React, { useState } from "react"

const EditTopshiriqYuklash = (rest) => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={rest.editTopYukShow}
        onClose={() => rest.setEditTopYukShow(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Topshirlarni tahrirlash</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormSelect aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3" disabled>
                  Three
                </option>
              </CFormSelect>
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormSelect aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3" disabled>
                  Three
                </option>
              </CFormSelect>
            </CCol>

            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormTextarea required />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormTextarea required />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Qo'shish
              </CButton>
              <CButton
                className="mx-3"
                color="secondary"
                onClick={() => rest.setEditTopYukShow(false)}
              >
                bekor qilish
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}
export default EditTopshiriqYuklash
