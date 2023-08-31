import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { get, post, patch } from '../../../configs/apiService'
import { masterBayaran, tahunAjaran, kelas, jenisPembayaran } from '../../../url'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'
function Index () {
    const history = useHistory()
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [tahunAjar, setTahunAjar] = useState([])
    const [tipeKelas, setTipeKelas] = useState([])
    const [listBayaran, setListBayaran] = useState([])
    const [inputData, setInputData] = useState({
        idTahunAjaran: "",
        tipeKelas: "",
        listBayaran: []
    })
    const [currentRow, setCurrentRow] = useState(null)
    const [validation, setValidation] = useState({
        idTahunAjaran: "",
        tipeKelas: ""
    })
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            name: 'Tahun Ajaran',
            sortable: true,
            selector: row => row.tahunAjaran
        },
        {
            name: 'Keterangan',
            sortable: true,
            selector: row => row.keterangan
        }
    ]


    const getData = () => {
        get(masterBayaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                setData(resp.data.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTahunAjar = () => {
        get(tahunAjaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const data = []
                resp.data.data.forEach((item) => {
                    data.push({ value: item.id_tahun, label: item.tahun_ajaran, allData: item })
                })
                setTahunAjar(data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getListBayaran = () => {
        get(jenisPembayaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const listData = []
                resp.data.data.forEach(items => {
                    listData.push({
                        id: items.id_jenis_pem,
                        label: items.keterangan,
                        value: ""
                    })
                })
                setListBayaran(listData)
                console.log(listData)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTipeKelas = () => {
        get(kelas).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const data = []
                resp.data.data.forEach((item) => {
                    data.push({ value: item.id_type, label: item.nama, allData: item })
                })
                setTipeKelas(data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleReset = () => {
        setInputData({
            idTahunAjaran: "",
            tahunAjaran: "",
            keterangan: "",
            status: true
        })
        setIsEdit(false)
    }

    const handleSetModal = () => {
        setAddModal(!addModal)
        setInputData({
            idTahunAjaran: "",
            tipeKelas: "",
            listBayaran: []
        })

        setValidation({
            idTahunAjaran: "",
            tipeKelas: ""
        })
    }

    const onSubmit = () => {
        if (inputData.idTahunAjaran === "" || inputData.tipeKelas === "") {
            toast.error("Kolom wajib diisi")
            setValidation({ idTahunAjaran: "Field is required", tipeKelas: "Field is required" })
        } else {
            const sendData = inputData
            sendData.listBayaran = listBayaran
            setLoading(true)
            if (isEdit) {
                patch(tahunAjaran, inputData)
                    .then((resp) => {
                        handleReset()
                        getData()
                        console.log(resp)
                        setLoading(false)
                        toast.success("Sukses Update Data")
                    }).catch((error) => {
                        console.log(error)
                        setLoading(false)
                        toast.error("Internal Server Error")
                    })
            } else {
                post(masterBayaran, sendData)
                    .then((resp) => {
                        toast.success("Sukses Menyimpan Data")
                        console.log(resp)
                        handleSetModal()
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error)
                        setLoading(false)
                        toast.error("Internal Server Error")
                    })
            }
        }
    }

    useEffect(() => {
        setData([])
        getData()
        getTahunAjar()
        getTipeKelas()
        getListBayaran()
    }, [])

    const handleFilterData = (e) => {
        let updatedData = []
        const value = e.target.value

        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.tahun_ajaran.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.keterangan.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.tahun_ajaran.toLowerCase().includes(value.toLowerCase()) ||
                    item.keterangan.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }

    }

    const handleSetData = (value, index) => {
        listBayaran[index].value = value
        setListBayaran(listBayaran)
    }

    const ExpandedComponent = ({ data }) => (
        <div className='w-full'>
            <div className='py-2'>
                {data.detail.map((item, index) => (
                    <Row key={index}>
                        <Col md={3} sm={3} style={{ marginLeft: "80px" }}>
                            <Label>{item.typeKelas}</Label>
                        </Col>
                        <Col md={3} sm={3}>
                            <Label>{item.keterangan}</Label>
                        </Col>
                        <Col md={3} sm={3}>
                            <Label>{item.jumlah} </Label>
                        </Col>
                        {/* <div className='col-span-1'>
                            <div className='flex justify-center w-full'>
                                <span title='Copy'>
                                    <Button style={'icon'} icon={'copy'} className={'mx-1'} onClick={() => onEdit(data, '', true, item.formHeadUuid)} />
                                </span>
                                <span title='Edit in builder'>
                                    <Button style={'icon'} icon={'personalize'} className={'mx-1'} onClick={() => onEdit(data, '', false, item.formHeadUuid)} />
                                </span>
                            </div>
                        </div> */}
                    </Row>
                ))}
            </div>
        </div>
    )

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>
                    Master Bayaran
                    <p />
                    <Button.Ripple onClick={() => {
                        history.push(`${window.location.pathname}/add`)
                    }}
                        color="primary">Tambah Master Bayaran</Button.Ripple>
                </CardTitle>
            </CardHeader>
            <CardBody style={{ display: 'none' }}>
                <Row className='justify-content-between align-items-center'>
                    <Col md={2} className='mb-md-0 mb-1'>
                        <Label className='form-label'>
                            Tahun Ajaran
                        </Label>
                        <Input type='text'
                            value={inputData.tahunAjaran}
                            invalid={validation.tahunAjaran !== "" && true}
                            onChange={(e) => {
                                setValidation({ ...validation, tahunAjaran: "" })
                                setInputData({ ...inputData, tahunAjaran: e.target.value })
                            }} placeholder='Tahun Ajaran' />
                    </Col>
                    <Col md={4} className='mb-md-0 mb-1'>
                        <Label className='form-label'>
                            Keterangan
                        </Label>
                        <Input type='text'
                            value={inputData.keterangan}
                            onChange={(e) => {
                                setInputData({ ...inputData, keterangan: e.target.value })
                            }} placeholder='Keterangan' />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                        <Label className='form-label' >
                            Status
                        </Label>
                        <div className='form-check form-switch'>
                            <Input
                                type='switch'
                                name='customSwitch'
                                id='exampleCustomSwitch'
                                checked={inputData.status}
                                onChange={(e) => {
                                    setInputData({ ...inputData, status: e.target.checked })
                                }} />
                        </div>
                    </Col>
                    <Col md={3} className='mt-2'>
                        <Button disabled={loading} onClick={() => onSubmit()} color='primary' className='text-nowrap px-1' style={{ marginRight: "10px" }}>
                            {loading ? <><Spinner size={'sm'} /> Loading </> : isEdit ? <span>Update</span> : <span>Simpan</span>}
                        </Button>
                        {isEdit &&
                            <Button disabled={loading} onClick={() => handleReset()} color='danger' outline className='text-nowrap px-1'>
                                {loading ? <><Spinner size={'sm'} /> Loading </> : <span>Batal</span>}
                            </Button>
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <Row className=''>
                    <Col lg='3' md='6' className='mb-1 justify-content-end align-items-end'>
                        <Label className='form-label' for='cari'>
                            Filter:
                        </Label>
                        <Input id='cari' placeholder='Filter...' onChange={(e) => handleFilterData(e)} />
                    </Col>
                    <Col md={12} sm={12}>
                        <div className='react-dataTable'>
                            <DataTable
                                noHeader
                                pagination
                                data={searchValue.length ? filteredData : data}
                                columns={columns}
                                className='react-dataTable'
                                sortIcon={<Icon.ChevronDown size={10} />}
                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                expandableRows
                                expandableRowsComponent={ExpandedComponent}
                                expandableRowExpanded={(row) => (row === currentRow ? 1 : 0)}
                                expandOnRowClicked
                                onRowClicked={(row) => setCurrentRow(row)}
                                onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        <Modal backdrop={'static'} centered isOpen={addModal}>
            <ModalHeader toggle={() => handleSetModal()}>Tambah Master Bayaran</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={12} sm={12}>
                        <Label>Tahun Ajaran</Label>
                        <Select
                            className={classnames('react-select', { 'is-invalid': validation.idTahunAjaran !== "" })}
                            classNamePrefix='select'
                            options={tahunAjar}
                            isClearable={false}
                            value={tahunAjar && tahunAjar.find(item => item.value === inputData.idTahunAjaran)}
                            onChange={(e) => setInputData({ ...inputData, idTahunAjaran: e.value })}
                        />
                    </Col>
                    <Col md={12} sm={12} className={"mt-1"}>
                        <Label>Tipe Kelas</Label>
                        <Select
                            className={classnames('react-select', { 'is-invalid': validation.tipeKelas !== "" })}
                            classNamePrefix='select'
                            options={tipeKelas}
                            isClearable={false}
                            value={tipeKelas && tipeKelas.find(item => item.value === inputData.tipeKelas)}
                            onChange={(e) => setInputData({ ...inputData, tipeKelas: e.value })}
                        />
                    </Col>
                    {listBayaran && listBayaran.map((v, i) => {
                        return (
                            <Col md={12} sm={12} key={i} className={"mt-1"}>
                                <Label>{v.label}</Label>
                                <Input type='text'
                                    defaultValue={v.value}
                                    onChange={(e) => {
                                        handleSetData(e.target.value, i)
                                    }}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={() => onSubmit()}>
                    Simpan
                </Button>
                <Button color='danger' outline onClick={() => handleSetModal()}>
                    Batal
                </Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default Index