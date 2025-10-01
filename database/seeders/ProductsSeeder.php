<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            "B . J . R . SELVA S . A . C . (20601638143)",
            "CASA DE LA BICICLETA E.I.R.L. (20309418027)",
            "CASA DEL REPUESTO S.A.C. (20283394370)",
            "CHINA YANG ZU S.A.C. (20392656562)",
            "CORPORACION BJR IMPORT SUR S.A.C. (20536579746)",
            "CORPORACION CAYMAN S.A.C. (20493190611)",
            "GRUPO DELTA SELVA S.A.C. (20603603223)",
            "HAOJIN SELVA S.A.C. (20612922722)",
            "LUBRICANTES DE ALTURA S.A.C. (20496651481)",
            "MADESEL S.A.C. (20393093782)",
            "MOTO REPUESTOS & AB SOC. ANONIMA CERRADA (20441097604)",
            "NOR OIL SAC (20480880154)",
            "ORIENTE IMPORT DEL PERU S.R.L. (20101453414)",
            "REPRESENTACIONES TECNIMOTORS E.I.R.L. (20100990998)",
            "REPUESTOS new LID S.R.L. (20479378763)",
            "SOCOPUR S.A.C. (20128967606)",
            "SUMINISTROS DEL ORIENTE S.R.L. (20404493885)",
            "SUSY IMPORT E.I.R.L. (20393997681)",
            "TOTAL IMPORT & EXPORT S.R.L. (20393377381)",
            "VISTONY COMPAÑIA INDUSTRIAL DEL PERU SOCIEDAD ANONIMA CERRADA (20102306598)",
            "VOLDA ORIENTE S.A.C. (20611786922)"
        ];

        $products = [
            [
                'code' => 'CH274',
                'name' => '3000 ACEITE MOTOR 20W50 12X1L MI',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '23.00',
                'price' => '265.00'
            ],
            [
                'code' => 'CH275',
                'name' => '3000 ACEITE MOTOR 20W50 1L MI',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '152.00',
                'price' => '23.00'
            ],
            [
                'code' => 'CH276',
                'name' => '5100 ACEITE MOTOR 15W50 12X1L TS',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '23.00',
                'price' => '346.00'
            ],
            [
                'code' => 'CH277',
                'name' => '5100 ACEITE MOTOR 15W50 1L TS',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '213.00',
                'price' => '32.00'
            ],
            [
                'code' => 'CH278',
                'name' => '5100 ACEITE MOTOR 20W50 1L TS',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '3.00',
                'price' => '32.00'
            ],
            [
                'code' => 'CH270',
                'name' => '7100 ACEITE MOTOR 10W40 1L FS',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '9.00',
                'price' => '48.00'
            ],
            [
                'code' => 'CH219',
                'name' => '7100 ACEITE MOTOR 20W50 12X1L FS',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '71.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH41',
                'name' => '7100 ACEITE MOTOR 20W50 1L FS',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOTUL',
                'stock' => '18.00',
                'price' => '48.00'
            ],
            [
                'code' => 'CH108',
                'name' => 'ACEITE BJR 20W 50 ACEITE MOTOR MIN 1.5L',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'BJR',
                'stock' => '399.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH319',
                'name' => 'ACEITE LUBRICANTE 4T LUBRIPOWER 20W50 12X1L',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'HONDA',
                'stock' => '9.00',
                'price' => '220.00'
            ],
            [
                'code' => 'CH318',
                'name' => 'ACEITE LUBRICANTE 4T LUBRIPOWER 20W50 1L',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'HONDA',
                'stock' => '12.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH94',
                'name' => 'ACELERADOR RAPIDO',
                'unid' => 'UNIDAD',
                'category' => 'ACELERADORES',
                'brand' => 'KIGCOL',
                'stock' => '0.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH204',
                'name' => 'ADORNO BARRA BRS-8A BLANCO CH',
                'unid' => 'PAR',
                'category' => 'ADORNOS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH205',
                'name' => 'ADORNO BARRA BRS-8A NEGRO CH',
                'unid' => 'PAR',
                'category' => 'ADORNOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH18',
                'name' => 'ADORNOS BARRA BRS-8A ROJO CH',
                'unid' => 'PAR',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '6.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH177',
                'name' => 'AMORTIGUADOR CG125 310MM',
                'unid' => 'UNIDAD',
                'category' => 'AMORTIGUADORES',
                'brand' => 'VOLDA',
                'stock' => '34.00',
                'price' => '58.00'
            ],
            [
                'code' => 'CH173',
                'name' => 'AMORTIGUADOR RESORTE POST. 34.50CM ZS125L',
                'unid' => 'UNIDAD',
                'category' => 'AMORTIGUADORES',
                'brand' => 'ZONGSHEN',
                'stock' => '237.00',
                'price' => '75.00'
            ],
            [
                'code' => 'CH384',
                'name' => 'ARO 1.60-19 R DELT. BRS. F/DISCO CH',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '195.00'
            ],
            [
                'code' => 'CH346',
                'name' => 'ARO 1.60-21 R DELT. G150Y F/DISCO COMP.',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '6.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH197',
                'name' => 'ARO 2.15-17 R POST X150R ARMADO',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '29.00',
                'price' => '320.00'
            ],
            [
                'code' => 'CH347',
                'name' => 'ARO 2.15-17R POST. BROSS ARMADO',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '280.00'
            ],
            [
                'code' => 'CH348',
                'name' => 'ARO 2.15-17R POST. X150R ARMADO',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '8.00',
                'price' => '295.00'
            ],
            [
                'code' => 'CH162',
                'name' => 'ARO ACERO ATV 5/PERNOS PLATA CH',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '19.00',
                'price' => '100.00'
            ],
            [
                'code' => 'CH198',
                'name' => 'ARO ALUM. 1.60-18 DELT. EST. PLATA CH',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'SUMOTO',
                'stock' => '40.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH366',
                'name' => 'ARO ALUM. 1.60-21 NEGRO CH',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH24',
                'name' => 'ARO ALUM. 160-18 DELT. EST. VERDE KL',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '170.00'
            ],
            [
                'code' => 'CH138',
                'name' => 'ARO ALUM. 160-18 DELT. EST. XW150 A/SIN CAM.',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '95.00',
                'price' => '190.00'
            ],
            [
                'code' => 'CH365',
                'name' => 'ARO ALUM. 2.15-18 NEGRO CH',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH211',
                'name' => 'ARO ALUMINIO 2.15-18 C/CALCOMANIA NEGRO/ROJO',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'BJR',
                'stock' => '1.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH317',
                'name' => 'ARO CARGUERO 450*12 4 HUECOS',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'VOLDA',
                'stock' => '8.00',
                'price' => '55.00'
            ],
            [
                'code' => 'CH152',
                'name' => 'ARO CARGUERO 500*12 4 HUECOS',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'VOLDA',
                'stock' => '35.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH316',
                'name' => 'ARO DELANTERO RAYOS C/DISCO 1.6*21 BROSS',
                'unid' => 'SET',
                'category' => 'AROS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '160.00'
            ],
            [
                'code' => 'CH169',
                'name' => 'ARO POST. S/LLANTA 18X1.85 + TAPA FRENO POST. COMP. ZS125-S F',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'ZONGSHEN',
                'stock' => '52.00',
                'price' => '190.00'
            ],
            [
                'code' => 'CH58',
                'name' => 'ARO POSTERIOR RAYOS 2.15*18 BROSS',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'VOLDA',
                'stock' => '2.00',
                'price' => '230.00'
            ],
            [
                'code' => 'CH213',
                'name' => 'ARO SOLO ALUMINIO NEGRO 1.60-21',
                'unid' => 'UNIDAD',
                'category' => 'AROS',
                'brand' => 'KIGCOL',
                'stock' => '1.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH260',
                'name' => 'ASIENTO 110C CH',
                'unid' => 'UNIDAD',
                'category' => 'ASIENTOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH206',
                'name' => 'ASIENTO BRS-8B CH',
                'unid' => 'UNIDAD',
                'category' => 'ASIENTOS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH223',
                'name' => 'ASIENTO CRF230 2015 ROJO',
                'unid' => 'UNIDAD',
                'category' => 'ASIENTOS',
                'brand' => 'BJR',
                'stock' => '3.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH320',
                'name' => 'ASIENTO X125TZ',
                'unid' => 'UNIDAD',
                'category' => 'ASIENTOS',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '80.00'
            ],
            [
                'code' => 'CH116',
                'name' => 'BARRA TELES. SOLA CB110 - F/DISCO 30MM-12MM LARGO 73CM',
                'unid' => 'SET',
                'category' => 'BARRAS',
                'brand' => 'YANG ZU',
                'stock' => '2.00',
                'price' => '200.00'
            ],
            [
                'code' => 'CH367',
                'name' => 'BARRA TIMON AJUSTABLE NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH333',
                'name' => 'BARRAS 200X HNDF/DISCO C/T Y BASE',
                'unid' => 'SET',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '450.00'
            ],
            [
                'code' => 'CH64',
                'name' => 'BARRAS BRS/BRS 8B SOLAS CH',
                'unid' => 'PAR',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '6.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH15',
                'name' => 'BARRAS G125L SOLAS',
                'unid' => 'PAR',
                'category' => 'BARRAS',
                'brand' => 'SUMOTO',
                'stock' => '127.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH192',
                'name' => 'BARRAS G125L/XW150 SOLAS (EJE 15MM GRUESO) CH',
                'unid' => 'PAR',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '77.00',
                'price' => '125.00'
            ],
            [
                'code' => 'CH25',
                'name' => 'BARRAS MTF TW-056 50MM C/YUGO C/RODAJES',
                'unid' => 'KIT',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '0.00',
                'price' => '390.00'
            ],
            [
                'code' => 'CH321',
                'name' => 'BARRAS MTF ZS 50MM C/YUGO COMP CH',
                'unid' => 'SET',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '8.00',
                'price' => '400.00'
            ],
            [
                'code' => 'CH382',
                'name' => 'BARRAS X150RL/ X190RL C/YUGO',
                'unid' => 'SET',
                'category' => 'BARRAS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '280.00'
            ],
            [
                'code' => 'CH33',
                'name' => 'BATERIA 12N5-3B AGM',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '28.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH34',
                'name' => 'BATERIA 12N7A-3A AGM',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '68.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH304',
                'name' => 'BATERIA 6QW28-21AH',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '0.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH380',
                'name' => 'BATERIA IGEL 12N5L-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '0.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH01',
                'name' => 'BATERIA IGEL 12N7BL-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '288.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH158',
                'name' => 'BATERIA IGEL 12N7L-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '26.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH379',
                'name' => 'BATERIA IGEL 12N9-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '0.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH281',
                'name' => 'BATERIA IGEL YTX5L-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '60.00',
                'price' => '40.00'
            ],
            [
                'code' => 'CH66',
                'name' => 'BATERIA IGEL YTX7L-BS-SI',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '60.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH79',
                'name' => 'BATERIA YTX5L-BS AGM',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '27.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH78',
                'name' => 'BATERIA YTX7L-BS AGM',
                'unid' => 'UNIDAD',
                'category' => 'BATERIAS',
                'brand' => 'SFX',
                'stock' => '26.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH350',
                'name' => 'BENDIX C200G C/PIÑON',
                'unid' => 'SET',
                'category' => 'BENDIXS',
                'brand' => 'RCC',
                'stock' => '59.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH322',
                'name' => 'BOBINA C125G C/CAPUCHON',
                'unid' => 'UNIDAD',
                'category' => 'BOBINAS',
                'brand' => 'RCC',
                'stock' => '47.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH251',
                'name' => 'BOBINA DE ALTA UNIVERSAL',
                'unid' => 'UNIDAD',
                'category' => 'BOBINAS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH139',
                'name' => 'BOBINA RACING HOT PARTS UNIVERSAL',
                'unid' => 'UNIDAD',
                'category' => 'BOBINAS',
                'brand' => 'VISTONY',
                'stock' => '2.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH57',
                'name' => 'BOCAMAZA DELT. XR150L C/RODAJES',
                'unid' => 'UNIDAD',
                'category' => 'BOCAMAZAS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH309',
                'name' => 'BOCAMAZA PORTERIOR HONDA XR150L COMPLETO',
                'unid' => 'UNIDAD',
                'category' => 'BOCAMAZAS',
                'brand' => 'NIZUMI',
                'stock' => '5.00',
                'price' => '170.00'
            ],
            [
                'code' => 'CH70',
                'name' => 'BOMBA DE FRENO YAMAHA XTZ125',
                'unid' => 'UNIDAD',
                'category' => 'BOMBAS',
                'brand' => 'NIZUMI',
                'stock' => '3.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH140',
                'name' => 'BRIDA CARBURADOR CRF230',
                'unid' => 'UNIDAD',
                'category' => 'BRIDAS',
                'brand' => 'DEMTEC',
                'stock' => '1.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH141',
                'name' => 'BRIDA CARBURADOR XR200',
                'unid' => 'UNIDAD',
                'category' => 'BRIDAS',
                'brand' => 'DEMTEC',
                'stock' => '1.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH44',
                'name' => 'BRIDA DE CARBURADOR CG125/150',
                'unid' => 'UNIDAD',
                'category' => 'BRIDAS',
                'brand' => 'VOLDA',
                'stock' => '12.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH85',
                'name' => 'BRIDA DE CARBURADOR CG200/BROSS',
                'unid' => 'UNIDAD',
                'category' => 'BRIDAS',
                'brand' => 'VOLDA',
                'stock' => '2.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH35',
                'name' => 'BUJIA NGK BR BM7A MOTOSIERRAS',
                'unid' => 'UNIDAD',
                'category' => 'BUJIAS',
                'brand' => 'NGK',
                'stock' => '30.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH67',
                'name' => 'BUJIA NGK BR C7HSA MOTOS C50/C70/ ST70/CD100',
                'unid' => 'UNIDAD',
                'category' => 'BUJIAS',
                'brand' => 'NGK',
                'stock' => '188.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH296',
                'name' => 'BUJIA NGK BR DP8EA-9',
                'unid' => 'UNIDAD',
                'category' => 'BUJIAS',
                'brand' => 'NGK',
                'stock' => '1194.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH268',
                'name' => 'CABLE ACELERADOR BROSS',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'KIGCOL',
                'stock' => '50.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH305',
                'name' => 'CABLE ACELERADOR WAVE 100-110 76CM',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'VOLDA',
                'stock' => '50.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH310',
                'name' => 'CABLE DE SEGURIDAD 18*1.5M CON LLAVE T/CARRO',
                'unid' => 'SET',
                'category' => 'CABLES',
                'brand' => 'VOLDA',
                'stock' => '5.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH54',
                'name' => 'CABLE DE SEGURIDAD 20*1.5M CON LLAVE T/CARRO',
                'unid' => 'SET',
                'category' => 'CABLES',
                'brand' => 'VOLDA',
                'stock' => '3.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH377',
                'name' => 'CABLE DE SEGURIDAD 20*2M CON LLAVE T/CARRO',
                'unid' => 'SET',
                'category' => 'CABLES',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH349',
                'name' => 'CABLE EMBRAGUE C125G',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'RCC',
                'stock' => '179.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH356',
                'name' => 'CABLE EMBRAGUE G125L C/F Y JEBE',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'RCC',
                'stock' => '165.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH199',
                'name' => 'CABLE EMBRAGUE MTF LARGO CH',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'RCC',
                'stock' => '99.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH95',
                'name' => 'CABLE EMBRAGUE SOLO 2MMX1.8M EC',
                'unid' => 'UNIDAD',
                'category' => 'CABLES',
                'brand' => 'BJR',
                'stock' => '488.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH96',
                'name' => 'CADENA 428H-150L',
                'unid' => 'UNIDAD',
                'category' => 'CADENAS',
                'brand' => 'BJR',
                'stock' => '450.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH39',
                'name' => 'CADENA ARRASTRE 428-114L',
                'unid' => 'UNIDAD',
                'category' => 'CADENAS',
                'brand' => 'SFX',
                'stock' => '78.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH07',
                'name' => 'CADENA ARRASTRE 428H-150L MTK',
                'unid' => 'UNIDAD',
                'category' => 'CADENAS',
                'brand' => 'SFX',
                'stock' => '1158.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH183',
                'name' => 'CAJ06 LIQUIDO PARA RADIADOR VERDE DE 1 GAL',
                'unid' => 'CAJA',
                'category' => 'RADIADORES',
                'brand' => 'VISTONY',
                'stock' => '33.00',
                'price' => '40.00'
            ],
            [
                'code' => 'CH184',
                'name' => 'CAJ06 LIQUIDO PARA RADIADOR VERDE DE 1 GAL',
                'unid' => 'UNIDAD',
                'category' => 'RADIADORES',
                'brand' => 'VISTONY',
                'stock' => '24.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH181',
                'name' => 'CAJ12 TRANSMISION TRANSMEC DUAL GL-4 250X1/4',
                'unid' => 'CAJA',
                'category' => 'TRANSMISIONES',
                'brand' => 'VISTONY',
                'stock' => '26.00',
                'price' => '180.00'
            ],
            [
                'code' => 'CH182',
                'name' => 'CAJ12 TRANSMISION TRANSMEC DUAL GL-4 250X1/4',
                'unid' => 'UNIDAD',
                'category' => 'TRANSMISIONES',
                'brand' => 'VISTONY',
                'stock' => '24.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH71',
                'name' => 'CAJA 20 CRB VISCUS 25W-60 BOLSA',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'CASTROL',
                'stock' => '4.00',
                'price' => '325.00'
            ],
            [
                'code' => 'CH117',
                'name' => 'CAJA DE RETRO 1800CC (FR)(EJE 13X60MM, PUNTA 11MM) C/EJE',
                'unid' => 'SET',
                'category' => 'CAJAS',
                'brand' => 'YANG ZU',
                'stock' => '114.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH42',
                'name' => 'CAJA DE RETROCESO 2000CC REFORZADA CARGUERO 30',
                'unid' => 'KIT',
                'category' => 'CAJAS',
                'brand' => 'VOLDA',
                'stock' => '4.00',
                'price' => '170.00'
            ],
            [
                'code' => 'CH155',
                'name' => 'CAJA FILTRO AIRE BROSS COMPLETO',
                'unid' => 'UNIDAD',
                'category' => 'FILTROS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH306',
                'name' => 'CAJA FILTRO AIRE CARGUERO CURVA',
                'unid' => 'UNIDAD',
                'category' => 'CAJAS',
                'brand' => 'VOLDA',
                'stock' => '10.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH224',
                'name' => 'CAJA RETROCESO CARGUERO (20MM) ECN GRIS',
                'unid' => 'SET',
                'category' => 'CAJAS',
                'brand' => 'KIGCOL',
                'stock' => '24.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH344',
                'name' => 'CAJA RETROCESO MTF 2000CC C/CRUCETA 20MM',
                'unid' => 'UNIDAD',
                'category' => 'CAJAS',
                'brand' => 'RCC',
                'stock' => '47.00',
                'price' => '170.00'
            ],
            [
                'code' => 'CH247',
                'name' => 'CALIPER COMPLETO PARA HONDA XR150L CON DISCO',
                'unid' => 'UNIDAD',
                'category' => 'CALIPER',
                'brand' => 'VOLDA',
                'stock' => '3.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH171',
                'name' => 'CAMARA 17-225/250 HF TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '100.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH32',
                'name' => 'CAMARA 17-275/300 HF TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '600.00',
                'price' => '14.00'
            ],
            [
                'code' => 'CH174',
                'name' => 'CAMARA 18-250/275 HF TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '500.00',
                'price' => '13.00'
            ],
            [
                'code' => 'CH160',
                'name' => 'CAMARA 18-275/300 HF TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '1446.00',
                'price' => '14.00'
            ],
            [
                'code' => 'CH167',
                'name' => 'CAMARA 18X300 TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SFX',
                'stock' => '219.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH77',
                'name' => 'CAMARA 21-275/300 HF TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '75.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH159',
                'name' => 'CAMARA 250/275-17 TR4 TH',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '300.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH76',
                'name' => 'CAMARA 275/300-19 TR4 TH',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '100.00',
                'price' => '17.00'
            ],
            [
                'code' => 'CH03',
                'name' => 'CAMARA 300/350-17 TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SFX',
                'stock' => '89.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH212',
                'name' => 'CAMARA 350/410-18 TR4',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SAFEWAY',
                'stock' => '3.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH80',
                'name' => 'CAMARA 400/450-17 TR4 TH',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '200.00',
                'price' => '21.00'
            ],
            [
                'code' => 'CH81',
                'name' => 'CAMARA 400/450-18 TR4 TH',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'DURO',
                'stock' => '177.00',
                'price' => '24.00'
            ],
            [
                'code' => 'CH372',
                'name' => 'CAMARA 450/500-12',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'CELIMO',
                'stock' => '100.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH13',
                'name' => 'CAMARA 500-12',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'KINGSTONE',
                'stock' => '450.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH142',
                'name' => 'CAMARA 500-12 TR13',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SAFEWAY',
                'stock' => '275.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH185',
                'name' => 'CAMARA TR4 3.50/4.00-18',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SFX',
                'stock' => '30.00',
                'price' => '16.00'
            ],
            [
                'code' => 'CH186',
                'name' => 'CAMARA TR43.50/4.00-17',
                'unid' => 'UNIDAD',
                'category' => 'CAMARAS',
                'brand' => 'SFX',
                'stock' => '30.00',
                'price' => '16.00'
            ],
            [
                'code' => 'CH48',
                'name' => 'CANDADO DE CADENA 428H',
                'unid' => 'UNIDAD',
                'category' => 'CANDADOS',
                'brand' => 'VOLDA',
                'stock' => '100.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH357',
                'name' => 'CARBURADOR C150G',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'SHENG WEY',
                'stock' => '7.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH200',
                'name' => 'CARBURADOR C200G SHEN WEY CH',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH292',
                'name' => 'CARBURADOR CG125',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'NIZUMI',
                'stock' => '5.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH369',
                'name' => 'CARBURADOR CRF230',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '160.00'
            ],
            [
                'code' => 'CH303',
                'name' => 'CARBURADOR CRYPTON MODERNA',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'BJR',
                'stock' => '0.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH375',
                'name' => 'CARBURADOR RACING CORTINA PLANA',
                'unid' => 'SET',
                'category' => 'CARBURADORES',
                'brand' => 'NIZUMI',
                'stock' => '2.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH334',
                'name' => 'CARBURADOR X125TZ/YB125 (2 CABLES) ECO',
                'unid' => 'UNIDAD',
                'category' => 'CARBURADORES',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH201',
                'name' => 'CARDAN CORONA 115CM M/006 20MM MTF',
                'unid' => 'UNIDAD',
                'category' => 'CARDAN',
                'brand' => 'RCC',
                'stock' => '10.00',
                'price' => '75.00'
            ],
            [
                'code' => 'CH289',
                'name' => 'CARENADO COMP. C/TABLER W NEGRO F/HIDR WXAVE 100',
                'unid' => 'SET',
                'category' => 'CARENADOS',
                'brand' => 'D´TIEX',
                'stock' => '1.00',
                'price' => '280.00'
            ],
            [
                'code' => 'CH62',
                'name' => 'CATALINA 110C 36T P/428H',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'RCC',
                'stock' => '27.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH170',
                'name' => 'CATALINA 37T CG125',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'SFX',
                'stock' => '537.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH368',
                'name' => 'CATALINA 38T X250R TNDO(520)',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'RCC',
                'stock' => '20.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH168',
                'name' => 'CATALINA 42T CG125',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'SFX',
                'stock' => '570.00',
                'price' => '9.00'
            ],
            [
                'code' => 'CH05',
                'name' => 'CATALINA 45T CG125',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'SFX',
                'stock' => '145.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH02',
                'name' => 'CATALINA 50T XL185',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'SFX',
                'stock' => '89.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH323',
                'name' => 'CATALINA BRS 42T ACERO 1045 8MM',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'RCC',
                'stock' => '150.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH335',
                'name' => 'CATALINA BRS 50T',
                'unid' => 'UNIDAD',
                'category' => 'CATALINAS',
                'brand' => 'RCC',
                'stock' => '50.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH143',
                'name' => 'CDI C100',
                'unid' => 'UNIDAD',
                'category' => 'CDIS',
                'brand' => 'VEDAMOTOR',
                'stock' => '12.00',
                'price' => '130.00'
            ],
            [
                'code' => 'CH225',
                'name' => 'CDI LF125/CG125/CG150 4T/WX125/CGL125 (CABEZA CUADRADA)',
                'unid' => 'UNIDAD',
                'category' => 'CDIS',
                'brand' => 'CCKAPA',
                'stock' => '10.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH324',
                'name' => 'CHANCHITO ARRANCADOR C125G MODERNA',
                'unid' => 'UNIDAD',
                'category' => 'CHANCHITOS',
                'brand' => 'ZONKO',
                'stock' => '79.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH383',
                'name' => 'CHAPA CONTACTO G125L CH',
                'unid' => 'UNIDAD',
                'category' => 'CHAPAS',
                'brand' => 'RCC',
                'stock' => '50.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH87',
                'name' => 'CHAPA Y TAPA TANQUE BROSS LLAVE LARGA',
                'unid' => 'UNIDAD',
                'category' => 'CHAPAS',
                'brand' => 'VOLDA',
                'stock' => '25.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH311',
                'name' => 'CHASIS BROSS',
                'unid' => 'SET',
                'category' => 'CHASIS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '380.00'
            ],
            [
                'code' => 'CH97',
                'name' => 'CIGUEÑAL C100 CHINAS COMPLETO',
                'unid' => 'SET',
                'category' => 'CIGUEÑALES',
                'brand' => 'KIGCOL',
                'stock' => '16.00',
                'price' => '75.00'
            ],
            [
                'code' => 'CH118',
                'name' => 'CILINDRO A100X COMPLETO',
                'unid' => 'UNIDAD',
                'category' => 'CILINDROS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH98',
                'name' => 'CILINDRO CG150 COMP. INC/KIT BALANCIN ESTRECHO',
                'unid' => 'KIT',
                'category' => 'CILINDROS',
                'brand' => 'KIGCOL',
                'stock' => '118.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH332',
                'name' => 'CINTILLO NEGRO 4.8X40CM PACK X100 UND',
                'unid' => 'SET',
                'category' => 'CINTILLOS',
                'brand' => 'RCC',
                'stock' => '78.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH381',
                'name' => 'CLAXON 12V NEGRO 009 CH',
                'unid' => 'UNIDAD',
                'category' => 'CLAXONS',
                'brand' => 'RCC',
                'stock' => '100.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH293',
                'name' => 'CLAXON DISCO 12V COLOR NEGRO 65MM',
                'unid' => 'UNIDAD',
                'category' => 'CLAXONS',
                'brand' => 'NIZUMI',
                'stock' => '3.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH376',
                'name' => 'COLETA COMPLETA GL NEGRO',
                'unid' => 'SET',
                'category' => 'COLETAS',
                'brand' => 'GDM',
                'stock' => '1.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH385',
                'name' => 'COMANDO CLAXON G125L CH',
                'unid' => 'UNIDAD',
                'category' => 'COMANDOS',
                'brand' => 'SUMOTO',
                'stock' => '100.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH252',
                'name' => 'COMANDO DERECHO / IZQUIERDO GL',
                'unid' => 'KIT',
                'category' => 'COMANDOS',
                'brand' => 'VOLDA',
                'stock' => '18.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH131',
                'name' => 'COMANDO LUCES G125L',
                'unid' => 'UNIDAD',
                'category' => 'COMANDOS',
                'brand' => 'SUMOTO',
                'stock' => '444.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH26',
                'name' => 'CORONA 115CM BOC. 180MM 4/PERNOS SOLA MTF',
                'unid' => 'UNIDAD',
                'category' => 'CORONAS',
                'brand' => 'RCC',
                'stock' => '9.00',
                'price' => '550.00'
            ],
            [
                'code' => 'CH297',
                'name' => 'CORONA COMPLETO 115CM 180/4P 12.38 MTF',
                'unid' => 'UNIDAD',
                'category' => 'CORONAS',
                'brand' => 'D´TIEX',
                'stock' => '6.00',
                'price' => '600.00'
            ],
            [
                'code' => 'CH72',
                'name' => 'CRB VISCUS 25W-60 BOLSA',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'CASTROL',
                'stock' => '6.00',
                'price' => '17.00'
            ],
            [
                'code' => 'CH61',
                'name' => 'CREMALLERA X150R/CBF150 (4P/5D) COMPLETO',
                'unid' => 'SET',
                'category' => 'CREMALLERAS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '145.00'
            ],
            [
                'code' => 'CH99',
                'name' => 'CRUCETA 20X50MM',
                'unid' => 'UNIDAD',
                'category' => 'CRUCETAS',
                'brand' => 'KIGCOL',
                'stock' => '75.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH100',
                'name' => 'CRUCETA 20X55MM',
                'unid' => 'UNIDAD',
                'category' => 'CRUCETAS',
                'brand' => 'KIGCOL',
                'stock' => '75.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH358',
                'name' => 'CRUCETA 55MM-20MM',
                'unid' => 'UNIDAD',
                'category' => 'CRUCETAS',
                'brand' => 'RCC',
                'stock' => '100.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH83',
                'name' => 'DISCO EMBRAGUE 3PZS LF100/110',
                'unid' => 'SET',
                'category' => 'DISCOS EMBRAGUES',
                'brand' => 'COPILLAR',
                'stock' => '10.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH04',
                'name' => 'DISCO EMBRAGUE CB125/CG150 6PZS',
                'unid' => 'UNIDAD',
                'category' => 'DISCOS EMBRAGUES',
                'brand' => 'COPILLAR',
                'stock' => '45.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH215',
                'name' => 'DISCO FRENO XL200 DELANTERO',
                'unid' => 'UNIDAD',
                'category' => 'DISCO FRENO',
                'brand' => 'KIGCOL',
                'stock' => '1.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH16',
                'name' => 'EJE ATAQUE 12T COMPLETO MTF',
                'unid' => 'UNIDAD',
                'category' => 'EJES',
                'brand' => 'RCC',
                'stock' => '45.00',
                'price' => '30.00'
            ],
            [
                'code' => 'CH74',
                'name' => 'EJE DE TRAPECIO BROSS CON TUERCA',
                'unid' => 'UNIDAD',
                'category' => 'EJES',
                'brand' => 'VOLDA',
                'stock' => '9.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH359',
                'name' => 'EJE DELT. MTF 20X32CM CH',
                'unid' => 'UNIDAD',
                'category' => 'EJES',
                'brand' => 'RCC',
                'stock' => '40.00',
                'price' => '17.00'
            ],
            [
                'code' => 'CH386',
                'name' => 'EJE DELT. XW/G125L GRUESO',
                'unid' => 'UNIDAD',
                'category' => 'EJES',
                'brand' => 'RCC',
                'stock' => '50.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH226',
                'name' => 'EJE RUEDA DELANTERO CRF230',
                'unid' => 'SET',
                'category' => 'EJES',
                'brand' => 'DANIDREA',
                'stock' => '3.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH227',
                'name' => 'EJE TRAPECIO CRF230 POSTERIOR (HORQUILLA)',
                'unid' => 'UNIDAD',
                'category' => 'EJES',
                'brand' => 'DANIDREA',
                'stock' => '3.00',
                'price' => '65.00'
            ],
            [
                'code' => 'CH101',
                'name' => 'EMBRAGUE CG150 73T (6P/6D) COMPLETO',
                'unid' => 'KIT',
                'category' => 'EMBRAGUES',
                'brand' => 'KIGCOL',
                'stock' => '40.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH325',
                'name' => 'EMPAQUE COMPLETO C150G',
                'unid' => 'SET',
                'category' => 'EMPAQUES',
                'brand' => 'RCC',
                'stock' => '40.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH255',
                'name' => 'EMPAQUE TUBO ESCAPE 110C BRONCE CH',
                'unid' => 'UNIDAD',
                'category' => 'MECHAS',
                'brand' => 'RCC',
                'stock' => '295.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH326',
                'name' => 'EMPAQUES COMPLETO C200G',
                'unid' => 'SET',
                'category' => 'EMPAQUES',
                'brand' => 'RCC',
                'stock' => '104.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH244',
                'name' => 'ESPEJO ROMBO BROSS HILO NORMAL C/PROTEC JEBE',
                'unid' => 'UNIDAD',
                'category' => 'ESPEJOS',
                'brand' => 'VOLDA',
                'stock' => '5.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH113',
                'name' => 'ESPEJO XR150L HILO IZQUIERDO Y DERECHO',
                'unid' => 'PAR',
                'category' => 'ESPEJOS',
                'brand' => 'VOLDA',
                'stock' => '9.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH256',
                'name' => 'ESPEJOS RECT. MOTOKAR R/L BRAZO LARGO CH',
                'unid' => 'PAR',
                'category' => 'ESPEJOS',
                'brand' => 'RCC',
                'stock' => '18.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH14',
                'name' => 'FARO DE CF230 2019 C/MASCARA BLANCO',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH119',
                'name' => 'FARO DE CF230 2019 C/MASCARA NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH261',
                'name' => 'FARO DEL. CF230 2019 C/MASCARA BLANCO CH',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '5.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH193',
                'name' => 'FARO DEL. LGC125 REDONDO CH',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '157.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH336',
                'name' => 'FARO DEL. X150RL HND/BRS 8E C/MASC. BLANCO',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH114',
                'name' => 'FARO DELANTERO HONDA CHINA',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH90',
                'name' => 'FARO DELANTERO REDONDO L/BLANCA',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'MR&AB',
                'stock' => '591.00',
                'price' => '26.00'
            ],
            [
                'code' => 'CH178',
                'name' => 'FARO DIRECCIONAL BROSS 200',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH120',
                'name' => 'FARO INTERMIT G125L DELT. DER./IZQ.',
                'unid' => 'PAR',
                'category' => 'FAROS',
                'brand' => 'RCC',
                'stock' => '50.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH144',
                'name' => 'FARO PELIGRO XTZ125',
                'unid' => 'UNIDAD',
                'category' => 'FAROS',
                'brand' => 'CCKAPA',
                'stock' => '0.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH354',
                'name' => 'FILTRO ACEITE X250R/C250BX',
                'unid' => 'UNIDAD',
                'category' => 'FILTROS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH337',
                'name' => 'FILTRO AIRE BRS PLASTICO',
                'unid' => 'UNIDAD',
                'category' => 'FILTROS',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH92',
                'name' => 'FILTRO DE AIRE CRF230',
                'unid' => 'UNIDAD',
                'category' => 'FILTROS',
                'brand' => 'VOLDA',
                'stock' => '8.00',
                'price' => '100.00'
            ],
            [
                'code' => 'CH327',
                'name' => 'FILTRO GASOLINA REDONDO C125G',
                'unid' => 'UNIDAD',
                'category' => 'FILTROS',
                'brand' => 'RCC',
                'stock' => '300.00',
                'price' => '9.50'
            ],
            [
                'code' => 'CH207',
                'name' => 'FOCO DELANTERO LED H4 6000K',
                'unid' => 'UNIDAD',
                'category' => 'FOCOS',
                'brand' => 'RCC',
                'stock' => '8.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH355',
                'name' => 'FORRO ASIENTO TIPO MALLA STD NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'MALLAS',
                'brand' => 'RCC',
                'stock' => '5.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH222',
                'name' => 'FRANELA MICROFIBRA',
                'unid' => 'UNIDAD',
                'category' => 'FRANELAS',
                'brand' => 'MOBIL',
                'stock' => '60.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH302',
                'name' => 'GRIFO GASOLINA C125G HILO GRUESO',
                'unid' => 'UNIDAD',
                'category' => 'GRIFOS',
                'brand' => 'VOLDA',
                'stock' => '19.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH133',
                'name' => 'GUARDAF. DELT. G125L C/COLETA',
                'unid' => 'UNIDAD',
                'category' => 'GUARDAFANGOS',
                'brand' => 'SUMOTO',
                'stock' => '8.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH188',
                'name' => 'GUARDAFANGO CB150INVICTA DELANTERO ROJO/NEGRO MATE',
                'unid' => 'UNIDAD',
                'category' => 'GUARDAFANGOS',
                'brand' => 'CCKAPA',
                'stock' => '1.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH179',
                'name' => 'GUARDAFANGO POSTERIOR BROSS',
                'unid' => 'UNIDAD',
                'category' => 'GUARDAFANGOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH216',
                'name' => 'GUARDAFANGO WAVE110 DELANTERO (2 PZAS) NEGRO',
                'unid' => 'SET',
                'category' => 'GUARDAFANGOS',
                'brand' => 'CCKAPA',
                'stock' => '1.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH396',
                'name' => 'KIT ACCES. 110C F/DISC. GUINDA C/FV C/STICKER CH',
                'unid' => 'KIT',
                'category' => 'ACELERADORES',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '500.00'
            ],
            [
                'code' => 'CH134',
                'name' => 'KIT ACCES. 110C-L ROJO C/FV C/STICKER',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '500.00'
            ],
            [
                'code' => 'CH121',
                'name' => 'KIT ACCES. CB110 NEGRO C/FAROS',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH364',
                'name' => 'KIT ACCES. CF230 2019 VERDE/NEGRO C/STICKER CH',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH202',
                'name' => 'KIT ACCES. CF230 2021 C/TANQUE Y ASIENTO ROJO C/STICKER CH',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'RCC',
                'stock' => '7.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH17',
                'name' => 'KIT ACCES. CF230 C/TANQUE Y ASIENTO ROJO C/STICKER',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH123',
                'name' => 'KIT ACCES. CF230 ROJO/BLANCO C/STICKER',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH122',
                'name' => 'KIT ACCES. STM C/FAROS PLATA  C/STICKER',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '300.00'
            ],
            [
                'code' => 'CH397',
                'name' => 'KIT ACCES. WV F/TAMB. ROJO 01 C/FV C/STICKER CH',
                'unid' => 'KIT',
                'category' => 'ACCESORIOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH132',
                'name' => 'KIT ACCES. X150R C/FAROS NEGRO C/STIKER CH',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'RCC',
                'stock' => '10.00',
                'price' => '270.00'
            ],
            [
                'code' => 'CH262',
                'name' => 'KIT ACCES. X150R C/FAROS+VELOC. BLANCO C/STIKER CH',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '320.00'
            ],
            [
                'code' => 'CH203',
                'name' => 'KIT ACCES. YMH X125TZ BLANCO C/FAROS C/STICKER CH',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'RCC',
                'stock' => '0.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH135',
                'name' => 'KIT ARRASTRE 110C COMPLETO',
                'unid' => 'SET',
                'category' => 'ARRASTRES',
                'brand' => 'RCC',
                'stock' => '11.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH351',
                'name' => 'KIT ARRASTRE BRS (50T/17T/428H-132L)',
                'unid' => 'KIT',
                'category' => 'ARRASTRES',
                'brand' => 'RCC',
                'stock' => '20.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH273',
                'name' => 'KIT DE ARRASTRE XR190L 48T-16T 428H-140L',
                'unid' => 'KIT',
                'category' => 'ARRASTRES',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '75.00'
            ],
            [
                'code' => 'CH68',
                'name' => 'KIT DE PLASTICO (18 PZAS) COLOR SAME AS MOTO',
                'unid' => 'UNIDAD',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '300.00'
            ],
            [
                'code' => 'CH218',
                'name' => 'KIT DE PLASTICOS COMPL CRF230 NARANJA/BLANCO',
                'unid' => 'SET',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH283',
                'name' => 'KIT DE PLASTICOS COMPLETO CRF230 AZUL/BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH180',
                'name' => 'KIT DE PLASTICOS COMPLETO CRF230 NEGRO/BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '9.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH22',
                'name' => 'KIT DE PLASTICOS COMPLETO CRF230 ROJO/BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH190',
                'name' => 'KIT DE PLASTICOS DE CRF 2024 COLOR AZUL',
                'unid' => 'SET',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH59',
                'name' => 'KIT DE PLASTICOS DE CRF 2024 COLOR BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH86',
                'name' => 'KIT DE PLASTICOS DE CRF 2024 COLOR NEGRO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH60',
                'name' => 'KIT DE PLASTICOS DE HONDA WAVE 110S C/TABLERO COLOR ROJO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '495.00'
            ],
            [
                'code' => 'CH55',
                'name' => 'KIT DE PLASTICOS XR-150 COLOR ROJO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '9.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH91',
                'name' => 'KIT DE PLASTICOS XR250 TORNADO COLOR BLANCO',
                'unid' => 'UNIDAD',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH172',
                'name' => 'KIT DE PLASTICOS XR250 TORNADO COLOR NEGRO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH285',
                'name' => 'KIT DE PLASTICOS YAMAHA XTZ125 AZUL',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH53',
                'name' => 'KIT DE PLASTICOS YAMAHA XTZ125 BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH145',
                'name' => 'KIT PLASTICOS B200R C/FAROS AZUL',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'KIGCOL',
                'stock' => '0.00',
                'price' => '360.00'
            ],
            [
                'code' => 'CH146',
                'name' => 'KIT PLASTICOS B200R C/FAROS BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'KIGCOL',
                'stock' => '0.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH147',
                'name' => 'KIT PLASTICOS B200R C/FAROS ROJO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'KIGCOL',
                'stock' => '0.00',
                'price' => '360.00'
            ],
            [
                'code' => 'CH228',
                'name' => 'KIT PLASTICOS R1DE CRF230 ROJO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'BIKER',
                'stock' => '1.00',
                'price' => '330.00'
            ],
            [
                'code' => 'CH229',
                'name' => 'KIT PLASTICOS TORNADO250 ROJO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'CCKAPA',
                'stock' => '1.00',
                'price' => '350.00'
            ],
            [
                'code' => 'CH230',
                'name' => 'KIT PLASTICOS WAVE110 C/FAROS BLANCO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'CCKAPA',
                'stock' => '1.00',
                'price' => '400.00'
            ],
            [
                'code' => 'CH189',
                'name' => 'KIT PLASTICOS XTZ150 C/FAROS NEGRO',
                'unid' => 'KIT',
                'category' => 'PLASTICOS',
                'brand' => 'CCKAPA',
                'stock' => '0.00',
                'price' => '450.00'
            ],
            [
                'code' => 'CH209',
                'name' => 'LLANTA 110/90-17 SCORPION EXTRA P153 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '50.00',
                'price' => '130.00'
            ],
            [
                'code' => 'CH210',
                'name' => 'LLANTA 110/90-18 SCORPION EXTRA P153 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '50.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH287',
                'name' => 'LLANTA 130/70 R17 M/C 62P ACR 3105 TL',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'EUROGRIP',
                'stock' => '1.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH69',
                'name' => 'LLANTA 140/70 - 17 6 LONAS TL',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH37',
                'name' => 'LLANTA 2.50-17 (70/90-17) DM-1109 TT 38P',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'DURO',
                'stock' => '6.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH157',
                'name' => 'LLANTA 2.75-17 (80/90-17) DM-1109 TT 44P',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'DURO',
                'stock' => '10.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH208',
                'name' => 'LLANTA 2.75-17 8 LONAS TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'VOLDA',
                'stock' => '2.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH295',
                'name' => 'LLANTA 2.75-18 HF-301E 4PR TT 42P TW',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'DURO',
                'stock' => '99.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH161',
                'name' => 'LLANTA 25/10-12 P332 12PR TL',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '29.00',
                'price' => '280.00'
            ],
            [
                'code' => 'CH30',
                'name' => 'LLANTA 275-17 TRIAL P21 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '95.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH353',
                'name' => 'LLANTA 275-18 P03 4PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '70.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH148',
                'name' => 'LLANTA 3.00-18 47P 4PR EEG DURAGRIP PLUS TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'EUROGRIP',
                'stock' => '70.00',
                'price' => '72.00'
            ],
            [
                'code' => 'CH191',
                'name' => 'LLANTA 3.00-18 HF-307 TRIAL 4PR TT TW',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'DURO',
                'stock' => '103.00',
                'price' => '72.00'
            ],
            [
                'code' => 'CH12',
                'name' => 'LLANTA 300-18 TRIAL P21 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '475.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH29',
                'name' => 'LLANTA 460-17 CROSS P82 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '18.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH65',
                'name' => 'LLANTA 500-12 8PR CENTRAO CH',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'RCC',
                'stock' => '58.00',
                'price' => '130.00'
            ],
            [
                'code' => 'CH388',
                'name' => 'LLANTA 90/90-19 MOD. BRS. P126 6PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '10.00',
                'price' => '95.00'
            ],
            [
                'code' => 'CH389',
                'name' => 'LLANTA 90/90-21 P126 4PR TT',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'KINGSTONE',
                'stock' => '10.00',
                'price' => '95.00'
            ],
            [
                'code' => 'CH43',
                'name' => 'LLANTA C/CAMARA CARGUERO 5.00-12 HD-920 TIPO TRACTOR',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'DURO',
                'stock' => '13.00',
                'price' => '145.00'
            ],
            [
                'code' => 'CH242',
                'name' => 'LLANTA CARGUERO S/CAMARA 5.00-12 TRACTOR(10PR)(TT)',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'YANG ZU',
                'stock' => '97.00',
                'price' => '180.00'
            ],
            [
                'code' => 'CH371',
                'name' => 'LLANTA HD915 500-12 TRIAL',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'CELIMO',
                'stock' => '50.00',
                'price' => '128.00'
            ],
            [
                'code' => 'CH166',
                'name' => 'LLANTA HD920 500-12 TRACTOR',
                'unid' => 'UNIDAD',
                'category' => 'LLANTAS',
                'brand' => 'CELIMO',
                'stock' => '90.00',
                'price' => '138.00'
            ],
            [
                'code' => 'CH271',
                'name' => 'M-SPECIAL HD 50 12X1L :PE',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'MOBIL',
                'stock' => '19.00',
                'price' => '175.00'
            ],
            [
                'code' => 'CH374',
                'name' => 'M-SPECIAL HD 50 12X1L :PE',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOBIL',
                'stock' => '12.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH220',
                'name' => 'M-SUPER MOTO 3R 4T 25W50 12X1L :PE',
                'unid' => 'CAJA',
                'category' => 'ACEITES',
                'brand' => 'MOBIL',
                'stock' => '56.00',
                'price' => '208.00'
            ],
            [
                'code' => 'CH221',
                'name' => 'M-SUPER MOTO 3R 4T 25W50 1L :PE',
                'unid' => 'UNIDAD',
                'category' => 'ACEITES',
                'brand' => 'MOBIL',
                'stock' => '36.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH269',
                'name' => 'MANETA COMQ.IZQ.ST',
                'unid' => 'UNIDAD',
                'category' => 'MANIJAS',
                'brand' => 'HONDA',
                'stock' => '1.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH153',
                'name' => 'MANGUERA DE GASOLINA X 20MT.',
                'unid' => 'METRO',
                'category' => 'MANGUERAS',
                'brand' => 'VOLDA',
                'stock' => '4.00',
                'price' => '26.00'
            ],
            [
                'code' => 'CH195',
                'name' => 'MANGUERA GASOLINA NEGRO CH',
                'unid' => 'METRO',
                'category' => 'MANGUERAS',
                'brand' => 'RCC',
                'stock' => '100.00',
                'price' => '1.20'
            ],
            [
                'code' => 'CH194',
                'name' => 'MANIGUETAS C125B CH',
                'unid' => 'PAR',
                'category' => 'MANIGUETAS',
                'brand' => 'RCC',
                'stock' => '89.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH19',
                'name' => 'MANIGUETAS SINERGY T/PROTAPER NEGRO/ROJO CH',
                'unid' => 'PAR',
                'category' => 'MANUBRIOS',
                'brand' => 'RCC',
                'stock' => '30.00',
                'price' => '18.00'
            ],
            [
                'code' => 'CH378',
                'name' => 'MANIJA EMBRAGUE GL C/BASE',
                'unid' => 'SET',
                'category' => 'MANIJAS',
                'brand' => 'VOLDA',
                'stock' => '100.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH47',
                'name' => 'MANIJA FRENO DE DISCO Y EMBRAGUE BROSS',
                'unid' => 'PAR',
                'category' => 'MANIJAS',
                'brand' => 'VOLDA',
                'stock' => '5.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH112',
                'name' => 'MONOSHOCK  XR250 44CM/REGULADOR',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '160.00'
            ],
            [
                'code' => 'CH248',
                'name' => 'MONOSHOCK 305MM NX305 C/REGUL. ROJO',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'KIGCOL',
                'stock' => '0.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH75',
                'name' => 'MONOSHOCK BR0SS 200 33CM/REGULADOR',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH246',
                'name' => 'MONOSHOCK GY200 34CM/REGUL',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '11.00',
                'price' => '120.00'
            ],
            [
                'code' => 'CH299',
                'name' => 'MONOSHOCK NXR125 33.5CM',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '140.00'
            ],
            [
                'code' => 'CH50',
                'name' => 'MONOSHOCK XR150L',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH109',
                'name' => 'MONOSHOCK XR200/XL200 36CM',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '160.00'
            ],
            [
                'code' => 'CH31',
                'name' => 'MONOSHOCK XTZ125 35CM',
                'unid' => 'UNIDAD',
                'category' => 'MONOSHOCKS',
                'brand' => 'NIZUMI',
                'stock' => '18.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH284',
                'name' => 'MOTOR 110CC A/E LF110-26H',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '3.00',
                'price' => '830.00'
            ],
            [
                'code' => 'CH267',
                'name' => 'MOTOR 200 CC C/ARRANQUE ELECTRICO',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'HAOJIN',
                'stock' => '4.00',
                'price' => '1350.00'
            ],
            [
                'code' => 'CH164',
                'name' => 'MOTOR CARGUERO LF250ZH-X C/RADIADOR',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '3.00',
                'price' => '2000.00'
            ],
            [
                'code' => 'CH93',
                'name' => 'MOTOR CG150 A/E 162FMJ C/ACCESORIOS',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '5.00',
                'price' => '980.00'
            ],
            [
                'code' => 'CH279',
                'name' => 'MOTOR CG200 A/E 163FML-2',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '0.00',
                'price' => '1360.00'
            ],
            [
                'code' => 'CH154',
                'name' => 'MOTOR CG200 A/E 163FML-2ZH',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '9.00',
                'price' => '1330.00'
            ],
            [
                'code' => 'CH286',
                'name' => 'MOTOR CG250 5V A/E 167FMM-ZH',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '1.00',
                'price' => '1450.00'
            ],
            [
                'code' => 'CH165',
                'name' => 'MOTOR CG250 5V A/E 167MM-U E/AGUA C/RADIADOR',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '0.00',
                'price' => '1750.00'
            ],
            [
                'code' => 'CH241',
                'name' => 'MOTOR CG300 5V. A/E 172MM-2F E/AGUA C/RADIADOR',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'LIFAN',
                'stock' => '0.00',
                'price' => '2200.00'
            ],
            [
                'code' => 'CH280',
                'name' => 'MOTOR CG300 P/CARGUERO C/RADIADOR',
                'unid' => 'SET',
                'category' => 'MOTORES',
                'brand' => 'BJR',
                'stock' => '1.00',
                'price' => '2000.00'
            ],
            [
                'code' => 'CH370',
                'name' => 'MOTOR COMP. GDM300 GDM',
                'unid' => 'UNIDAD',
                'category' => 'MOTORES',
                'brand' => 'GDM',
                'stock' => '1.00',
                'price' => '2180.00'
            ],
            [
                'code' => 'CH150',
                'name' => 'NEUMATICO 500-12 OFF ROAD TRACTOR 10PR',
                'unid' => 'UNIDAD',
                'category' => 'NEUMATICOS',
                'brand' => 'GOSTONE',
                'stock' => '10.00',
                'price' => '195.00'
            ],
            [
                'code' => 'CH151',
                'name' => 'NEUMATICO 500-12 OFF ROAD TRACTOR 8PR',
                'unid' => 'UNIDAD',
                'category' => 'NEUMATICOS',
                'brand' => 'GOSTONE',
                'stock' => '1.00',
                'price' => '195.00'
            ],
            [
                'code' => 'CH231',
                'name' => 'PARADOR LATERAL XTZ125 C/RESORTE',
                'unid' => 'SET',
                'category' => 'PARADOR',
                'brand' => 'KIGCOL',
                'stock' => '5.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH232',
                'name' => 'PARADOR LATERAL XTZ150 C/RESORTE',
                'unid' => 'SET',
                'category' => 'PARADOR',
                'brand' => 'KIGCOL',
                'stock' => '8.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH263',
                'name' => 'PARRILLA POST BRS CH',
                'unid' => 'UNIDAD',
                'category' => 'PARRILLAS',
                'brand' => 'RCC',
                'stock' => '4.00',
                'price' => '75.00'
            ],
            [
                'code' => 'CH130',
                'name' => 'PARTE CENTRAL CORONA 12:38 COMPLETO MTF',
                'unid' => 'UNIDAD',
                'category' => 'CORONAS',
                'brand' => 'RCC',
                'stock' => '16.00',
                'price' => '200.00'
            ],
            [
                'code' => 'CH128',
                'name' => 'PASTILLAS FRENO 200X/X150R',
                'unid' => 'PAR',
                'category' => 'PASTILLAS',
                'brand' => 'RCC',
                'stock' => '74.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH338',
                'name' => 'PASTILLAS FRENO BROSS G200Y C/CACHO',
                'unid' => 'PAR',
                'category' => 'PASTILLAS',
                'brand' => 'RCC',
                'stock' => '100.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH339',
                'name' => 'PASTILLAS FRENO POST. BROSS G150Y XTZ',
                'unid' => 'PAR',
                'category' => 'PASTILLAS',
                'brand' => 'RCC',
                'stock' => '15.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH129',
                'name' => 'PASTILLAS FRENO WV110S MODERNA',
                'unid' => 'PAR',
                'category' => 'PASTILLAS',
                'brand' => 'RCC',
                'stock' => '24.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH328',
                'name' => 'PEDAL ARRANQUE MTF 2/PERNOS',
                'unid' => 'UNIDAD',
                'category' => 'PEDALES',
                'brand' => 'RCC',
                'stock' => '15.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH233',
                'name' => 'PEDAL CAMBIO ALUMINIO ROJO',
                'unid' => 'PIEZA',
                'category' => 'PEDALES',
                'brand' => 'BJR',
                'stock' => '3.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH245',
                'name' => 'PEDAL CAMBIO BROSS / GY150 NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'PEDALES',
                'brand' => 'VOLDA',
                'stock' => '20.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH390',
                'name' => 'PEDAL CAMBIO LGC125/G125L M/CHINO CH',
                'unid' => 'UNIDAD',
                'category' => 'PEDALES',
                'brand' => 'RCC',
                'stock' => '50.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH10',
                'name' => 'PEDAL DE CAMBIO PARA FURGON',
                'unid' => 'UNIDAD',
                'category' => 'PEDALES',
                'brand' => 'VOLDA',
                'stock' => '84.00',
                'price' => '12.00'
            ],
            [
                'code' => 'CH136',
                'name' => 'PERNO COPA CENTRIFUGA 5MM',
                'unid' => 'UNIDAD',
                'category' => 'PERNOS',
                'brand' => 'RCC',
                'stock' => '91.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH249',
                'name' => 'PIÑON 13T CG125',
                'unid' => 'UNIDAD',
                'category' => 'PIÑONES',
                'brand' => 'BJR',
                'stock' => '10.00',
                'price' => '3.50'
            ],
            [
                'code' => 'CH40',
                'name' => 'PIÑON 14T CD100/CB110/WAVE 100',
                'unid' => 'UNIDAD',
                'category' => 'PIÑONES',
                'brand' => 'SFX',
                'stock' => '85.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH234',
                'name' => 'PIÑON 14T XR200 (520)',
                'unid' => 'UNIDAD',
                'category' => 'PIÑONES',
                'brand' => 'CCKAPA',
                'stock' => '5.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH06',
                'name' => 'PIÑON 15T CB125/CG125',
                'unid' => 'UNIDAD',
                'category' => 'PIÑONES',
                'brand' => 'SFX',
                'stock' => '275.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH115',
                'name' => 'PIÑON 15T CBF150/NXR125 BROS',
                'unid' => 'UNIDAD',
                'category' => 'PIÑONES',
                'brand' => 'SFX',
                'stock' => '149.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH264',
                'name' => 'PIÑON VELOCIMETRO C110F/C125F/C150F UNIC CH',
                'unid' => 'SET',
                'category' => 'PIÑONES',
                'brand' => 'RCC',
                'stock' => '7.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH176',
                'name' => 'PITON AUTOR TR13 - TR418',
                'unid' => 'UNIDAD',
                'category' => 'PITONES',
                'brand' => 'LCB',
                'stock' => '50.00',
                'price' => '2.00'
            ],
            [
                'code' => 'CH257',
                'name' => 'PORTA FUSIBLE UÑA C/FUSIBLE 15A CH',
                'unid' => 'UNIDAD',
                'category' => 'FUSIBLE',
                'brand' => 'RCC',
                'stock' => '88.00',
                'price' => '2.00'
            ],
            [
                'code' => 'CH149',
                'name' => 'PROTECTOR AMORTIGUADOR CRF230/250 ROJO',
                'unid' => 'UNIDAD',
                'category' => 'PROTECTOR',
                'brand' => 'BIKER',
                'stock' => '0.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH102',
                'name' => 'PROTECTOR TELESCOPICO GL125/150',
                'unid' => 'PAR',
                'category' => 'PROTECTOR',
                'brand' => 'KIGCOL',
                'stock' => '4.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH103',
                'name' => 'PROTECTOR TELESCOPICO XR250 TORNADO/TORQUE250',
                'unid' => 'PAR',
                'category' => 'PROTECTOR',
                'brand' => 'KIGCOL',
                'stock' => '2.00',
                'price' => '35.00'
            ],
            [
                'code' => 'CH235',
                'name' => 'PROTECTOR TELESCOPIO CRF230 NEGRO',
                'unid' => 'PAR',
                'category' => 'PROTECTOR',
                'brand' => 'BIKER',
                'stock' => '1.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH236',
                'name' => 'PROTECTOR TELESCOPIO CRF230 ROJO',
                'unid' => 'PAR',
                'category' => 'PROTECTOR',
                'brand' => 'BIKER',
                'stock' => '2.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH391',
                'name' => 'RAMAL 110C C/ARRANCADOR CH',
                'unid' => 'UNIDAD',
                'category' => 'RAMALES',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '45.00'
            ],
            [
                'code' => 'CH398',
                'name' => 'RAMAL BRS C/INDIC. CAMBIOS CH',
                'unid' => 'UNIDAD',
                'category' => 'RAMALES',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '55.00'
            ],
            [
                'code' => 'CH82',
                'name' => 'RAMAL CARGUERO TRIFASICO',
                'unid' => 'SET',
                'category' => 'RAMALES',
                'brand' => 'VOLDA',
                'stock' => '68.00',
                'price' => '40.00'
            ],
            [
                'code' => 'CH352',
                'name' => 'RAMAL MTF TRIFASICO',
                'unid' => 'UNIDAD',
                'category' => 'RAMALES',
                'brand' => 'RCC',
                'stock' => '99.00',
                'price' => '50.00'
            ],
            [
                'code' => 'CH127',
                'name' => 'RETEN 20-35-10 CH',
                'unid' => 'UNIDAD',
                'category' => 'RETENES',
                'brand' => 'RCC',
                'stock' => '279.00',
                'price' => '3.50'
            ],
            [
                'code' => 'CH360',
                'name' => 'RETEN 42-55-8 CH',
                'unid' => 'UNIDAD',
                'category' => 'RETENES',
                'brand' => 'RCC',
                'stock' => '200.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH362',
                'name' => 'RETEN BARRA G125L 31-43-10.3 CH',
                'unid' => 'UNIDAD',
                'category' => 'RETENES',
                'brand' => 'SUMOTO',
                'stock' => '197.00',
                'price' => '4.00'
            ],
            [
                'code' => 'CH09',
                'name' => 'RODAJE 30205',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'VOLDA',
                'stock' => '10.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH308',
                'name' => 'RODAJE 6008-2RS',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'VOLDA',
                'stock' => '40.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH345',
                'name' => 'RODAJE 6008-2RS CORONA MTF',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'RCC',
                'stock' => '40.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH387',
                'name' => 'RODAJE 6009-2RS CH',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'RCC',
                'stock' => '80.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH329',
                'name' => 'RODAJE 6204-2RS',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'RCC',
                'stock' => '499.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH137',
                'name' => 'RODAJE 6206-2RS',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'RCC',
                'stock' => '230.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH104',
                'name' => 'RODAJE 6301-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'BJR',
                'stock' => '2400.00',
                'price' => '2.50'
            ],
            [
                'code' => 'CH105',
                'name' => 'RODAJE 6302-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'BJR',
                'stock' => '2378.00',
                'price' => '2.50'
            ],
            [
                'code' => 'CH88',
                'name' => 'RODAJE 6303-2RS ROJO',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'HYZ',
                'stock' => '200.00',
                'price' => '6.00'
            ],
            [
                'code' => 'CH363',
                'name' => 'RODAJE 6304-2RS',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SUMOTO',
                'stock' => '180.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH89',
                'name' => 'RODAJE 6304-2RS ROJO',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'HYZ',
                'stock' => '30.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH300',
                'name' => 'RODAJE BOLAS 6004-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '60.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH21',
                'name' => 'RODAJE BOLAS 6202-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '450.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH254',
                'name' => 'RODAJE BOLAS 6203-ZZ RUEDA POST.C70',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'NACHI',
                'stock' => '10.00',
                'price' => '12.50'
            ],
            [
                'code' => 'CH20',
                'name' => 'RODAJE BOLAS 6204-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '211.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH301',
                'name' => 'RODAJE BOLAS 6206-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '60.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH08',
                'name' => 'RODAJE BOLAS 6302-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '4599.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH253',
                'name' => 'RODAJE BOLAS 6303-ZZ',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'NACHI',
                'stock' => '10.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH36',
                'name' => 'RODAJE BOLAS 6304-2NSL',
                'unid' => 'UNIDAD',
                'category' => 'RODAJES',
                'brand' => 'SCP',
                'stock' => '26.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH27',
                'name' => 'RUSTER CORONA (PALANCA Y CABLE) MTF',
                'unid' => 'UNIDAD',
                'category' => 'CORONAS',
                'brand' => 'RCC',
                'stock' => '11.00',
                'price' => '300.00'
            ],
            [
                'code' => 'CH175',
                'name' => 'RUSTER DE CORONA ALUMINIO DE FURGON MTF',
                'unid' => 'UNIDAD',
                'category' => 'CORONAS',
                'brand' => 'D´TIEX',
                'stock' => '2.00',
                'price' => '300.00'
            ],
            [
                'code' => 'CH282',
                'name' => 'SEGURO DE PIÑON CON PERNO CG125 STD',
                'unid' => 'UNIDAD',
                'category' => 'SEGUROS',
                'brand' => 'VOLDA',
                'stock' => '79.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH126',
                'name' => 'SEGURO DE TOLVA MTF #1',
                'unid' => 'UNIDAD',
                'category' => 'SEGUROS',
                'brand' => 'RCC',
                'stock' => '20.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH196',
                'name' => 'SEGURO DE TOLVA MTF #2 CH (LEVANTAR TOLVA)',
                'unid' => 'UNIDAD',
                'category' => 'SEGUROS',
                'brand' => 'RCC',
                'stock' => '49.00',
                'price' => '10.00'
            ],
            [
                'code' => 'CH330',
                'name' => 'SEGURO PIÑON ARRASTRE C125G C/PERNOS',
                'unid' => 'SET',
                'category' => 'SEGUROS',
                'brand' => 'RCC',
                'stock' => '800.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH125',
                'name' => 'SELENIO C125 C/ARRANQ 4/CABLES ZONKO',
                'unid' => 'UNIDAD',
                'category' => 'SELENIOS',
                'brand' => 'RCC',
                'stock' => '7.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH237',
                'name' => 'SILENCIADOR CARGUERO',
                'unid' => 'SET',
                'category' => 'SILENCIADOR',
                'brand' => 'KIGCOL',
                'stock' => '20.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH272',
                'name' => 'SILICONA AUTOMATRIZ RTV GRIS 35G',
                'unid' => 'UNIDAD',
                'category' => 'SILICONAS',
                'brand' => 'VISBELLA',
                'stock' => '83.00',
                'price' => '5.00'
            ],
            [
                'code' => 'CH265',
                'name' => 'SOPORTE AMORTIGUADOR CR230F CH',
                'unid' => 'SET',
                'category' => 'SOPORTES',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH361',
                'name' => 'SWITCH FRENO G125L C/RESORTE CH',
                'unid' => 'UNIDAD',
                'category' => 'SWITCHS',
                'brand' => 'RCC',
                'stock' => '30.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH238',
                'name' => 'TABLERO CB1',
                'unid' => 'UNIDAD',
                'category' => 'TABLEROS',
                'brand' => 'BJR',
                'stock' => '2.00',
                'price' => '70.00'
            ],
            [
                'code' => 'CH217',
                'name' => 'TABLERO CG DIGITAL',
                'unid' => 'UNIDAD',
                'category' => 'TABLEROS',
                'brand' => 'BJR',
                'stock' => '0.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH294',
                'name' => 'TABLERO ELECTRONICO HONDA STORM',
                'unid' => 'UNIDAD',
                'category' => 'TABLEROS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH156',
                'name' => 'TABLERO HONDA GL150',
                'unid' => 'UNIDAD',
                'category' => 'TABLEROS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '90.00'
            ],
            [
                'code' => 'CH340',
                'name' => 'TANQUE BROSS 8B NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '145.00'
            ],
            [
                'code' => 'CH258',
                'name' => 'TANQUE C125G M/HND AZUL C/GRIFO T/TANQUE CH',
                'unid' => 'UNIDAD',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '100.00'
            ],
            [
                'code' => 'CH124',
                'name' => 'TANQUE CF230 C/TAPA TANQ. Y GRIFO',
                'unid' => 'UNIDAD',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH111',
                'name' => 'TANQUE DE GASILINA XTZ NEGRO/AMARILLO',
                'unid' => 'UNIDAD',
                'category' => 'TANQUES',
                'brand' => 'VOLDA',
                'stock' => '0.00',
                'price' => '185.00'
            ],
            [
                'code' => 'CH341',
                'name' => 'TANQUE G125L HND NEGRO C/TAP. LAT. TANQUE/GRIFO C/STICKERS',
                'unid' => 'SET',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '6.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH342',
                'name' => 'TANQUE G125L HND ROJO C/TAP. LAT. TANQUE/GRIFO C/STICKERS',
                'unid' => 'SET',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH373',
                'name' => 'TANQUE GASOLINA SOLO CRF 230',
                'unid' => 'UNIDAD',
                'category' => 'TANQUES',
                'brand' => 'D´TIEX',
                'stock' => '1.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH343',
                'name' => 'TANQUE STM C/FLOTADOR TAPA LAT. GRIFO/TANQUE ROJO',
                'unid' => 'SET',
                'category' => 'TANQUES',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH239',
                'name' => 'TANQUE XTZ125 MODERNA NEGRO COMPLETO',
                'unid' => 'KIT',
                'category' => 'TANQUES',
                'brand' => 'BJR',
                'stock' => '0.00',
                'price' => '220.00'
            ],
            [
                'code' => 'CH298',
                'name' => 'TAPA DE TANQUE BROSS',
                'unid' => 'UNIDAD',
                'category' => 'TAPAS',
                'brand' => 'VOLDA',
                'stock' => '2.00',
                'price' => '20.00'
            ],
            [
                'code' => 'CH243',
                'name' => 'TAPA DE TANQUE DE GASOLINA CGL',
                'unid' => 'UNIDAD',
                'category' => 'TAPAS',
                'brand' => 'VOLDA',
                'stock' => '7.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH163',
                'name' => 'TELESC. COMP. FURGON 50MM ZS-MTF',
                'unid' => 'SET',
                'category' => 'TELESCOPICOS',
                'brand' => 'D´TIEX',
                'stock' => '4.00',
                'price' => '390.00'
            ],
            [
                'code' => 'CH312',
                'name' => 'TELESCOPICO CARGUERO COMP. 4 BARRAS C/YUGO',
                'unid' => 'SET',
                'category' => 'TELESCOPICOS',
                'brand' => 'VOLDA',
                'stock' => '2.00',
                'price' => '390.00'
            ],
            [
                'code' => 'CH52',
                'name' => 'TELESCOPICO GL150 EJE 12MM',
                'unid' => 'PAR',
                'category' => 'TELESCOPICOS',
                'brand' => 'VOLDA',
                'stock' => '4.00',
                'price' => '150.00'
            ],
            [
                'code' => 'CH45',
                'name' => 'TELESCOPICO PARA CARGUERO 300 (350MM)',
                'unid' => 'KIT',
                'category' => 'TELESCOPICOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '390.00'
            ],
            [
                'code' => 'CH288',
                'name' => 'TELESCOPICO PARA XTZ125',
                'unid' => 'PAR',
                'category' => 'TELESCOPICOS',
                'brand' => 'VOLDA',
                'stock' => '3.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH11',
                'name' => 'TELESCOPICO WX150 SOLAS (EJE 15MM GRUESO)',
                'unid' => 'UNIDAD',
                'category' => 'TELESCOPICOS',
                'brand' => 'VOLDA',
                'stock' => '22.00',
                'price' => '115.00'
            ],
            [
                'code' => 'CH331',
                'name' => 'TEMPLADOR ARRASTRE BROSS',
                'unid' => 'PAR',
                'category' => 'TEMPLADORES',
                'brand' => 'RCC',
                'stock' => '29.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH46',
                'name' => 'TEMPLADOR ARRASTRE BRS/G150Y',
                'unid' => 'PAR',
                'category' => 'TEMPLADORES',
                'brand' => 'VOLDA',
                'stock' => '4.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH49',
                'name' => 'TIMON BRS NEGRO CH',
                'unid' => 'UNIDAD',
                'category' => 'TIMONES',
                'brand' => 'VOLDA',
                'stock' => '12.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH395',
                'name' => 'TIMON PROTAPER AZUL',
                'unid' => 'UNIDAD',
                'category' => 'TIMONES',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH392',
                'name' => 'TIMON PROTAPER NEGRO',
                'unid' => 'UNIDAD',
                'category' => 'TIMONES',
                'brand' => 'RCC',
                'stock' => '5.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH393',
                'name' => 'TIMON PROTAPER NEGRO/ROJO',
                'unid' => 'UNIDAD',
                'category' => 'TIMONES',
                'brand' => 'RCC',
                'stock' => '5.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH394',
                'name' => 'TIMON PROTAPER ROJO',
                'unid' => 'UNIDAD',
                'category' => 'TIMONES',
                'brand' => 'RCC',
                'stock' => '3.00',
                'price' => '60.00'
            ],
            [
                'code' => 'CH291',
                'name' => 'TRAPECIO POST DER ZS125-S',
                'unid' => 'UNIDAD',
                'category' => 'TRAPECIOS',
                'brand' => 'ZONGSHEN',
                'stock' => '30.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH290',
                'name' => 'TRAPECIO POST IZQ ZS125-S',
                'unid' => 'UNIDAD',
                'category' => 'TRAPECIOS',
                'brand' => 'ZONGSHEN',
                'stock' => '30.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH313',
                'name' => 'TUBO DE ESCAPE HONDA CRF MODELO DOBLE',
                'unid' => 'SET',
                'category' => 'TUBOS',
                'brand' => 'NIZUMI',
                'stock' => '2.00',
                'price' => '380.00'
            ],
            [
                'code' => 'CH73',
                'name' => 'TUBO DE ESCAPE HONDA CRF MODELO POWER CORE 2',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'NIZUMI',
                'stock' => '1.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH110',
                'name' => 'TUBO DE ESCAPE HONDA CRF MODELO POWER CORE 3',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'NIZUMI',
                'stock' => '2.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH51',
                'name' => 'TUBO DE ESCAPE HONDA CRF MODELO POWER CORE 4',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'NIZUMI',
                'stock' => '26.00',
                'price' => '250.00'
            ],
            [
                'code' => 'CH250',
                'name' => 'TUBO DE ESCAPE PARA STORM 125',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'VOLDA',
                'stock' => '1.00',
                'price' => '125.00'
            ],
            [
                'code' => 'CH266',
                'name' => 'TUBO ESCAPE BRS CH',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'RCC',
                'stock' => '2.00',
                'price' => '130.00'
            ],
            [
                'code' => 'CH63',
                'name' => 'TUBO ESCAPE MTF GRANDE B S/M',
                'unid' => 'UNIDAD',
                'category' => 'TUBOS',
                'brand' => 'RCC',
                'stock' => '1.00',
                'price' => '85.00'
            ],
            [
                'code' => 'CH187',
                'name' => 'TUERCA CULATA CB125 TW 8MM',
                'unid' => 'UNIDAD',
                'category' => 'TUERCAS',
                'brand' => 'COPILLAR',
                'stock' => '2.00',
                'price' => '1.00'
            ],
            [
                'code' => 'CH259',
                'name' => 'TUERCA EJE CAJA RETROCESO',
                'unid' => 'UNIDAD',
                'category' => 'TUERCAS',
                'brand' => 'RCC',
                'stock' => '98.00',
                'price' => '2.00'
            ],
            [
                'code' => 'CH106',
                'name' => 'VALVULA ADMISION GL125/CB110/WAVE110 C/SEGURO',
                'unid' => 'SET',
                'category' => 'VALVULAS',
                'brand' => 'KIGCOL',
                'stock' => '10.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH107',
                'name' => 'VALVULA ESCAPE GL125/CB110/WAVE110 C/SEGURO',
                'unid' => 'SET',
                'category' => 'VALVULAS',
                'brand' => 'KIGCOL',
                'stock' => '8.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH307',
                'name' => 'VARILLA DE FRENO 1050/7MM DORADO',
                'unid' => 'UNIDAD',
                'category' => 'VARILLAS',
                'brand' => 'VOLDA',
                'stock' => '10.00',
                'price' => '8.00'
            ],
            [
                'code' => 'CH28',
                'name' => 'VARILLA FRENO G125L 54CM',
                'unid' => 'UNIDAD',
                'category' => 'VARILLAS',
                'brand' => 'RCC',
                'stock' => '216.00',
                'price' => '3.00'
            ],
            [
                'code' => 'CH314',
                'name' => 'ZAPATA FRENO POSTERIOR CARGUERO 220MM HIDRAULICO',
                'unid' => 'PAR',
                'category' => 'ZAPATAS',
                'brand' => 'KIGCOL',
                'stock' => '21.00',
                'price' => '25.00'
            ],
            [
                'code' => 'CH315',
                'name' => 'ZAPATA FRENO POSTERIOR DT175K ROJO',
                'unid' => 'PAR',
                'category' => 'ZAPATAS',
                'brand' => 'BJR',
                'stock' => '200.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH240',
                'name' => 'ZAPATA FRENO POSTERIOR XR250/XLR125 110X28',
                'unid' => 'PAR',
                'category' => 'ZAPATAS',
                'brand' => 'KIGCOL',
                'stock' => '140.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH214',
                'name' => 'ZAPATA POST MTF BOCAM 180MM',
                'unid' => 'PAR',
                'category' => 'ZAPATAS',
                'brand' => 'VOLDA',
                'stock' => '279.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH23',
                'name' => 'ZAPATA POST. MTF BOCAM. 180MM CH',
                'unid' => 'PAR',
                'category' => 'ZAPATAS',
                'brand' => 'RCC',
                'stock' => '79.00',
                'price' => '15.00'
            ],
            [
                'code' => 'CH84',
                'name' => 'ZAPATA POST. MTF BOCAM. 220MM CH',
                'unid' => 'UNIDAD',
                'category' => 'ZAPATAS',
                'brand' => 'RCC',
                'stock' => '267.00',
                'price' => '16.00'
            ]
        ];

        foreach ($products as $product) {
            $category = \App\Models\ProductCategory::firstOrCreate(['name' => $product['category']]);
            $brand = \App\Models\ProductBrand::firstOrCreate(['name' => $product['brand']]);
            $unit = \App\Models\ProductMeasure::firstOrCreate(['name' => $product['unid']]);

            // created_at and updated_at set start current year
            $now = \Carbon\Carbon::now();
            $startOfYear = $now->copy()->startOfYear();

            $savedProduct = \App\Models\Product::create([
                'code' => $product['code'],
                'name' => $product['name'],
                'stock' => 0,
                'category_id' => $category->id,
                'brand_id' => $brand->id,
                'measure_id' => $unit->id,
                'created_at' => $startOfYear,
                'updated_at' => $startOfYear,
            ]);

            \App\Models\ProductPrice::create([
                'product_id' => $savedProduct->id,
                'price' => $product['price'],
                'active' => true,
                'created_at' => $startOfYear,
                'updated_at' => $startOfYear,
            ]);

            // MOVIMIENTOS DE INVENTARIO INICIALES
            // random quantity between 5 and 20
            $quantity = rand(5, 20);
            $batchNumber = "LOTE-{$savedProduct->id}-" . str_pad(1, 5, '0', STR_PAD_LEFT);
            
            $randomSupplier = array_rand(array_flip($suppliers));

            $batch = \App\Models\ProductBatch::create([
                'product_id' => $savedProduct->id,
                'supplier' => $randomSupplier,
                'batch_number' => $batchNumber,
                'quantity_received' => $quantity,
                'quantity_available' => $quantity,
                'user_id' => 1,
                'purchase_price' => $product['price'] * 0.5, // assuming purchase price is 60% of sale price
                'created_at' => $startOfYear,
                'updated_at' => $startOfYear,
            ]);

            \App\Models\StockMovement::create([
                'product_id' => $batch->product_id,
                'product_batch_id' => $batch->id,
                'quantity' => $batch->quantity_received,
                'type' => 'income', // Assuming 'income' for received stock
                'description' => "Received batch {$batch->batch_number} from supplier '{$batch->supplier}'",
                'purchase_price' => $batch->purchase_price,
                'total_purchase_price' => $batch->quantity_received * $batch->purchase_price,
                'model_type' => \App\Models\ProductBatch::class,
                'model_id' => $batch->id,
                'user_id' => null,
                'movement_date' => $startOfYear,
                'created_at' => $startOfYear,
                'updated_at' => $startOfYear,
            ]);

            // Update the product stock
            $savedProduct->stock += $batch->quantity_received;
            $savedProduct->save();


        }
    }
}
