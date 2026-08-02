param(
  [string]$DocsDir = "C:\Users\Rahma\Documents\data"
)

$ErrorActionPreference = "Stop"

function Extract-DocxParagraphs {
  param(
    [string]$DocxPath,
    [string]$OutputPath
  )

  $tmpRoot = Join-Path $PSScriptRoot ("tmp-docx-" + [guid]::NewGuid().ToString())
  New-Item -ItemType Directory -Path $tmpRoot | Out-Null

  try {
    $zipPath = Join-Path $tmpRoot "doc.zip"
    $extractPath = Join-Path $tmpRoot "extracted"
    Copy-Item -LiteralPath $DocxPath -Destination $zipPath
    Expand-Archive -LiteralPath $zipPath -DestinationPath $extractPath -Force
    $xmlPath = Join-Path $extractPath "word\document.xml"
    [xml]$doc = Get-Content -LiteralPath $xmlPath
    $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $paras = $doc.SelectNodes("//w:p", $ns) | ForEach-Object {
      ($_.SelectNodes(".//w:t", $ns) | ForEach-Object { $_."#text" }) -join ""
    } | Where-Object { $_.Trim() -ne "" }
    $paras | ConvertTo-Json | Set-Content -LiteralPath $OutputPath
  }
  finally {
    if (Test-Path -LiteralPath $tmpRoot) {
      Remove-Item -LiteralPath $tmpRoot -Recurse -Force
    }
  }
}

$brandMappings = @(
  @{ BrandSlug = "alfa-romeo"; BrandName = "Alfa Romeo"; DocFile = "AlfaRomeo.docx" },
  @{ BrandSlug = "aston-martin"; BrandName = "Aston Martin"; DocFile = "AstonMartin.docx" },
  @{ BrandSlug = "audi"; BrandName = "Audi"; DocFile = "Audi.docx" },
  @{ BrandSlug = "bentley"; BrandName = "Bentley"; DocFile = "Bentley.docx" },
  @{ BrandSlug = "bmw"; BrandName = "BMW"; DocFile = "BMW.docx" },
  @{ BrandSlug = "cadillac"; BrandName = "Cadillac"; DocFile = "Cadillac (1).docx" },
  @{ BrandSlug = "chevrolet"; BrandName = "Chevrolet"; DocFile = "Chevrolet.docx" },
  @{ BrandSlug = "chrysler"; BrandName = "Chrysler"; DocFile = "Chrysler.docx" },
  @{ BrandSlug = "citroen"; BrandName = "Citroen"; DocFile = "Citroen.docx" },
  @{ BrandSlug = "dodge"; BrandName = "Dodge"; DocFile = "" },
  @{ BrandSlug = "ferrari"; BrandName = "Ferrari"; DocFile = "Dodge.docx" },
  @{ BrandSlug = "fiat"; BrandName = "Fiat"; DocFile = "Ferrari.docx" },
  @{ BrandSlug = "ford"; BrandName = "Ford"; DocFile = "Fiat.docx" },
  @{ BrandSlug = "honda"; BrandName = "Honda"; DocFile = "Honda.docx" },
  @{ BrandSlug = "hyundai"; BrandName = "Hyundai"; DocFile = "Hyundai.docx" },
  @{ BrandSlug = "jaguar"; BrandName = "Jaguar"; DocFile = "Jaguar.docx" },
  @{ BrandSlug = "kia"; BrandName = "Kia"; DocFile = "Kia.docx" },
  @{ BrandSlug = "land-rover"; BrandName = "Land Rover"; DocFile = "LandRover.docx" },
  @{ BrandSlug = "lexus"; BrandName = "Lexus"; DocFile = "Lexus.docx" },
  @{ BrandSlug = "mazda"; BrandName = "Mazda"; DocFile = "Mazda.docx" },
  @{ BrandSlug = "mercedes-benz"; BrandName = "Mercedes-Benz"; DocFile = "Mercedes.docx" },
  @{ BrandSlug = "mg"; BrandName = "MG"; DocFile = "MG.docx" },
  @{ BrandSlug = "mini"; BrandName = "Mini"; DocFile = "Mini.docx" },
  @{ BrandSlug = "mitsubishi"; BrandName = "Mitsubishi"; DocFile = "Mitsubishi.docx" },
  @{ BrandSlug = "nissan"; BrandName = "Nissan"; DocFile = "Nissan.docx" },
  @{ BrandSlug = "peugeot"; BrandName = "Peugeot"; DocFile = "Peugot.docx" },
  @{ BrandSlug = "porsche"; BrandName = "Porsche"; DocFile = "Porsche.docx" },
  @{ BrandSlug = "range-rover"; BrandName = "Range Rover"; DocFile = "RangeRover.docx" },
  @{ BrandSlug = "renault"; BrandName = "Renault"; DocFile = "Renault.docx" },
  @{ BrandSlug = "rolls-royce"; BrandName = "Rolls-Royce"; DocFile = "RollsRoyce.docx" },
  @{ BrandSlug = "seat"; BrandName = "SEAT"; DocFile = "seat.docx" },
  @{ BrandSlug = "skoda"; BrandName = "Skoda"; DocFile = "Skoda.docx" },
  @{ BrandSlug = "subaru"; BrandName = "Subaru"; DocFile = "Subaru.docx" },
  @{ BrandSlug = "suzuki"; BrandName = "Suzuki"; DocFile = "suzuki.docx" },
  @{ BrandSlug = "toyota"; BrandName = "Toyota"; DocFile = "Toyota.docx" },
  @{ BrandSlug = "vauxhall"; BrandName = "Vauxhall"; DocFile = "Vauxhall.docx" },
  @{ BrandSlug = "volkswagen"; BrandName = "Volkswagen"; DocFile = "Volvo.docx" },
  @{ BrandSlug = "volvo"; BrandName = "Volvo"; DocFile = "volkswagen.docx" }
)

