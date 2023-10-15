<html>

<head>
    <title>Template Export</title>
    <style>
         table, td, th {
        border: 1px solid black;
        }

        table {
        border-collapse: collapse;
        width: 100%;
        }
    </style>
</head>

<body>
    <table cellpadding="1" cellspacing="1" width="100%">
        <thead>
        @if($colums)
            <tr>
                <td style="word-wrap: break-word; text-align: center; font-weight: bold; font-size: 16px;" colspan='{{ sizeof($colums) }}'>{{ $title }}</td>
            </tr>
            <tr>
                <td colspan='{{ sizeof($colums) }}'>Tanggal Export {{date('Y-m-d H:i:s')}}</td>
            </tr>
            <tr>
                <td colspan='{{ sizeof($colums) }}'></td>
            </tr>
            <tr style="background-color: #C0C0C0;">
            @foreach($colums as $e => $dt)
                <th style="width: 200px;
                    min-width: 200px;
                    max-width: 500px;
                    background-color: #C0C0C0;
                    padding: 5px;">{{ $dt }}</th>
            @endforeach
            </tr>
        </thead>
        @endif
        <tbody>
            @if($listData)
            @foreach($listData as $e => $dt)
            <tr>
                <td style="word-wrap: break-word;">{{ $dt->noRegistrasi }}</td>
                <td style="word-wrap: break-word;">Gelombang {{ $dt->gelombang }}</td>
                <td style="word-wrap: break-word;">{{ $dt->nisn }}</td>
                <td style="word-wrap: break-word;">{{ $dt->asal_sekolah }}</td>
                <td style="word-wrap: break-word;">{{ $dt->nik != null ? strval($dt->nik) : "-" }}</td>
                <td style="word-wrap: break-word;">{{ $dt->namaLengkap }}</td>
                <td style="word-wrap: break-word;">{{ $dt->jenis_kelamin }}</td>
                <td style="word-wrap: break-word;">{{ $dt->tempat_lahir }}, {{ $dt->tanggal_lahir }}</td>
                <td style="word-wrap: break-word;">{{ $dt->nama_ayah }}</td>
                <td style="word-wrap: break-word;">{{ $dt->nama_ibu }}</td>
                <td style="word-wrap: break-word;">{{ $dt->nama_wali }}</td>
                <td style="word-wrap: break-word;">{{ $dt->pekerjaan_ayah }}</td>
                <td style="word-wrap: break-word;">{{ $dt->pekerjaan_ibu }}</td>
                <td style="word-wrap: break-word;">{{ $dt->pendidikan_ayah }}</td>
                <td style="word-wrap: break-word;">{{ $dt->pendidikan_ibu }}</td>
                <td style="word-wrap: break-word;">{{ $dt->penghasilan_ortu }}</td>
                <td style="word-wrap: break-word;">{{ $dt->alamat }}</td>
                <td style="word-wrap: break-word;">{{ $dt->rt }}</td>
                <td style="word-wrap: break-word;">{{ $dt->rw }}</td>
                <td style="word-wrap: break-word;">{{ $dt->dusun }}</td>
                <td style="word-wrap: break-word;">{{ $dt->kelurahan }}</td>
                <td style="word-wrap: break-word;">{{ $dt->kecamatan }}</td>
                <td style="word-wrap: break-word;">{{ $dt->kota }}</td>
                <td style="word-wrap: break-word;">{{ $dt->kode_pos }}</td>
            </tr>
            @endforeach
            @endif
        </tbody>
    </table>
    
</body>

</html>