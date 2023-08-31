import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { get, post } from '../../../configs/apiService'
import { biaya } from '../../../configs/apiurl'
import { toast } from 'react-toastify'
const styles = {
    fontSize: "12px",
    color: "red"
}

export default function index() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [data, setData] = useState({
        uangPangkal: "",
        biayaPendaftaran: "",
        biayaSeragam: "",
        biayaPendidikan: "",
        danaTahunan: ""
    })
    const [validationData, setValidationData] = useState({
        uangPangkal: "",
        biayaPendaftaran: "",
        biayaSeragam: "",
        biayaPendidikan: "",
        danaTahunan: "",
        keterangan: ""
    })
    const [loading, setLoading] = useState(false)

    const onEditorStateChange = (value) => {
        setEditorState(value)
        setValidationData({
            ...validationData,
            keterangan: ""
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        const { uangPangkal, biayaPendaftaran, biayaSeragam, biayaPendidikan, danaTahunan } = data
        const sendData = {
            uangPangkal,
            biayaPendaftaran,
            biayaSeragam,
            biayaPendidikan,
            danaTahunan,
            keterangan: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        post(biaya, sendData).then((res) => {
            if (res.data && res.data.response && res.data.response.status) {
                toast.success(res.data.response.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const handleValidasi = () => {
        if (data.uangPangkal === "" ||
            data.biayaPendaftaran === "" ||
            data.biayaSeragam === "" ||
            data.biayaPendidikan === "" ||
            data.danaTahunan === "") {
            setValidationData({
                uangPangkal: data.uangPangkal === "" && "Kolom harus diisi",
                biayaPendaftaran: data.biayaPendaftaran === "" && "Kolom harus diisi",
                biayaSeragam: data.biayaSeragam === "" && "Kolom harus diisi",
                biayaPendidikan: data.biayaPendidikan === "" && "Kolom harus diisi",
                danaTahunan: data.danaTahunan === "" && "Kolom harus diisi",
                keterangan: editorState.getCurrentContent().getPlainText().length < 1 && "Kolom harus diisi"
            })
            console.log(editorState.getCurrentContent().getPlainText().length)
        } else {
            handleSubmit()
        }
    }

    const getDetail = () => {
        setLoading(true)
        get(biaya).then((res) => {
            if (res.data && res.data.data) {
                const dataBiaya = res.data.data
                setData({
                    uangPangkal: dataBiaya.uang_pangkal,
                    biayaPendaftaran: dataBiaya.biaya_pendaftaran,
                    biayaSeragam: dataBiaya.biaya_seragam,
                    biayaPendidikan: dataBiaya.biaya_pendidikan,
                    danaTahunan: dataBiaya.dana_tahunan
                })
                if (dataBiaya.keterangan !== null && dataBiaya.keterangan !== "") {
                    const html = dataBiaya.keterangan
                    const contentBlock = htmlToDraft(html)
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                        const editorState = EditorState.createWithContent(contentState)
                        onEditorStateChange(editorState)
                    }
                }
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <Row>
                <Col md={12} sm={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Biaya
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={2} sm={12}>
                                    <Label>Uang Pangkal</Label>
                                    <Input type='text'
                                        className={validationData.uangPangkal.length > 0 && 'is-invalid'}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                uangPangkal: e.target.value
                                            })
                                            setValidationData({
                                                ...validationData,
                                                uangPangkal: ""
                                            })
                                        }}
                                        value={data.uangPangkal} />
                                    <Label style={styles}>{validationData.uangPangkal}</Label>
                                </Col>
                                <Col md={2} sm={12}>
                                    <Label>Biaya Pendaftaran</Label>
                                    <Input type='text'
                                        className={validationData.biayaPendaftaran.length > 0 && 'is-invalid'}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                biayaPendaftaran: e.target.value
                                            })
                                            setValidationData({
                                                ...validationData,
                                                biayaPendaftaran: ""
                                            })
                                        }}
                                        value={data.biayaPendaftaran} />
                                    <Label style={styles}>{validationData.biayaPendaftaran}</Label>
                                </Col>
                                <Col md={2} sm={12}>
                                    <Label>Biaya Pendidikan</Label>
                                    <Input type='text'
                                        className={validationData.biayaPendidikan.length > 0 && 'is-invalid'}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                biayaPendidikan: e.target.value
                                            })
                                            setValidationData({
                                                ...validationData,
                                                biayaPendidikan: ""
                                            })
                                        }}
                                        value={data.biayaPendidikan} />
                                    <Label style={styles}>{validationData.biayaPendidikan}</Label>
                                </Col>
                                <Col md={2} sm={12}>
                                    <Label>Biaya Seragam</Label>
                                    <Input type='text'
                                        className={validationData.biayaSeragam.length > 0 && 'is-invalid'}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                biayaSeragam: e.target.value
                                            })
                                            setValidationData({
                                                ...validationData,
                                                biayaSeragam: ""
                                            })
                                        }}
                                        value={data.biayaSeragam} />
                                    <Label style={styles}>{validationData.biayaSeragam}</Label>
                                </Col>
                                <Col md={2} sm={12}>
                                    <Label>Data Tahunan</Label>
                                    <Input type='text'
                                        className={validationData.danaTahunan.length > 0 && 'is-invalid'}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                danaTahunan: e.target.value
                                            })
                                            setValidationData({
                                                ...validationData,
                                                danaTahunan: ""
                                            })
                                        }}
                                        value={data.danaTahunan} />
                                    <Label style={styles}>{validationData.danaTahunan}</Label>
                                </Col>
                                <Col className='mt-1' sm={12} md={12}>
                                    <Editor
                                        editorStyle={{
                                            border: "1px solid #EDEBE9",
                                            minHeight: "250px",
                                            maxHeight: "250px"
                                        }}
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                    <Label style={styles}>{validationData.keterangan}</Label>
                                </Col>
                                <Col className='mt-1' md={12} sm={12}>
                                    <Button disabled={loading} color='success' onClick={() => handleValidasi()}>
                                        {loading ? <><Spinner size={"sm"} /> Loading</> : "Simpan"}
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