$heroDoc = Join-Path $DocsDir "hero3.docx"
$tmpDir = Join-Path $PSScriptRoot "tmp-bulk-docs"
if (Test-Path -LiteralPath $tmpDir) {
  Remove-Item -LiteralPath $tmpDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tmpDir | Out-Null

$heroJson = Join-Path $tmpDir "hero3.json"
Extract-DocxParagraphs -DocxPath $heroDoc -OutputPath $heroJson

$results = @()

foreach ($mapping in $brandMappings) {
  $docPath = Join-Path $DocsDir $mapping.DocFile
  if ([string]::IsNullOrWhiteSpace($mapping.DocFile) -or -not (Test-Path -LiteralPath $docPath)) {
    $results += [pscustomobject]@{
      brandSlug = $mapping.BrandSlug
      status = "missing-doc"
      missingModels = @()
      undocumentedModels = @()
      updatedModels = @()
    }
    continue
  }

  $brandJson = Join-Path $tmpDir ($mapping.BrandSlug + ".json")
  Extract-DocxParagraphs -DocxPath $docPath -OutputPath $brandJson

  $rawResult = node scripts/apply-brand-doc-updates.mjs `
    --brand-slug $mapping.BrandSlug `
    --brand-name $mapping.BrandName `
    --model-doc-json $brandJson `
    --hero-doc-json $heroJson

  $parsed = $rawResult | ConvertFrom-Json
  $results += [pscustomobject]@{
    brandSlug = $mapping.BrandSlug
    status = "updated"
    missingModels = @($parsed.missingModels)
    undocumentedModels = @($parsed.undocumentedModels)
    updatedModels = @($parsed.updatedModels)
  }
}

$siteBrands = Get-ChildItem (Join-Path $PWD "data\brands") -File | Select-Object -ExpandProperty BaseName
$mappedBrands = $brandMappings.BrandSlug
$missingBrandDocs = $siteBrands | Where-Object { $_ -notin $mappedBrands } | Sort-Object

$summary = [pscustomobject]@{
  updatedBrands = @($results | Where-Object { $_.status -eq "updated" } | Select-Object -ExpandProperty brandSlug)
  missingBrandDocs = @($missingBrandDocs)
  brandsWithMissingModels = @($results | Where-Object { $_.missingModels.Count -gt 0 })
  brandsWithUndocumentedModels = @($results | Where-Object { $_.undocumentedModels.Count -gt 0 })
}

$summary | ConvertTo-Json -Depth 6

if (Test-Path -LiteralPath $tmpDir) {
  Remove-Item -LiteralPath $tmpDir -Recurse -Force
}
