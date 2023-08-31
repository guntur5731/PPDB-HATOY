import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { get, post } from "../../../configs/apiService"
import { peserta, verifikasiPeserta } from '../../../configs/apiurl'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const verifikasi = () => {
    const colums = [
        {
            name: 'Nama',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'No Registrasi',
            sortable: true,
            selector: row => row.id_registrasi
        },
        {
            name: 'NISN',
            sortable: true,
            selector: row => row.nisn
        },
        {
            name: 'Email',
            sortable: true,
            selector: row => row.email
        },
        {
            name: 'Status',
            sortable: true,
            cell: (row) => (
                <>
                    <Badge color={row.is_verifikasi === 1 ? 'success' : "danger"}>{row.is_verifikasi === 1 ? 'Sudah Terverifikasi' : "Belum Terverifikasi"}</Badge>
                </>
            )
        }
    ]
    const [data, setData] = useState([])
    const [basicModal, setBasicModal] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const setSelectedRow = (value) => {
        setSelectedData(value.selectedRows)
    }

    const getPeserta = () => {
        get(peserta)
            .then((resp) => {
                if (resp && resp.data && resp.data.data) {
                    setData(resp.data.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPeserta()
    }, [])

    const handleVerifikasi = () => {
        if (selectedData.length > 0) {
            setBasicModal(!basicModal)

        } else {
            toast.error("Peserta Belum Di Pilih")
        }
    }

    const handleSubmitVerif = () => {
        post(verifikasiPeserta, selectedData)
            .then((res) => {
                if (res && res.data && res.data.response && res.data.response.status) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Verifikasi Peserta',
                        text: 'Sukses Verifikasi Peserta.',
                        timer: 3000
                    })
                }
                setBasicModal(!basicModal)
                getPeserta()
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleConfirmText = () => {
        MySwal.fire({
            title: 'Konfirmasi',
            text: "Apakah anda yakin verifikasi data tersebut?",
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
                handleSubmitVerif()
            }
        })
    }

    return (
        <div>
            <Row>
                <Col lg={12} sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Verifikasi
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={12} md={12}>
                                    <DataTable
                                        columns={colums}
                                        selectableRows
                                        data={data}
                                        onSelectedRowsChange={setSelectedRow}
                                    />
                                </Col>
                                {data.length > 0 &&
                                    <Col lg={12} md={12} className="mt-2">
                                        <Button color='success' onClick={() => handleVerifikasi()}>Verifikasi</Button>
                                    </Col>
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={basicModal} size={"lg"} toggle={() => setBasicModal(!basicModal)}>
                <ModalHeader toggle={() => setBasicModal(!basicModal)}>Verifikasi</ModalHeader>
                <ModalBody>
                    <DataTable
                        columns={colums}
                        data={selectedData}
                        pagination
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={() => handleConfirmText()}>
                        Verifikasi
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default verifikasi