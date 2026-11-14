param(
    [string]$Planet = "moon",
    [double]$Lat = 60.0,
    [double]$Lng = 120.0,
    [int]$TopK = 5
)

$body = @{
    planet = $Planet.ToLower()
    latitude = $Lat
    longitude = $Lng
    top_k = $TopK
} | ConvertTo-Json

Write-Host "Querying Railway API for $Planet at ($Lat, $Lng)..." -ForegroundColor Cyan

$response = $null
for ($attempt = 1; $attempt -le 3; $attempt++) {
    try {
        $response = Invoke-RestMethod -Uri "https://web-production-32144f36.up.railway.app/api/analogs" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 15
        if ($response) { break }
    } catch {
        if ($attempt -lt 3) {
            Write-Host "  Neon DB waking up / reconnecting (attempt $attempt)..." -ForegroundColor DarkGray
            Start-Sleep -Milliseconds 600
        } else {
            Write-Error $_
        }
    }
}

if ($response) {
    Write-Host "`nTarget Planet Info ($Planet):" -ForegroundColor Green
    $response.target.features | Format-List

    Write-Host "`nTop $TopK Earth Analogs:" -ForegroundColor Yellow
    $response.top_analogs | Select-Object rank, region, latitude, longitude, elevation_m, distance_metric, similarity_score_pct | Format-Table -AutoSize
}
