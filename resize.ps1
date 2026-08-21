Add-Type -AssemblyName System.Drawing
$dir = "d:\Growth Lift Studio\Social Media Brand\New folder\public\images"
$images = Get-ChildItem -Path $dir -Filter "*.png"

foreach ($imgFile in $images) {
    if ($imgFile.Name -match "remodel-lead-gen|google-ads-bathroom") { continue } # skip non-infographics if any
    
    $imgPath = $imgFile.FullName
    $img = [System.Drawing.Image]::FromFile($imgPath)
    
    $targetWidth = 1200
    $targetHeight = 628
    
    # Calculate scale to fit within target
    $ratioX = $targetWidth / $img.Width
    $ratioY = $targetHeight / $img.Height
    $ratio = [Math]::Min($ratioX, $ratioY)
    
    $newWidth = [int]($img.Width * $ratio)
    $newHeight = [int]($img.Height * $ratio)
    
    $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Fill with dark background #0A0A0A
    $bgColor = [System.Drawing.Color]::FromArgb(255, 10, 10, 10)
    $brush = New-Object System.Drawing.SolidBrush($bgColor)
    $g.FillRectangle($brush, 0, 0, $targetWidth, $targetHeight)
    
    # Draw centered
    $posX = ($targetWidth - $newWidth) / 2
    $posY = ($targetHeight - $newHeight) / 2
    
    # High quality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $g.DrawImage($img, $posX, $posY, $newWidth, $newHeight)
    
    $img.Dispose()
    $g.Dispose()
    $brush.Dispose()
    
    # Save to a temp file then overwrite
    $tempPath = $imgPath + ".tmp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    Remove-Item $imgPath -Force
    Rename-Item $tempPath $imgFile.Name
    Write-Host "Resized: $($imgFile.Name)"
}
