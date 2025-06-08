# PowerShell script to delete all local branches that are already merged into the current branch (e.g., main)
# WARNING: This will delete all merged branches except the current branch!

# Get the current branch name
$current = git rev-parse --abbrev-ref HEAD

# Get all merged branches except the current branch and main/master
$branches = git branch --merged | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne $current -and $_ -ne "main" -and $_ -ne "master" }

if ($branches.Count -eq 0) {
    Write-Host "No merged branches to delete."
} else {
    Write-Host "Deleting merged branches:`n$branches"
    $branches | ForEach-Object { git branch -d $_ }
}