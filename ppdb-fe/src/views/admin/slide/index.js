import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Media, Row } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { get, patch, post } from '../../../configs/apiService'
import { BASE_API_IMAGE } from '../../../configs/config'
import ButtonAction from "../../../component/TableButton"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export default function index() {
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState({
        type: "slide",
        name: "",
        image: "",
        imageType: "",
        isUpload: false
    })
    const getList = (type) => {
        get(`/image-list?type=${type}`)
            .then((res) => {
                const data = []
                if (res && res.data && res.data.data) {
                    const datas = res.data.data
                    if (datas.length > 0) {
                        datas.forEach(value => {
                            data.push({
                                uuid: value.uuid,
                                image: value.image,
                                name: value.name,
                                createdAt: value.created_at,
                                updatedAt: value.updated_at
                            })
                        })
                        setData(data)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    const onEdit = (value) => {
        setIsEdit(true)
        setFormData({
            type: formData.type,
            image: value.image,
            imageType: "",
            name: value.name,
            isUpload: false,
            uuid: value.uuid
        })
    }

    const onDelete = (value) => {
        console.log(value)
        MySwal.fire({
            title: '',
            text: `Apakah anda yakin akan menghapus foto?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                const deleteData = patch("/image-list", { uuid: value.uuid })
                deleteData.then(function (response) {
                    if (response.data.response.status) {
                        getList(formData?.type === 'eskul' ? 2 : 1)
                        toast.success("Berhasil Menghapus Data")
                    } else {
                        toast.error("Gagal Menghapus Data")
                    }
                })
            }
        })
    }

    const columsSlide = [
        {
            name: 'Image',
            sortable: true,
            selector: (row) => <Media src={`${BASE_API_IMAGE}/${row.image}`} width="250" />
        },
        {
            name: 'Dibuat Pada',
            sortable: true,
            selector: (row) => row.createdAt
        },
        {
            name: 'Diupdate Pada',
            sortable: true,
            selector: (row) => row.updatedAt
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => <ButtonAction allData={row} buttonEdit={formData.type === "eskul" ? 1 : 0} buttonDelete={true} onEdit={onEdit} onDelete={onDelete} />
        }
    ]

    const columsEskul = [
        {
            name: 'Image',
            sortable: true,
            selector: (row) => <Media src={`${BASE_API_IMAGE}/${row.image}`} width="250" />
        },
        {
            name: 'Nama Ekstrakulikuler',
            sortable: true,
            selector: (row) => row.name
        },
        {
            name: 'Dibuat Pada',
            sortable: true,
            selector: (row) => row.createdAt
        },
        {
            name: 'Diupdate Pada',
            sortable: true,
            selector: (row) => row.updatedAt
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => <ButtonAction allData={row} buttonEdit={formData.type === "eskul" ? 1 : 0} buttonDelete={true} onEdit={onEdit} onDelete={onDelete} />
        }
    ]

    const [formDataValidasi, setFormDataValidasi] = useState({
        image: "",
        name: ""
    })

    const onReset = () => {
        setIsEdit(false)
        setFormData({
            type: formData.type,
            image: "",
            imageType: "",
            name: "",
            isUpload: false,
            uuid: ""
        })
        setFormDataValidasi({
            image: "",
            name: ""
        })
    }

    const onSubmit = () => {
        if ((formData.type === "slide" && formData.image === "")) {
            setFormDataValidasi({
                // name: formData.name === "" ? "Field Tidak Boleh Kosong" : "",
                image: formData.image === "" ? "Gambar Tidak Boleh Kosong" : ""
            })
        } else if (formData.type === "eskul" && formData.image === "" && formData.name === "") {
            setFormDataValidasi({
                name: formData.name === "" ? "Field Tidak Boleh Kosong" : "",
                image: formData.image === "" ? "Gambar Tidak Boleh Kosong" : ""
            })
        } else {
            if (!isEdit) {
                post("/uploadImage", JSON.stringify(formData))
                    .then((res) => {
                        if (res) { }
                        onReset()
                        getList(formData?.type === 'eskul' ? 2 : 1)
                        toast.success("Berhasil Menyimpan Data")
                    }).catch((err) => {
                        console.log(err)
                        toast.error("Gagal Menyimpan Data")
                    })
            } else {
                patch(`/uploadImage?uuid=${formData.uuid}`, JSON.stringify(formData))
                    .then((res) => {
                        if (res) { }
                        onReset()
                        getList(formData?.type === 'eskul' ? 2 : 1)
                        toast.success("Berhasil Menyimpan Data")
                    }).catch((err) => {
                        console.log(err)
                        toast.error("Gagal Menyimpan Data")
                    })
            }
        }
    }

    const fileSelectedHandler = (evt) => {
        const reader = new FileReader()
        const file = evt.target.files[0]
        const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
        const format = formatter.toLowerCase()
        if (format === ".jpg" || format === "jpeg" || format === ".png") {
            reader.onload = function (upload) {
                setFormData({
                    ...formData,
                    image: upload.target.result,
                    imageType: format,
                    isUpload: true
                })
            }
            reader.readAsDataURL(file)
        } else {
            toast.warning("Format gambar hanya bisa jpg, Jpeg dan png")
        }
    }

    useEffect(() => {
        if (window.location.pathname && window.location.pathname.includes("ekstrakulikuler")) {
            setFormData({
                ...formData,
                type: "eskul"
            })
            getList(2)
        } else {
            getList(1)
        }
    }, [])
    return (
        <Row>
            <Col lg={12} md={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pengaturan {formData.type === "eskul" ? "Ekstrakulikuler" : "Slide"}
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {formData.type === "eskul" &&
                                <Col lg={6} md={6} sm={12}>
                                    <Label>Nama Slide</Label>
                                    <Input type='text' placeholder='Nama' value={formData.name}
                                        className={formDataValidasi.name !== "" && "is-invalid"}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                name: e.target.value
                                            })
                                        }}
                                    />
                                </Col>
                            }
                            <Col lg={6} md={6} sm={12}>
                                <Label>Pilih File</Label>
                                <Input type='file' id='exampleCustomFileBrowser' name='customFile'
                                    className={formDataValidasi.image !== "" && "is-invalid"}
                                    onChange={fileSelectedHandler}
                                />
                            </Col>
                            <Col lg={12} md={12} sm={12} className="mt-1">
                                <Label>Preview</Label><br />
                                <Media
                                    className=""
                                    object
                                    src={isEdit && !formData.isUpload ? `${BASE_API_IMAGE}/${formData.image}` : formData.image !== "" ? formData.image : ""}
                                    alt="Preview"
                                    width="150px"
                                    height="150px"
                                />
                            </Col>
                            <Col lg={12} md={12} sm={12} className="mt-1">
                                <Button color='success'
                                    onClick={() => onSubmit()}
                                    size='sm'>Simpan</Button> <Button className='ml-2' onClick={() => onReset()} color='danger' size='sm'>Reset</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={12} md={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            List Slide
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <DataTable columns={formData.type === "eskul" ? columsEskul : columsSlide} data={data} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
