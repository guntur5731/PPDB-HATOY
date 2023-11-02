import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Label, Row, Spinner } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { get } from "../../../configs/apiService"
import { deletePeserta } from '../../../configs/apiurl'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

export default function deleteAccount({ userData }) {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const deleteAccounts = () => {
        MySwal.fire({
            title: 'Konfirmasi',
            text: `Apakah anda yakin menghapus data ${userData?.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                setLoading(true)
                console.log()
                get(`${deletePeserta}?userId=${userData?.userUuid}`).then((res) => {
                    if (res && res.data && res.data.response && res.data.response.status) {
                        toast.success(res.data.response.message)
                        history.push("/peserta")
                    }
                    setLoading(false)
                }).catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
            }
        })
    }
    return (
        <Row>
            <Col md="12" sm="12">
                <Card>
                    <CardBody>
                        <Button disabled={loading} color='danger' onClick={() => { deleteAccounts() }}>{loading ? <><Spinner size={'sm'} /> Loading</> : "Hapus Data"}</Button>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
