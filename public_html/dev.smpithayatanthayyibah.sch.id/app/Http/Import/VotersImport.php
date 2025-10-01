<?php

namespace App\Http\Import;

class VotersImport 
{
    
    private $setStartRow = 1;
   
    public function setStartRow($setStartRow){
        $this->setStartRow = $setStartRow;
    }

    public function startRow() : int{
        return $this->setStartRow;
   }
}
