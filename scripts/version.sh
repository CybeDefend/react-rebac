#!/usr/bin/env bash

# Exit on any error
set -e

# Prompt user for the new version tag
read -p "Enter the new version tag (e.g., v1.0.0): " VERSION

if [ -z "$VERSION" ]; then
    echo "No version provided. Aborting."
    exit 1
fi

# Check if the version tag already exists
if git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "Tag $VERSION already exists. Aborting."
    exit 1
fi

# Add all changes
git add .

# Commit changes
git commit -m "Release $VERSION"

# Create the annotated tag
git tag -a "$VERSION" -m "Release $VERSION"

# Push current branch
git push origin "$(git rev-parse --abbrev-ref HEAD)"

# Push tags
git push origin --tags

echo "New version $VERSION successfully tagged and pushed!"
