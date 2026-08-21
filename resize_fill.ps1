Add-Type -AssemblyName System.Drawing
$dir = "d:\Growth Lift Studio\Social Media Brand\New folder\public\images"
$images = Get-ChildItem -Path $dir -Filter "*.png"

foreach ($imgFile in $images) {
    if ($imgFile.Name -match "remodel-lead-gen|google-ads-bathroom") { continue } # skip non-infographics if any
    
    $imgPath = $imgFile.FullName
    $img = [System.Drawing.Image]::FromFile($imgPath)
    
    $targetWidth = 1200
    $targetHeight = 628
    
    # Calculate scale to fill (use Maximum ratio instead of Minimum)
    $ratioX = $targetWidth / $img.Width
    $ratioY = $targetHeight / $img.Height
    $ratio = [Math]::Max($ratioX, $ratioY)
    
    $newWidth = [int]($img.Width * $ratio)
    $newHeight = [int]($img.Height * $ratio)
    
    $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Background (won't be visible since image fills it, but good practice)
    $bgColor = [System.Drawing.Color]::FromArgb(255, 10, 10, 10)
    $brush = New-Object System.Drawing.SolidBrush($bgColor)
    $g.FillRectangle($brush, 0, 0, $targetWidth, $targetHeight)
    
    # Draw centered so excess is cropped evenly from sides or top/bottom
    $posX = ($targetWidth - $newWidth) / 2
    $posY = ($targetHeight - $newHeight) / 2
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, $posX, $posY, $newWidth, $newHeight)
    
    $img.Dispose()
    $g.Dispose()
    $brush.Dispose()
    
    $tempPath = $imgPath + ".tmp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    Remove-Item $imgPath -Force
    Rename-Item $tempPath $imgFile.Name
    Write-Host "Cropped to fill: $($imgFile.Name)"
}
