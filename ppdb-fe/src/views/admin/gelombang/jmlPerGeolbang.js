import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, UncontrolledButtonDropdown } from 'reactstrap'
import { get } from '../../../configs/apiService'
import { jumlahPerGelombang } from '../../../configs/apiurl'
// import { BASE_API_DOWNLOAD, CODE_EXPORT_EXCEL } from '../../../configs/config'

export default function jmlPerGeolbang() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const colums = [
        {
            name: 'Gelombang',
            sortable: true,
            selector: row => <div>{row.gelombang}</div>
        },
        {
            name: 'Tahun Ajaran',
            sortable: true,
            selector: row => row.tahun_ajaran
        },
        {
            name: 'Jumlah',
            sortable: true,
            selector: row => row.jumlah
        }
    ]

    const getList = () => {
        setLoading(true)
        get(jumlahPerGelombang)
            .then((resp) => {
                if (resp && resp.data && resp.data.data) {
                    setData(resp.data.data)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getList()
    }, [])
    const handleFilter = (value) => {
        let updatedData = []
        setSearchValue(value)
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
              item.gelombang.toLowerCase().startsWith(value.toLowerCase())
              || item.tahun_ajaran.toLowerCase().startsWith(value.toLowerCase())
              || item.gel.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.gelombang.toLowerCase().startsWith(value.toLowerCase())
              || item.tahun_ajaran.toLowerCase().startsWith(value.toLowerCase())
              || item.gel.toLowerCase().startsWith(value.toLowerCase())
    
            if (startsWith) {
              return startsWith
            } else if (!startsWith && includes) {
              return includes
            } else return null
          })
          setFilteredData(updatedData)
        }
      }
    return (
        <div>
            <Row>
                <Col sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Jumlah Peserta Berdasarkan Gelombang</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className='mt-1' md='6' sm='12'>
                                    {/* <Button size='sm' color='success' onClick={() => setCenteredModal(!centeredModal)}>Upload</Button>
                                    <UncontrolledButtonDropdown size='sm' style={{ marginLeft: "10px" }}>
                                        <DropdownToggle color='info' caret>
                                            Download
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem tag='a' onClick={() => toast.warning("COMING SOON")}>
                                                CSV
                                            </DropdownItem>
                                            <DropdownItem tag='a' target="_blank" href={`${BASE_API_DOWNLOAD}${downloadPeserta}?type=${CODE_EXPORT_EXCEL}`}>
                                                Excel
                                            </DropdownItem>
                                            <DropdownItem tag='a' onClick={() => toast.warning("COMING SOON")}>
                                                Pdf
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown> */}
                                </Col>
                                <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                                    <Label className='me-1' for='search-input'>
                                        Search
                                    </Label>
                                    <Input
                                        className='dataTable-filter mb-50'
                                        type='text'
                                        bsSize='sm'
                                        id='search-input'
                                    value={searchValue}
                                    onChange={(e) => handleFilter(e.target.value)}
                                    />
                                </Col>
                                <DataTable columns={colums} data={searchValue.length ? filterData : data} progressPending={loading} pagination />
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
