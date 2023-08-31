import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { useEffect, useState } from 'react'
import { get, post, patch } from '../../../configs/apiService'
import { kelas } from '../../../url'
import { ButtonAction } from '../../component/action'
import { toast } from 'react-toastify'
const TambahKelas = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [inputData, setInputData] = useState({
        idTypeKelas: "",
        namaKelas: "",
        status: true
    })
    const [validation, setValidation] = useState({
        namaKelas: ""
    })
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleEdit = (allData) => {
        setInputData({
            idTypeKelas: allData.id_type,
            namaKelas: allData.nama,
            status: allData.status
        })
        setIsEdit(true)
    }

    const handleDelete = (allData) => {
        console.log(allData)
    }

    const columns = [
        {
            name: 'Nama Kelas',
            sortable: true,
            selector: row => row.nama
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
        get(kelas).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                setData(resp.data.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleReset = () => {
        setInputData({
            idTypeKelas: "",
            namaKelas: "",
            status: true
        })
        setIsEdit(false)
    }

    const onSubmit = () => {
        if (inputData.namaKelas === "") {
            toast.error("Kolom wajib diisi")
            setValidation({ namaKelas: "Field is required" })
        } else {
            setLoading(true)
            if (isEdit) {
                patch(kelas, inputData)
                    .then((resp) => {
                        handleReset()
                        getData()
                        toast.success("Sukses Update Data")
                        console.log(resp)
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error)
                        toast.error("Internal Server Error")
                        setLoading(false)
                    })
            } else {
                post(kelas, inputData)
                    .then((resp) => {
                        handleReset()
                        getData()
                        toast.success("Sukses Menyimpan Data")
                        console.log(resp)
                        setLoading(false)
                    }).catch((error) => {
                        toast.error("Internal Server Error")
                        console.log(error)
                        setLoading(false)
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
                    item.nama.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nama.toLowerCase().includes(value.toLowerCase())

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
                    Data Tipe Kelas
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-1'>
                        <Label className='form-label'>
                            Nama Tipe Kelas
                        </Label>
                        <Input type='text'
                            value={inputData.namaKelas}
                            invalid={validation.namaKelas !== "" && true}
                            onChange={(e) => {
                                setValidation({ ...validation, namaKelas: "" })
                                setInputData({ ...inputData, namaKelas: e.target.value })
                            }} placeholder='Nama Tipe Kelas' />
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

export default TambahKelas