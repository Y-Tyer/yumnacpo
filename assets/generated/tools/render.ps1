param(
  [string]$Pose = 'rest',
  [string]$Out,
  [string]$View = '',
  [int]$Width = 1520,
  [int]$Height = 2688,
  [string]$Bg = '',
  [switch]$Debug,
  [switch]$NoPolys
)
# Renders one pose from rig.html to a PNG with headless Edge.
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
$page = 'file:///' + ((Join-Path $PSScriptRoot 'rig.html') -replace '\\', '/')
$query = "pose=$Pose"
if ($View) { $query += "&view=$View" }
if ($Bg) { $query += "&bg=$Bg" }
if ($Debug) { $query += '&debug=1' }
if ($NoPolys) { $query += '&polys=0' }
$profile = Join-Path $env:TEMP 'rig-edge-profile'
$edgeArgs = @(
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--allow-file-access-from-files', "--user-data-dir=`"$profile`"",
  '--default-background-color=00000000', '--virtual-time-budget=4000',
  "--window-size=$Width,$Height", "--screenshot=`"$Out`"", "`"$page`?$query`""
)
if (Test-Path $Out) { Remove-Item $Out -Confirm:$false }
Start-Process -FilePath $edge -ArgumentList $edgeArgs -Wait | Out-Null
if (Test-Path $Out) { "ok $Out" } else { "FAILED $Out" }
