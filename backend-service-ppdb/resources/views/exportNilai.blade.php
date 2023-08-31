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
                <td colspan='{{ sizeof($colums) }}'></td>
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
                <td style="word-wrap: break-word;">{{ $dt->nisn }}</td>
                <td style="word-wrap: break-word;">Gelombang {{ $dt->gelombang }}</td>
                <td style="word-wrap: break-word;">{{ $dt->namaLengkap }}</td>
                <td style="word-wrap: break-word; text-align: center;">{{ $dt->nilaiAkademik }}</td>
                <td style="word-wrap: break-word; text-align: center;">{{ $dt->nilaiWawancara }}</td>
                <td style="word-wrap: break-word; text-align: center;">{{ $dt->nilaiRapot }}</td>
                <td style="word-wrap: break-word; text-align: center;">{{ strstr($dt->nilaiHasil, '.', true) }}</td>
                <td style="word-wrap: break-word; text-align: center;">{{ $dt->status_kelulusan }}</td>
            </tr>
            @endforeach
            @endif
        </tbody>
    </table>
    
</body>

</html>