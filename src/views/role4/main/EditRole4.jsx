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

const EditRole2 = (rest) => {
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
        visible={rest.editModalShow}
        onClose={() => rest.setEditModalShow(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Yoshlarni ro'yxatga olish</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol xs={6}>
              <CFormInput
                type="text"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="F.I.O"
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                ZfeedbackValid="Looks good!"
                id="validationCustom02"
                label="Telefon raqam"
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="validationCustomUsername">
                Tug&apos;ulgan kun
              </CFormLabel>
              <CInputGroup className="has-validation">
                <CFormInput
                  type="text"
                  aria-describedby="inputGroupPrependFeedback"
                  feedbackValid="Please choose a username."
                  id="validationCustomUsername"
                  required
                />
              </CInputGroup>
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                id="validationCustom03"
                label="Qishloq"
                required
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormTextarea required />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Tahrirlash
              </CButton>
              <CButton
                className="mx-3"
                color="secondary"
                onClick={() => rest.setEditModalShow(false)}
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
export default EditRole2
