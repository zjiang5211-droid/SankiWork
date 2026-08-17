@echo off
setlocal

where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo DeepSeek Harness installer: Windows PowerShell is required. 1>&2
  exit /b 1
)

set "SW_DSH_PS1=%TEMP%\sankiwork-install-dsh-%RANDOM%-%RANDOM%.ps1"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -UseBasicParsing 'https://sanki-ai.cloud/install-dsh.ps1?version=1' -OutFile $env:SW_DSH_PS1"
if errorlevel 1 (
  echo DeepSeek Harness installer: could not download install-dsh.ps1. 1>&2
  exit /b 1
)

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%SW_DSH_PS1%" %*
set "SW_DSH_EXIT=%ERRORLEVEL%"
del /q "%SW_DSH_PS1%" >nul 2>nul
exit /b %SW_DSH_EXIT%
