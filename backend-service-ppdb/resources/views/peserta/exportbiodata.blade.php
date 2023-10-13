<html>
<style>
    td {
        font-size: 12px;
    }

    b {
        font-size: 16px;
    }
</style>

<head>
    <title>Undanagan orang tua</title>
</head>

<body style="padding: 1px;">
    <table align="center" cellpadding="1" style="width: 700px;">
        <tbody>
            <tr>
                <td colspan="3">
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 100px;margin-top: auto;margin-bottom: auto;"><img
                                    src="http://smpithayatanthayyibah.sch.id/distFront/image/logo/logo.png"
                                    width="90px" /></td>
                            <td colspan="2">
                                <center>
                                    <img width="250"
                                        src="" ><br />
                                    <b style="font-size: 16px;">YAYASAN AMAL IKHLAS</b><br />
                                    <b style="font-size: 23px; color: #180892;">SMP IT HAYATAN THAYYIBAH</b><br />
                                    <b style="font-size: 16px;">TERAKREDITASI “A” (UNGGUL) NPSN 69953945</b><br />
                                    <span style="font-size: 12px;">Jl. Karamat-Karangtengah, Kel. Karangtengah Kec.
                                        Gunungpuyuh Kota Sukabumi 43124 - JAWA BARAT</span>
                                </center>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <hr />
                </td>
            </tr>
            <tr>
                <td valign="top" colspan="3">
                    <div align="center">
                        <span style="font-size: medium; font-weight: bold;">Formulir Penerimaan Peserta Didik Baru Tahun 2023</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td width="302"></td>
                <td width="343"></td>
                <td width="339"></td>
            </tr>
            <tr>
                <td colspan="3"><b>Registrasi Calon Peserta Didik</b></td>
            </tr>
            <tr>
                <td colspan="3">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="width: 150px;">Jenis Pendaftaran</td>
                                <td style="width: 21px;">:</td>
                                <td>Baru</td>
                            </tr>
                            <tr>
                                <td>Jalur Pendaftaran </td>
                                <td>:</td>
                                <td>Reguler</td>
                            </tr>
                            <tr>
                                <td>Nomor Pendaftaran</td>
                                <td>:</td>
                                <td>{{$biodata->id_registrasi}}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Pendaftaran</td>
                                <td>:</td>
                                <td>{{$biodata->tanggal_daftar}}</td>
                            </tr>
                            <tr>
                                <td>Pilihan I</td>
                                <td>:</td>
                                <td>{{$biodata->pilihan_ii}}</td>
                            </tr>
                            <tr>
                                <td>Pilihan II</td>
                                <td>:</td>
                                <td>{{$biodata->pilihan_ii}}</td>
                            </tr>
                            <tr>
                                <td>Nama Sekolah Asal</td>
                                <td>:</td>
                                <td>{{$biodata->asal_sekolah}}</td>
                            </tr>
                            <tr>
                                <td>Alamat Sekolah Asal</td>
                                <td>:</td>
                                <td>{{$biodata->alamat_asal_sekolah}}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <hr />
                </td>
            </tr>
            <tr>
                <td colspan="3"><b>Biodata Calon Peserta Didik</b></td>
            </tr>
            <tr>
                <td colspan="3">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="width: 150px;">Nama Lengkap</td>
                                <td style="width: 20px;">:</td>
                                <td>{{$biodata->name}}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>:</td>
                                <td>{{$biodata->jenis_kelamin}}</td>
                            </tr>
                            <tr>
                                <td>NISN</td>
                                <td>:</td>
                                <td>{{$biodata->nisn}}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>:</td>
                                <td>{{$biodata->nik}}</td>
                            </tr>
                            <tr>
                                <td>Tempat Lahir</td>
                                <td>:</td>
                                <td>{{$biodata->tempat_lahir}}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>:</td>
                                <td>{{$biodata->tanggal_lahir}}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>:</td>
                                <td>{{$biodata->agama}}</td>
                            </tr>
                            <tr>
                                <td>Kebutuhan Khusus</td>
                                <td>:</td>
                                <td>{{$biodata->kebutuhan_khusus}}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <hr />
                </td>
            </tr>
            <tr>
                <td colspan="3"><b>Alamat</b></td>
            </tr>
            <tr>
                <td colspan="3">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="width: 150px">Alamat Jalan</td>
                                <td style="width: 21px;">:</td>
                                <td>{{$biodata->alamat}}</td>
                            </tr>
                            <tr>
                                <td>RT</td>
                                <td>:</td>
                                <td>{{$biodata->rt}}</td>
                            </tr>
                            <tr>
                                <td>RW</td>
                                <td>:</td>
                                <td>{{$biodata->rw}}</td>
                            </tr>
                            <tr>
                                <td>Dusun</td>
                                <td>:</td>
                                <td>{{$biodata->dusun}}</td>
                            </tr>
                            <tr>
                                <td>Kelurahan / Desa</td>
                                <td>:</td>
                                <td>{{$biodata->kelurahan}}</td>
                            </tr>
                            <tr>
                                <td>Kecamatan</td>
                                <td>:</td>
                                <td>{{$biodata->kecamatan}}</td>
                            </tr>
                            <tr>
                                <td>Kota / Kabupaten</td>
                                <td>:</td>
                                <td>{{$biodata->kota}}</td>
                            </tr>
                            <tr>
                                <td>Kode Pos</td>
                                <td>:</td>
                                <td>{{$biodata->kode_pos}}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{{$biodata->email}}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="3" height="50" valign="top">
                    <div align="justify">
                        <pre><span>Saya yang bertandatangan dibawah ini menyatakan bahwa data yang tertera diatas adalah yang sebenarnya.</span></pre>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="3" height="100" valign="top">
                    <center>
                        <div>Kota Sukabumi, {{$biodata->tanggal_ttd}}</div>
                    </center>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <center>{{$biodata->name}}</center>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="padding-top: 10px;">
                    <hr />
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <b>Info Pembayaran Pendaftaran :</b><br>
                    <b>Nama : {{$biodata->name}}</b><br>
                    <b>Total Biaya Pendaftaran <span style="color: red;">Rp. {{number_format($biaya->biaya_pendaftaran,0,',','.')}} </span> (Total transfer harus
                        sama)</b><br>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <hr />
                </td>
            </tr>
            <tr>
                <td valign="top" colspan="3" style="width: 100%;display: inline-flex;height: 90px;">
                    <span style="width: 433;">Simpanlah lembar pendaftaran ini sebagai bukti pendaftaran Anda.</span>
                    <span style="width: 268px;">Dicetak tanggal {{$biodata->tanggal_ttd}} pukul {{$biodata->jam}}</span>
                </td>
            </tr>
        </tbody>
    </table>
    <table align="center" cellpadding="1" style="width: 700px;" border="1">
        <tbody>
            <tr>
                <td>
                    <center style="font-size: 16px;">
                        Pembayaran bisa langsung di sekolah atau transfer ke : <br />
                        <b>Nomor Rekening</b><br />
                        BANK SYARIAH INDONESIA ex BNIS <br />
                        No : <b>5612225617</b> <br />
                        <b>A.n. Yayasan Al Kautsar 561</b> <br />
                        <!-- **lembar pendaftaran ini beserta konfirmasi pembayaran bisa di kirimkan ke : 08112349561 <br /> -->
                    </center>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>