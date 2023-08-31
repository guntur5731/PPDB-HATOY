import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { useEffect, useState } from 'react'
import { get, post, patch } from '../../../configs/apiService'
import { tahunAjaran } from '../../../url'
import { ButtonAction } from '../../component/action'
import { toast } from 'react-toastify'
const TambahTahunAjaran = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [inputData, setInputData] = useState({
        idTahunAjaran: "",
        tahunAjaran: "",
        keterangan: "",
        status: true
    })
    const [validation, setValidation] = useState({
        tahunAjaran: ""
    })
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleEdit = (allData) => {
        setInputData({
            idTahunAjaran: allData.id_tahun,
            tahunAjaran: allData.tahun_ajaran,
            keterangan: allData.keterangan,
            status: allData.status
        })
        setIsEdit(true)
    }

    const handleDelete = (allData) => {
        console.log(allData)
    }

    const columns = [
        {
            name: 'Tahun Ajaran',
            sortable: true,
            selector: row => row.tahun_ajaran
        },
        {
            name: 'Keterangan',
            sortable: true,
            selector: row => row.keterangan
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: (row) => {
                let content = ""
                if (row.status === 1) {
                    content = <Badge color='success'>
                        <Icon.Check size={12} className='align-middle' />
                        <span className='align-middle ml-25'>Aktif</span>
                    </Badge>
                } else {
                    content = <Badge color='danger'>
                        <Icon.X size={12} className='align-middle' />
                        <span className='align-middle ml-25'>Tidak Aktif</span>
                    </Badge>
                }
                return (
                    <>{content}</>
                )
            }
        },
        {
            name: 'Aksi',
            allowOverflow: true,
            cell: (row) => {
                return (
                    <ButtonAction allData={row} onEdit={handleEdit} onDelete={handleDelete} />
                )
            }
        }
    ]

    const getData = () => {
        get(tahunAjaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                setData(resp.data.data)
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

    const onSubmit = () => {
        if (inputData.tahunAjaran === "") {
            toast.error("Kolom wajib diisi")
            setValidation({ tahunAjaran: "Field is required" })
        } else {
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
                post(tahunAjaran, inputData)
                    .then((resp) => {
                        handleReset()
                        getData()
                        toast.success("Sukses Menyimpan Data")
                        console.log(resp)
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
    return (<>
        <Card>
            <CardHeader>
                <CardTitle>
                    Data Tahun Ajaran
                </CardTitle>
            </CardHeader>
            <CardBody>
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
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default TambahTahunAjaran